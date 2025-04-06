import { User } from "../../entities/User";
import { UserStatus } from "../../utils/enums/UserStatus";

export interface IUserRepository{
    create(user: User): Promise<User>;
    update(user_id: number, user : User): Promise<User>;
    findEmail(email: string): Promise<User>;
    updatePassword(password_hash: string, user_id: number): Promise<User>;
    updateStatus(status: UserStatus, user_id: number): Promise<User>;
}