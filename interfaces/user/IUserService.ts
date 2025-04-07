import { User } from "../../entities/User";
import { UserStatus } from "../../utils/enums/UserStatus";
import { RespInfo } from "../../utils/RespInfo";

export interface IUserService{
    createUser(user: User) : Promise<RespInfo>;
    updateStatus(status: UserStatus, user_id: number) : Promise<RespInfo>;
    update(user_id: number, user: User) : Promise<RespInfo>;
    updatePassword(password_hash: string, user_id : number) : Promise<RespInfo>;
}

// I need to do a custom success/error response to return here