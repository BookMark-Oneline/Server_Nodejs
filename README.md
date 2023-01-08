# Server_Nodejs

## SQL문 작성  주의사항

finishTimer 의 경우  total_reading_time, current_reading_page 변수를 body 로 전달해주기 때문에 Service 단에서 
const updateBookInfoParams = [total_reading_time, current_reading_page,  user_id, book_id]; 와 같이 하나로 묶어줘도 상관이 없음.
왜냐하면, body 단에서 받은 정보를 업데이트 해주는 것 이지 전달받은 변수가 개입해서 업데이트 시키는 것이 아니기 때문.


그러나,

deleteBook 과 같은 경우 status 를 body로 받는것이 아니라 직접 1->0 으로 변경해주는 것이기 때문에 const deleteBookinfoParams 와 같이 하나로 묶어버리면 가령 
localhost:3000/1/1 전송 시 데이터 베이스가 인식하기를 book_id = '1','1' 과 같이 두개로 인식해버림. 

정리하자면,

update sql문 작성 시 update 시키는 것이 body로 부터 나와 Provider / Service 단에서 변수명을 하나로 묶어줘서 전달 해줘야 하고 ,
내가 업데이트 시켜주는 속성이 body로 부터 받는게 아니라면 묶어서 전달하지 말것.
 
