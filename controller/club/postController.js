const { SUCCESS } = require("../../config/baseResponse");
const postService = require("../../service/club/postService");

// 좋아요 상태를 변경 ( 1 <-> 0 )
module.exports.changeLike = async (req, res) => {
  try {
    const club_post_id = parseInt(req.params.club_post_id);
    const user_id = parseInt(req.body.user_id);
    const like_status = req.body.like_status;
    if (!user_id) {
      res.send("This is not proper user_id");
      res.redirect("/");
    } else if (!club_post_id) {
      res.send("This is not proper club_post_id");
      res.redirect("/");
    } else {
      // like_status 가 0 이라면 좋아요 누르기
      if (like_status == 0) {
        const pressLike = await postService.retrieveInsertLike(
          club_post_id,
          user_id
        );
        return res.send(SUCCESS);
      }
      // like_status 가 1 이라면 좋아요 취소
      else {
        const cancelLike = await postService.retrieveDeleteLike(
          club_post_id,
          user_id
        );
        return res.send(SUCCESS);
      }
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// 공지 등록
module.exports.announcement = async (req, res) => {
  try {
    const club_id = parseInt(req.params.club_id);
    const user_id = parseInt(req.body.user_id);
    const club_post_id = parseInt(req.body.club_post_id);
    if (!user_id) {
      res.send("This is not proper id");
      res.redirect("/");
    } else {
      const registerAnnouncement =
        await postService.retrieveRegisterAnnouncement(
          club_id,
          user_id,
          club_post_id
        );
      return res.send(SUCCESS);
    }
  } catch (err) {
    console.log("Error", err);
  }
};
