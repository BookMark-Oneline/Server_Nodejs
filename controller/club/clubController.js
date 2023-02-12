const { retrieveClubSetting, findClub, findUser, retrieveRequestingMembers } = require("../../provider/club/clubProvider");
const { editClubSetting, createClub, updateUserStatus,createUserRequest, deleteUserStatus } = require("../../service/club/clubService");
const { clubSearch, clubMember, retrieveAnnouncementResponse, retrievePostResponse, userBelong } = require("../../provider/club/clubProvider");
const baseResponse = require("../../config/baseResponse");

// const { clubRequest } = require("../../service/club/clubService");
//현재 클럽 설정 상태 조회.
module.exports.findClubSetting = async (req,res) => {
    try {
        const { club_id } = req.params;
        const clubSetting = await retrieveClubSetting(club_id);
        if(clubSetting.length < 1) {
            return res.status(400).json({ message: "A club with this club_id does not exist." })
        } else {
            set(req.originalUrl, clubSetting )
            return res.status(200).json({ clubData: clubSetting });
        }
        
    } catch(err) {
        console.log("Err" , err)
        return res.status(500).json({
            status: "error",
            message: err.message,
        })
    }
}

// 클럽 상태 변경.
module.exports.postEditClubSetting = async(req,res) => {
    try {
        const { club_id } = req.params;
        

        if (!club_id) {
            return res.status(400).json({message: " club_id does not exists."});
        }
        
        if(!req.file) {
            return res.status(400).json({message: "  club_img_url is required. "});
        }
        const club_img_url = req.file.location;

        const {club_name, club_invite_option, max_people_num } = req.body;

        if (!(club_name) || !(club_invite_option) || !(max_people_num)) {
            return res.status(400).json({ message: " Please fill in the required fields." })
        }

        const clubSetting = await retrieveClubSetting(club_id);
        if(!clubSetting) {
            return res.status(400).json({message: "A club with this club_id does not exist."});
        }
       
        const editedClubSettingInfo = await editClubSetting(
            club_name, 
            club_img_url, 
            club_invite_option, 
            max_people_num,
            parseInt(club_id),
        );
        return res.status(200).send(editedClubSettingInfo)
        
    } catch(err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
        })
    }


}

//새로운 클럽 생성.
module.exports.postNewClub = async (req,res) => {
    //const club_owner_id = req.session.user._id;
    // 로그인 기능 구현 후.
    try {
    const { club_name, club_invite_option, max_people_num, club_owner_id } = req.body;
    if(!req.file) {
        return res.status(400).json({ message: " club_img_url is required " })

    }
    if (!(club_name) || !(club_invite_option) || !(max_people_num) || !(club_owner_id)) {
        return res.status(400).json({ message: " Please fill in the required fields." })
    }

    const club_img_url = req.file.location;


    // file(이미지)가 존재하면 원격 서버인지 확인 후 맞으면 file.location 을 확인하며,
    // 로컬에서 작동 시에는 file.path 확인.
    // 마지막으로 파일 자체가 없으면 club_img_url 확인.
    const newClub = await createClub(
        club_name, 
        club_img_url,
        club_invite_option, 
        max_people_num,
        club_owner_id);
    return res.status(200).json({ newClubData : newClub })

    } catch (err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
        })   
    }

}

//클럽가입 요청 유저 조회.
module.exports.findRequestingMembers = async (req,res) => {

    try {
    const { club_id } = req.params;
    const club = await findClub(club_id)
    
    if(club.length < 1) {
        return res.status(400).json({ message: " A club does not exist." })
    }

    const membersRequesting = await retrieveRequestingMembers(club_id)
    if(membersRequesting.length < 1) {
        return res.status(400).json({ message: "Any Members requesting doesn't exist. " })
    }
    return res.json({ "club_id" :club, "membersRequesting": membersRequesting });


    } catch (err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
        })
    }
};


//클럽 가입 요청 보내기.
module.exports.postJoinRequest = async(req,res) => {
    try {
        
        //유저 검색.
        const { user_id } = req.body;
        const user = await findUser(user_id)
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { club_id } = req.params;
        if(!club_id) {
            return res.status(401).json({ message: 'Type your club_id' });
        }
        //클럽 검색.
        const club = await findClub(club_id);
        if (!club) {
            return res.status(404).json({ message: 'Community not found.' });
        };
        
        // 유저,클럽 모두 존재 시 가입 요청 전송.
        if(user.length > 0 && club.length > 0 ) {
            const userRequestResult = await createUserRequest(club_id, user_id);
            if(!userRequestResult) {
                return res.status(404).json({ message: 'Failed to send join request'})
            }
            return res.status(200).json({ message: ' Join request sent successfully !'})
        }
        
    } catch(err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
    })
    }
}

//가입 요청 승인
module.exports.approvalToJoinRequest = async (req,res) => {
    try{
        const { user_id } = req.params;
        const { club_id } = req.body;

        const user = await findUser(user_id)
        if(user.length < 1) {
            return res.status(400).json({ message: 'A user does not exist.' });
        }
        const club = await findClub(club_id);
        if(club.length < 1) {
            return res.status(400).json({ message: 'A club does not exist.' });
        }
     
        // 요청 승인.
        const approvedUser = await updateUserStatus(user_id, club_id);
        if(!approvedUser) {
            return res.status(404).json({ message: 'cannot be approved' });
        }
        return res.status(200).json({ message: 'Joined Succeesfully ! '});

    } catch(err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
    })
}
}

