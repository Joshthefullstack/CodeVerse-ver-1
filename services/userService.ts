import { User } from "../entities/User";
import { hashPassword } from "../external-libs/passwordHashing";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IUserService } from "../interfaces/user/IUserService";
import { UserStatus } from "../utils/enums/UserStatus";
import { RespInfo } from "../utils/RespInfo";
import { ValidateCreateUser } from "../utils/ValHelper/userValHelper";



export class UserService implements IUserService{
    private repository : IUserRepository;
    // private emptyUserObj : User;

    constructor(
        repository: IUserRepository
    )
    {
        this.repository = repository;
    }


    async createUser(user: User): Promise<RespInfo> {
        const exisitingUser = await this.repository.findEmail(user.email);
        if(exisitingUser.user_id)
        {
            return new RespInfo(['Invalid Email', `This email doesn't exist`], false, null)
        }
        const errors = ValidateCreateUser(user);
        if(errors.length > 0)
        {
            return new RespInfo(errors, false, null)
        }

        const password_hash = await hashPassword(user.password_hash);

        // done validation, now to verify email after registration
        // also, I would need to handle JWT sessions too.
        // i also need to hash my passwords here too - done
        throw new Error("Method not implemented.");
    }
    async updateStatus(status: UserStatus, user_id: number): Promise<RespInfo> {
        throw new Error("Method not implemented.");
    }
    async update(user_id: number, user: User): Promise<RespInfo> {
        throw new Error("Method not implemented.");
    }
    async updatePassword(password_hash: string, user_id: number): Promise<RespInfo> {
        throw new Error("Method not implemented.");
    }
    
}