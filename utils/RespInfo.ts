export class RespInfo{
    public Errors;
    public IsValid;
    public value;
    

    constructor(errors : string[], isValid : boolean, data: any)
    {
        this.Errors = [errors];
        this.IsValid = isValid;
        this.value = data
    }
}