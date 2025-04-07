
export class User{
    constructor(
        public readonly user_id : number,
        public readonly username: string,
        public readonly email: string,
        public readonly password_hash: string,
        public readonly avatar_url: string,
        public readonly bio: string,
        public readonly status: number
    ) {

    }
}