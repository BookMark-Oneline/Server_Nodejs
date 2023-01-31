const { retrieveClubSetting, findClub, findUser, retrieveRequestingMembers } = require("../../provider/club/postProvider");
const { editClubSetting, createClub, updateUserStatus,createUserRequest, deleteUserStatus } = require("../../service/club/postService");

//현재 클럽 설정 상태 조회.
module.exports.findClubSetting = async (req,res) => {
    try {
        const { club_id } = req.params;
        const clubSetting = await retrieveClubSetting(club_id);
        if(clubSetting.length < 1) {
            return res.status(400).json({ message: "A club with this club_id does not exist." })
        } else {
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
    return res.json({ club, membersRequesting });
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