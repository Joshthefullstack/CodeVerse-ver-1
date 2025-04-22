import { UserStatus } from "../../enums/UserStatus";

export interface UpdateStatusReq {
    user_id: number;
    email: string;
    status: UserStatus;
}