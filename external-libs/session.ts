import { redisClient } from "../dbConfig/setupRedis";
const session = require("express-session");
const connectRedis = require('connect-redis');

const RedisStore = connectRedis(session);

module.exports = session({
    store: new RedisStore({ client: redisClient}),
    secret: 'mySecret',
    saveUnintialized: false,
    resave: false,
    name: 'sessionId',
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
        sameSite: 'laz'
    }
});