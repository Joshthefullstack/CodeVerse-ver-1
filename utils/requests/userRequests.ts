// import { User } from "../../entities/User";

import { User } from "../../entities/User";
import { UserStatus } from "../enums/UserStatus";


export class UserRequest implements IUserRequest {
    public user_id: number;
    public username: string;
    public email: string;
    public password_hash: string;
    public avatar_url: string;
    public bio: string;
    public status: UserStatus;
    // public otp: string;
  
    constructor(user: User) {
        this.user_id = user.user_id;
        this.username = user.username;
        this.email = user.email;
        this.password_hash = user.password_hash;
        this.avatar_url = user.avatar_url;
        this.bio = user.bio;
        this.status = user.status;
        // this.otp = user.
      }
    
  }
  

export interface IUserRequest{
    user_id: number,
    username: string,
    email: string,
    password_hash: string,
    avatar_url: string,
    bio: string,
    status: UserStatus,
    // otp: string
}