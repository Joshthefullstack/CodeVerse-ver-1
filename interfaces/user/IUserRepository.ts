import { User } from "../../entities/User";
import { UserStatus } from "../../utils/enums/UserStatus";

export interface IUserRepository{
    create(email: string, password: string): Promise<User>;
    update(user_id: number, user : User): Promise<User>;
    findEmail(email: string): Promise<User>;
    updatePassword(password_hash: string, user_id: number): Promise<User>;
    updateStatus(status: UserStatus, user_id: number): Promise<User>;
    getUser(user_id : number): Promise<User>;
    // login(email : string, password : string) : Promise<User>;
}