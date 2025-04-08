const bcrypt = require('bcrypt');


export async function hashPassword(password : string) : Promise<string>{
    const password_hash = await bcrypt.hash(password, 10);
    return password_hash;
}