// import { redisClient } from "../dbConfig/setupRedis";
// import session from "express-session";
// import connectRedis from "connect-redis";

// const RedisStore = require('connect-redis').default;

// export default session({
//   store: new RedisStore({
//     client: redisClient,
//   }),
//   secret: 'mySecret',
//   saveUninitialized: false,
//   resave: false,
//   name: 'sessionId',
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     maxAge: 1000 * 60 * 30,
//     sameSite: 'lax',
//   }
// });



const RedisStore = require('connect-redis');
const session = require('express-session');
const { createClient } = require('redis');

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "prefix:",
});

export default(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false, 
    secret: "keyboard cat",
  })
)