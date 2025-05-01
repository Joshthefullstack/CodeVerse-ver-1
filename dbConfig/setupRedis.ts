const redis = require('redis');

export const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

redisClient.connect().catch(console.error);