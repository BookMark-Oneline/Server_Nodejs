//const { promisify } = require('util');
//const jwt = require('jsonwebtoken');
//const redisClient = require('./redis');
//const secret = process.env.JWT_SECRET;



// Refresh Token을 Redis에 저장 할 것이기 때문에 redis 모듈 설치.



//module.exports = {
//    sign: (user) => { //access token 발급
 //       const payload = { // access token 에 들어갈 payload (JWT에 저장된 값. (name,value)의 쌍)
  //          id: user_id,
  //          role: user.role,
 //       };

 //       return jwt.sign(payload, secret, { //secret 으로 sign 하여 발급하고 return.
//            algorithm : 'HS256', //알고리즘
 //           expiresIn : '1h', // 유효기간
//
 //       });
  //  },
 //   verify: (token) => { //access token 검증.
 //       let decoded = null;
 //       try {
//            decoded = jwt.verify(token, secret);
  //          return {
 //               ok: true,
 //               id: decoded.id,
 //               role: decoded.role,
  //          };
 //       } catch(err) {
 //           return {
 //             ok: false,
 //            message: err.message,
//          };
//        }
//    },
 //   refresh : () => { //refresh 토큰 발급.
 //       return jwt.sign({}, secret, { // refresh 토큰은 payload 없이 발급.
 //           algorithm : 'HS256',
 //           expiresIn : '14d',
//      });
 //   },
 //   refreshVerify: async (token, userId) => { //refresh 토큰 검증.
        // redis 모듈은 기본적으로 promise 를 반환 하지 않기에 
        // promisify를 이용하여 promise를 반환하게 해줌.
 //       const getAsync = promisify(redisClient.get).bind(redisClient);

 //       try {
 //           const data = await getAsync(userId);  //refresh 토큰 가져오기.
 //           if( token === data) {
   //             try {
    //                jwt.verify(token, secret);
//                return true;
//                  } catch (err) {
 //                   return false;
  //                }
  //              } else {
  //                return false;
  //              }
   //           } catch (err) {
   //             return false;
   //         }       
  //      },
  //  };