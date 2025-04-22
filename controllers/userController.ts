import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interfaces/user/IUserService";
import { sendOtp, verifyOtp } from "../external-libs/handleOtp";
import { UserRequest } from "../utils/requests/userRequests";
import { validateUser } from "../utils/validation/user";
import { sendError, sendSuccess } from "../utils/responseHelper";

export class UserController {
    private service: IUserService;

    constructor(
        service: IUserService
    ) {
        this.service = service;
    }

    async sendOTP(req: Request, res: Response, next: NextFunction) {
        const { body } = req.body;

        // const isEmailValid = isValidEmail(body.email);
        const isEmailValid = new validateUser().isValidEmail(body.email);

        if (!isEmailValid) {
            // return res.status(400).json(new RespInfo(['Invalid Email', 'Please input a valid email'], false, null));
            return sendError(res, "Please input a valid email", 422);
        }

        const emailSent = sendOtp(body.email);
        if (!emailSent.IsValid) {
            return sendError(res, emailSent.Errors[0][1], 422);
        }

        return sendSuccess(res, emailSent.Errors[0][1], emailSent.value, 201);
    }


    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req.body;

            const isEmailValid = new validateUser().isValidEmail(body.email);

            if (!isEmailValid) {
                // return res.status(400).json(new RespInfo(['Invalid Email', 'Please input a valid email'], false, null));
                return sendError(res, "Please input a valid email", 422);
            }

            const otpIsVerified = verifyOtp(body.email, body.otp);
            // otp needs to be gotten here, to verify it, so once I send my otp to my email, I need to send it
            // to the backend for confirmation, but the issue is, I am now using strict checking for my body
            // just to know what is coming into my body, but it is causing me problems.
            // I have to pass otp to the body, but in the body, I already have a type, and otp is not meant to be a 
            // field in otp, I don't know the magic I want to do to that at the moment, but for now, I think
            // I think I would just leave it how it was before.
            if (!otpIsVerified.IsValid) {
                // return res.status(400).json(otpIsVerified);
                return sendError(res, otpIsVerified.Errors[0][1], 422);
            }

            const user = new UserRequest(body);
            const retVal = await this.service.createUser(user);
            req.session.user = retVal.value;
            res.sendStatus(204);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0][1], 400);
            }

            // return res.status(200).json(retVal);
            return sendSuccess(res, retVal.Errors[0][1], retVal.value, 201);
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req.body;

            const isEmailValid = new validateUser().isValidEmail(body.email);
            const passwordValid = new validateUser().isValidPwd(body.password);

            if (!isEmailValid) {
                return sendError(res, "Please input a valid email", 422);
            }


            if(!passwordValid){
                return sendError(res, "Password must contain at least, one lowercase letter, one uppercase letter, one number, one special characters, and must be 8 characters long", 422);
            }

            const user = new UserRequest(body);
            const retVal = await this.service.loginUser(user.email, user.password_hash);
            req.session.user = retVal.value;
            res.sendStatus(204);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0][1], 400);
            }

            // return res.status(200).json(retVal);
            return sendSuccess(res, retVal.Errors[0][1], retVal.value, 201);
        }
        catch (err) {
            next(err);
        }
    }


    async updateUser(req: Request, res: Response, next: NextFunction){
        try{
            const { body } = req.body;
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
                return sendError(res, "Your fields are invalid, please input a valid field", 422);// adjust this error checking
            }

            const user = new UserRequest(body);
            const retVal = await this.service.update(user);

            if (!retVal.IsValid) {
                return sendError(res, retVal.Errors[0][1], 400);
            }

            // return res.status(200).json(retVal);
            return sendSuccess(res, retVal.Errors[0][1], retVal.value, 201); // ,aybe I can check this error response, to accept the string array

        } catch(err){
            next(err);
        }
    }
}
  