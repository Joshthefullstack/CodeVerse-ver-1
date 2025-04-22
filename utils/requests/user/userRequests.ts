import { UserStatus } from "../../enums/UserStatus";


export interface UserRequest {
     user_id: number;
     username: string;
     email: string;
     password_hash: string;
     avatar_url: string;
     bio: string;
     status: UserStatus;
     otp?: string;
  
    // constructor(user: User) {
    //     this.user_id = user.user_id;
    //     this.username = user.username;
    //     this.email = user.email;
    //     this.password_hash = user.password_hash;
    //     this.avatar_url = user.avatar_url;
    //     this.bio = user.bio;
    //     this.status = user.status;
    //     this.otp = user.
    //   }
    
  }
  

// export interface IUserRequest{
//     user_id: number,
//     username: string,
//     email: string,
//     password_hash: string,
//     avatar_url: string,
//     bio: string,
//     status: UserStatus,
//     otp: string
// }