require("dotenv").config();
const { verify } = require('../auth/jwtMiddleware');

//요청 헤더를 확인하여 access token으로 JWT가 전달되었는지 확인하고
// JWT를 검증(확인)하여 유효하면 tokenInfo에 데이터를 추가하고 다음 체인으로 처리되게 합니다.
//그러나 유효하지 않으면 상태 코드를 403으로 처리를 중지시킵니다.
const authJWT =  (req,res,next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer')[1] // header에서 access token을 가져옴.
        const result = verify(token);
       if(result.ok) {   // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
           req.id = result.id,
           req.role = result.role;
            next();
        } else {  // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답.
            res.status(403).send({
                ok: false,
                 mesasage: result.message,
             });
        }
    };
}

module.exports = authJWT;
