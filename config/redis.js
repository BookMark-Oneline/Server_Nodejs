
const redis = require('redis');
const redisClient = redis.createClient({ host: 'localhost', port: 6379 });

redisClient.on('connect', function() {
console.log('Redis client connected');
});

redisClient.on('error', function (err) {
console.log('Something went wrong ' + err);
});



// redis에 데이터 저장.
const set = (key, value) => {

  redisClient.set(key, JSON.stringify(value), (err) => {
    redisClient.quit();
  });
};

// 저장된 데이터를 reids에서 가져오는 미들웨어.
const get = (req, res, next) => {
  let key = req.originalUrl;
  redisClient.get(key, (error, data) => {
    redisClient.quit();
    if (error) {
      res.status(400).send({
        ok: false,
        message: error,
      });
    }
    if (data !== null) {
      console.log('data from redis!');
      res.status(200).send({
        ok: true,
        data: JSON.parse(data),
      });
    } else {
      next();
    }
  });
};


module.exports = {
  set,
  get,
};