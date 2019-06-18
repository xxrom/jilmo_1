import Koa from 'koa';
import logger from 'koa-morgan';
import env from 'dotenv';
import Redis from 'redis';
import bluebird from 'bluebird';

env.config();

bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);

const server = new Koa();
const redis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const PORT = process.env.PORT;

redis.set('test', 'redis HELLO');

server
  .use(logger('tiny'))
  .use(async (ctx) => {
    ctx.body = await redis.getAsync('test');
  })
  .listen(PORT, () => {
    console.log(`Hello from server ${PORT}`);
  });
