import { User } from "../../entities/User";



function validateUser(user: User) : string[]
{

        // if(user.username.length < 3)
        // {
        //     return ['Invalid Username', 'Username should be more than three characters'];
        // }
    
        if(user.email.length < 10)
        {
            return ['Invalid Email', 'Email should be more than 10 characters'];
        }
    
        if(!(user.email.includes('@')))
        {
            return ['Invalid Email', 'Input a valid email'];
        }

        if(user.password_hash.length < 8)
        {
            return ['Invalid Password', 'Password should be more than 8 characters'];
        }

        if(!(user.email.includes(user.password_hash)))
        {
            return ['Invalid Password', 'Password should not be similar with email.'];
        }

        // need to run regex on password

        // if(user.bio.length < 50)
        // {
        //     return ['Invalid Bio', 'Bio should be more than 50 characters'];
        // }
    
        return ['']
}

export function ValidateCreateUser(user: User) : string[]
{
    return validateUser(user);
}

export function ValidateUpdateUser(user: User) : string[]
{
        if(user.user_id < 1)
        {
            return ['Invalid User', 'Input a valid user id'];
        }

        if(user.username.length < 3)
        {
            return ['Invalid Username', 'Username should be more than three characters'];
        }

        if(user.bio.length < 50)
        {
            return ['Invalid Bio', 'Bio should be more than 50 characters'];
        }

        return validateUser(user);
}