require("dotenv").config();
const { sign, verify, refreshVerify } = require('../auth/jwtMiddleware');
const jwt = require('jsonwebtoken');

const refresh = async (req,res) => {
     // access token과 refresh token의 존재 유무를 체크합니다.
    const authToken = req.headers.authorization.split('Bearer')[1];
    const refreshToken  = req.headers.refresh;
    if(req.headers.authorization && req.headers.refresh) {
      
      // < refresh 전제 조건 >
      const authResult = verify(authToken);
        //  access token 검증 -> expired여야 함.
        
        const decoded  = jwt.decode(authToken);
        // access token 디코딩하여 user의 정보를 가져옵니다.
        
        if(decoded === null) {
        // 디코딩 결과(access token 이 없음) 가 없으면 권한이 없음을 응답.
             ok: false,
            res.status(401).send({
          message: ' No authorized. ',
           });
        }

        /* access token의 decoding 된 값에서
      유저의 id를 가져와 refresh token을 검증. */
        const refreshResult = refreshVerify(refreshToken , decoded.id);
        
        // 재발급을 위해서는 access token이 만료되어 있어야 함.
        if(authResult.ok === false && authResult.message === 'jwt expired') {
        // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
            if(refreshResult.ok === false) {
                res.status(401).send({
                    ok : false,
                    message: ' No authorized. ',
                });
            } else {
            // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
                const newAccessToken = sign(user);

                res.status(200).send({
                    ok: true,
                    data: {
                        accessToken: newAccessToken,
                        refreshToken,
                    },
                });
            }
        } else {
            // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
            res.status(400).send({
                ok: false,
                message: 'Acess token is not expired!',
            });
        }
    } else { // access token 또는 refresh token이 헤더에 없는 경우
        res.status(400).send({
            ok: false,
            message: 'Access token and refresh token are need to refresh.',
        });
    }
}

module.exports = refresh;
