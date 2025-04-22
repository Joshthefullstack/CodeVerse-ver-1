const bcrypt = require('bcrypt');


export async function hashPassword(password : string) : Promise<string>{
    const password_hash = await bcrypt.hash(password, 10);
    return password_hash;
}

export async function verifyPassword(password : string, user_password : string) : Promise<boolean>{
    const validPassword = await bcrypt.compare(password, user_password);
    return validPassword;
}