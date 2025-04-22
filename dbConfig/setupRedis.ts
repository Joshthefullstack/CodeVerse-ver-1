const redis = require('redis');

export const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
});