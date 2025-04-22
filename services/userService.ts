import { User } from "../entities/User";
import { hashPassword, verifyPassword } from "../external-libs/passwordHandling";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IUserService } from "../interfaces/user/IUserService";
import { UserStatus } from "../utils/enums/UserStatus";
import { UpdatePasswordReq } from "../utils/requests/user/UpdatePasswordReq";
import { UpdateStatusReq } from "../utils/requests/user/UpdateStatusReq";
import { UserRequest } from "../utils/requests/user/userRequests";
import { RespInfo } from "../utils/RespInfo";
import { ValidateCreateUser, ValidateUpdateUser } from "../utils/ValHelper/userValHelper";



export class UserService implements IUserService{
    private repository : IUserRepository;

    constructor(
        repository: IUserRepository
    )
    {
        this.repository = repository;
    }


    async loginUser(userRequest : UserRequest): Promise<RespInfo> {
        try{
            const user = await this.repository.findEmail(userRequest.email);
            if(user == null) return new RespInfo(['Invalid Email', `Invalid email/password`], false, null);

            const validPassword = await verifyPassword(userRequest.password_hash, user.password_hash);
            if(validPassword){
                return new RespInfo([], true, user);
            }

            return new RespInfo(['Invalid Password', 'Invalid email/password'], true, user); 
        } catch(err){
            console.log(err);
            return new RespInfo(['Db Error:', 'Error occured getting user from database'], false, null);
        }
    }

    async checkUserId(user_id : number) : Promise<RespInfo>{
        try{
            if(user_id < 1)
            {
                return new RespInfo(['Invalid User', `This user doesn't exist`], false, null);
            }
    
            const user = await this.repository.getUser(user_id);
    
            if(!user){
                return new RespInfo(['Invalid User', `This user doesn't exist`], false, null);
            }
    
            return new RespInfo([], true, user);
        } catch(err){
            console.log(err);
            return new RespInfo(['Db Error:', 'Unable to get user, please try again'], true, null);
        }
    }

    async createUser(userRequest : UserRequest): Promise<RespInfo> {
        try{
            const exisitingUser = await this.repository.findEmail(userRequest.email);
            if(exisitingUser)
            {
                return new RespInfo(['Invalid Email', `This email already exist`], false, null);
            }

            const errors = ValidateCreateUser(userRequest);
            if(errors.length > 0)
            {
                return new RespInfo(errors, false, null)
            }
    
            const hashedPwd = await hashPassword(userRequest.password_hash);
            const newUser = this.repository.create(userRequest.email, hashedPwd);
            return new RespInfo([], true, newUser);
        } catch(err){
            console.log(err);
            return new RespInfo(['Db Error:', 'Unable to create new user, please try again'], true, null);
        }
    }

    async updateStatus(UpdateStatusReq: UpdateStatusReq): Promise<RespInfo> {
        try{
            const check = await this.checkUserId(UpdateStatusReq.user_id);
            if (!check.IsValid) return check;

            const userRet = this.repository.updateStatus(UpdateStatusReq.status, UpdateStatusReq.user_id);
            return new RespInfo([], true, userRet);
        } catch(err){
            console.log(err);
            return new RespInfo(['Db Error:', 'Unable to update user status please try again'], true, null);
        }
    }

    async update(userRequest : UserRequest): Promise<RespInfo> {
        try{
            const check = await this.checkUserId(userRequest.user_id);
            if(!check.IsValid) return check;
            
            const errors = ValidateUpdateUser(userRequest);
            if(errors.length > 0)
            {
                return new RespInfo(errors, false, null)
            }
    
            const updatedUser = this.repository.update(userRequest.user_id, userRequest);
            return new RespInfo([], true, updatedUser);
        } catch(err){
            console.log(err)
            return new RespInfo(['Db Error:', 'Unable to update user, please try again'], true, null);
        }
    }

    async updatePassword(updatePasswordReq: UpdatePasswordReq): Promise<RespInfo> {
        try{
            const check = await this.checkUserId(updatePasswordReq.user_id);
            if (!check.IsValid) return check;

            const hashedPwd = await hashPassword(updatePasswordReq.password);
            const userRet = await this.repository.updatePassword(hashedPwd, updatePasswordReq.user_id);
            return new RespInfo([], true, userRet);
        } catch(err){
            console.log(err);
            return new RespInfo(['Db Error', 'Unable to update password'], false, null);
        }
        
    }
    
}

        // i need to tell the user to verify their email on the frontend, so I might need to run sendOtp on 
        // the controller

        // expose verify otp to frontend
        
        // done validation, now to verify email after registration - done
        // also, I would need to handle JWT sessions too, changed from JWT session to express-session with redis,
        // setting up redis already - to install redis on my machine, I need to run ubuntu, which is strange, 
        // cos it isn't working
        // i also need to hash my passwords here too - done