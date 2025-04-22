import 'express-session';
import { User } from '../entities/User';

declare module 'express-session' {
    interface SessionData{
        user: User;
    }
}