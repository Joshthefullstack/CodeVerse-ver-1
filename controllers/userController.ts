import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interfaces/user/IUserService";
import { sendOtp, verifyOtp } from "../external-libs/handleOtp";
import { UserRequest } from "../utils/requests/user/userRequests";
import { validateUser } from "../utils/validation/user";
import { sendError, sendSuccess } from "../utils/responseHelper";
import { UpdatePasswordReq } from "../utils/requests/user/UpdatePasswordReq";
import { UpdateStatusReq } from "../utils/requests/user/UpdateStatusReq";
import { SendOtpReq } from "../utils/requests/user/SendOtpReq";

export class UserController {
    private service: IUserService;

    constructor(
        service: IUserService
    ) {
        this.service = service;
    }

    async sendOTP(req: Request, res: Response) {
        const body : SendOtpReq = req.body;

        const isEmailValid = new validateUser().isValidEmail(body.email);

        if (!isEmailValid) {
            return sendError(res, ["Please input a valid email"], 422);
        }

        const emailSent = sendOtp(body.email);
        if (!emailSent.IsValid) {
            return sendError(res, emailSent.Errors[0], 422);
        }

        return sendSuccess(res, emailSent.value, 201);
    }


    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const body : UserRequest = req.body;

            const isEmailValid = new validateUser().isValidEmail(body.email);
            const passwordValid = new validateUser().isValidPwd(body.password_hash);

            if (!isEmailValid) {
                return sendError(res, ["Please input a valid email"], 422);
            }

            if(!passwordValid){
                return sendError(res, ["Password must contain at least, one lowercase letter, one uppercase letter, one number, one special characters, and must be 8 characters long"], 422);
            }

            const otpIsVerified = verifyOtp(body.email, body.otp);

            if (!otpIsVerified.IsValid) {
                return sendError(res, otpIsVerified.Errors[0], 422);
            }

            const retVal = await this.service.createUser(body);
            req.session.user = retVal.value;
            // res.sendStatus(204);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0], 400);
            }

            return sendSuccess(res, retVal.value, 201);
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const body : UserRequest = req.body;

            const isEmailValid = new validateUser().isValidEmail(body.email);
            const passwordValid = new validateUser().isValidPwd(body.password_hash);

            if (!isEmailValid) {
                return sendError(res, ["Please input a valid email"], 422);
            }

            if(!passwordValid){
                return sendError(res, ["Password must contain at least, one lowercase letter, one uppercase letter, one number, one special characters, and must be 8 characters long"], 422);
            }

            const retVal = await this.service.loginUser(body);
            req.session.user = retVal.value;
            // res.sendStatus(204);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0], 400);
            }

            return sendSuccess(res, retVal.value, 201);
        }
        catch (err) {
            next(err);
        }
    }


    async updateUser(req: Request, res: Response, next: NextFunction){
        try{
            const body : UserRequest = req.body;
            const IsValid = Object.entries(body).some(([key, value]) => {
                if (key === 'bio' && typeof value === 'string') {
                    return new validateUser().checkValidStringLength(value.length, 3, 300);
                }
                if(key === "email" && typeof value === 'string'){
                    return new validateUser().isValidEmail(value);
                }
                if(key === "password" && typeof value === 'string'){
                    return new validateUser().isValidPwd(value);
                }
                if(typeof value === 'string'){
                    return new validateUser().checkValidStringLength(value.length, 3, 80);
                }
                return false;
            });

            if(!IsValid){
                return sendError(res, ["Your fields are invalid, please input a valid field"], 422);// adjust this error checking
            }

            const retVal = await this.service.update(body);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0], 400);
            }

            return sendSuccess(res, retVal.value, 201); // ,aybe I can check this error response, to accept the string array
        } catch(err){
            next(err);
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction){
        try{
            const body : UpdatePasswordReq = req.body;

            const isEmailValid = new validateUser().isValidEmail(body.email);
            const passwordValid = new validateUser().isValidPwd(body.password);

            if (!isEmailValid) {
                return sendError(res, ["Please input a valid email"], 422);
            }

            if(!passwordValid){
                return sendError(res, ["Password must contain at least, one lowercase letter, one uppercase letter, one number, one special characters, and must be 8 characters long"], 422);
            }

            const retVal = await this.service.updatePassword(body);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0], 400);
            }

            return sendSuccess(res, retVal.value, 201); // ,aybe I can check this error response, to accept the string array

        } catch(err){
            next(err);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction){
        try{
            const body : UpdateStatusReq = req.body;

            const isEmailValid = new validateUser().isValidEmail(body.email);

            if (!isEmailValid) {
                return sendError(res, ["Please input a valid email"], 422);
            }

            const retVal = await this.service.updateStatus(body);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0], 400);
            }

            return sendSuccess(res, retVal.value, 201); // ,aybe I can check this error response, to accept the string array

        } catch(err){
            next(err);
        }
    }
}
  