import { User } from "../../entities/User";
import { UserStatus } from "../../utils/enums/UserStatus";
import { UpdatePasswordReq } from "../../utils/requests/user/UpdatePasswordReq";
import { UpdateStatusReq } from "../../utils/requests/user/UpdateStatusReq";
import { UserRequest } from "../../utils/requests/user/userRequests";
import { RespInfo } from "../../utils/RespInfo";

export interface IUserService{
    createUser(userRequest : UserRequest) : Promise<RespInfo>;
    updateStatus(UpdateStatusReq: UpdateStatusReq) : Promise<RespInfo>;
    update(userRequest : UserRequest) : Promise<RespInfo>;
    updatePassword(updatePasswordReq: UpdatePasswordReq) : Promise<RespInfo>;
    loginUser(userRequest : UserRequest) : Promise<RespInfo>;
}

// I need to do a custom success/error response to return here