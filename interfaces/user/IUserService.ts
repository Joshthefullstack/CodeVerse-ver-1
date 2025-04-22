import { User } from "../../entities/User";
import { UserStatus } from "../../utils/enums/UserStatus";
import { RespInfo } from "../../utils/RespInfo";

export interface IUserService{
    createUser(user: User) : Promise<RespInfo>;
    updateStatus(status: UserStatus, user: User) : Promise<RespInfo>;
    update(user: User) : Promise<RespInfo>;
    updatePassword(password_hash: string, user: User) : Promise<RespInfo>;
    loginUser(email : string, password : string) : Promise<RespInfo>;
}

// I need to do a custom success/error response to return here