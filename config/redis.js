require("dotenv").config();

const redis = require('redis');
const redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

redisClient.on('connect', function() {
console.log('Redis client connected');
});

redisClient.on('error', function (err) {
console.log('Something went wrong ' + err);
});



// redis에 데이터 저장.
const set = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
};



// 저장된 데이터를 reids에서 가져오는 미들웨어.
const redisGet = (req, res, next) => {
  let key = req.originalUrl;

  redisClient.get(key, (error, data) => {
    if (data) {
      console.log('data from redis!');
      try {
        const dataArray = data.split(', ');
        const parsedData = dataArray.map(item => JSON.parse(item));
        res.status(200).send({
          ok: true,
          data: parsedData,
        });
      } catch (error) {
        res.status(400).send({
          ok: false,
          message: 'Failed to parse data from Redis',
        });
      }
    } else {
      next();
    }
  });
};


module.exports = {
  redisClient,
  set,
  redisGet,
};