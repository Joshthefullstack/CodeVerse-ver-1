import pool from "../dbConfig";
import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { UserStatus } from "../utils/enums/UserStatus";
const {TABLES} = require("./utils/constants");

export class UserRepository implements IUserRepository {
    private client;

    constructor()
    {
        this.client = pool
    }

    async updateStatus(status: UserStatus, user_id: number): Promise<User> {
        const userRet = await this.client.query(
            `UPDATE ${TABLES.USERS} SET status=$1 WHERE user_id=$2 RETURNING *`,
            [status, user_id]
          );
          return userRet.rows[0];
    }
    
    
    async create(user: User): Promise<User> {
        const { email, password_hash } = user;
        const userRet = await this.client.query(
            `INSERT INTO ${TABLES.USERS} (email, password_hash) VALUES ($1,$2) RETURNING *`,
            [email, password_hash]
        );
        
        return userRet.rows[0];    
    }

    async update(user_id: number, user: User): Promise<User> {
        const { username, avatar_url, bio } = user;
        const userRet = await this.client.query(
            `UPDATE ${TABLES.USERS} SET username=$1, avatar_url=$2, bio=$3 WHERE user_id=$4 RETURNING *`,
            [username, avatar_url, bio, user_id]
          );
          return userRet.rows[0];
    }

    async findEmail(email: string): Promise<User> {
        const userRet = await this.client.query(`SELECT * FROM ${TABLES.USERS} WHERE email = $1`, [email]);
        return userRet.rows[0];
    }
    
    async updatePassword(password_hash: string, user_id: number): Promise<User> {
        const userRet = await this.client.query(
            `UPDATE ${TABLES.USERS} SET password_hash=$1 WHERE user_id=$2 RETURNING *`,
            [password_hash, user_id]
          );
          return userRet.rows[0];
    }


}