const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class validateUser{

    constructor(){
        
    }
    
    public isValidEmail(email : string) : boolean{
        return emailRegex.test(email);
    }

    public isValidPwd(password : string) : boolean{
        return passwordRegex.test(password);
    }

    public checkValidStringLength(stringLength: number, minLength: number, maxLength: number){
        if(stringLength < minLength){
            return false;
        }
        if(stringLength > maxLength){
            return false;
        }
    }
}