module.exports.declineToJoinRequest = async (req,res) => {
    try{
        const { user_id } = req.params;
        const { club_id } = req.body;
        
        const user = await findUser(user_id)
        const club = await findClub(club_id);

        if(user.length < 1) {
            return res.status(400).json({ message: 'A user does not exist.' });
        }
        if(club.length < 1) {
            return res.status(400).json({ message: 'A club does not exist.' });
        }
     
        // 요청 거절.
        const declinedUser = await deleteUserStatus(user_id, club_id);
        if(!declinedUser) {
            return res.status(404).json({ message: 'Such a request does not exist.' });
        }
        return res.status(200).json({ message: 'Declined your Request. '});

    } catch(err) {
        console.log("Err", err);
        return res.status(500).send({
            status : "error",
            message : err.message,
    })
}
}




/*
 * API No. 2-1
 * API Name : 책 모임 소속 회원 정보 조회 API
 * [GET] /member
 */
module.exports.clubMember = async (req, res) => {
  try {
    const { club_id } = req.params;

    //const { user_id } = req.body.user_id; 없어도 되나요?

    if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const MemberResponse = await clubMember(
        club_id,
      );
      console.log(MemberResponse);
      return res.send(MemberResponse);
    }
  } catch (err) {
    console.log("Error", err);
    //오류 메시지 반환.
    return res.status(res.statusCode).send(err._message);
  }
};


/*
 * API No. 2 - 2
 * API Name : 책 모임의 이름, 공지, 게시글 목록을 조회 API
 * [GET] /:club_id
 */
// module.exports.clubDetail = async (req, res) => {
//     try {
//       const { club_id } = req.params;
  
//       if (!club_id){
//           res.send("This is not proper club_id");
//       } else {
//         const DetailResponse = await clubDetail(
//           club_id,
//         );
//         console.log(DetailResponse);
//         return res.send(DetailResponse);
//       }
//     } catch (err) {
//       console.log("Error", err);
//       //오류 메시지 반환.
//       return res.status(res.statusCode).send(err._message);
//     }
//   };
module.exports.clubDetail = async (req, res) => {
    try {
      const { club_id } = req.params;
  
      if (!club_id){
          res.send("This is not proper club_id");
          //res.redirect("/");
      } else {
        const AnnouncementResponse = await retrieveAnnouncementResponse(club_id);
        const PostResponse = await retrievePostResponse(club_id);
        console.log(AnnouncementResponse);
        console.log(Object.assign(AnnouncementResponse, { PostResponse } ));
        result = Object.assign(AnnouncementResponse, { PostResponse } );
        console.log(result);
        res.send(Object.assign(AnnouncementResponse, { PostResponse } ));
        
      }
    } catch (err) {
      console.log("Error", err);
      //오류 메시지 반환.
      return res.status(res.statusCode).send(err._message);
    }
  }; 

  /*
 * API No. 2-5
 * API Name : 사용자(userid)가 속한 책모임을 조회함
 * [GET] /user/:user_id
 */
module.exports.userBelong = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      if (!user_id){
          res.send("This is not proper user_id");
      } else {
        const BelongResponse = await userBelong(
          user_id,
        );
        console.log(BelongResponse);
        return res.send(BelongResponse);
      }
    } catch (err) {
      console.log("Error", err);
      //오류 메시지 반환.
      return res.status(res.statusCode).send(err._message);
    }
  };


/*
 * API No. 2-9
 * API Name : 책 모임 가입 요청 전송 API
 * [POST] /request
 */
// module.exports.clubRequest = async (req, res) => {
//   try {
//     const club_id = parseInt(req.params.club_id);
//     const user_id = parseInt(req.body.user_id);

//     if (!user_id) {
//       res.send(response(baseResponse.USER_USERID_EMPTY));
//     } else if (!club_id){
//         res.send("This is not proper club_id");
//     } else {
//       const RequestResponse = await clubRequest(
//         user_id,
//         club_id,
//       );
//       console.log("가입 요청 성공하였습니다.");
//       //return res.send(RequestResponse);
//       return res.status(200).json({ message: '가입 요청 성공하였습니다. ! '});
//     }
//   } catch (err) {
//     console.log("Error 입니다.", err);
//     //오류 메시지 반환.
//     return res.status(res.statusCode).send(err._message);
//   }
// };


/*
 * API No. 2 - 10
 * API Name : 책 모임 조회 API
 * [GET] /request
 */
module.exports.clubSearch = async (req, res) => {
  try {
    const { club_id } = req.params;

    //const { user_id } = req.body.user_id; 없어도 되나요?

    if (!club_id){
        res.send("This is not proper club_id");
    } else {
      const SearchResponse = await clubSearch(
        club_id,
      );
      console.log(SearchResponse);
      return res.send(SearchResponse);
    }
  } catch (err) {
    console.log("Error", err);
    //오류 메시지 반환.
    return res.status(res.statusCode).send(err._message);
  }
};
