const { SUCCESS } = require("../../config/baseResponse");
const {
  retrieveInsertLike,
  retrieveDeleteLike,
  retrieveRegisterAnnouncement,
  retrieveAddComment,
  retrieveAddPost,
  retrieveAddCommentCount,
  retrieveAddLikeCount,
  retrieveSubLikeCount,
} = require("../../service/club/postService");
const {
  retrieveViewPost,
  retrieveViewPostComment,
} = require("../../provider/club/postProvider");

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
        const pressLike = await retrieveInsertLike(club_post_id, user_id);
        const addLikeCount = await retrieveAddLikeCount(club_post_id);
        return res.send(SUCCESS);
      }
      // like_status 가 1 이라면 좋아요 취소
      else {
        const cancelLike = await retrieveDeleteLike(club_post_id, user_id);
        const subLikeCount = await retrieveSubLikeCount(club_post_id);
        res.send(SUCCESS);
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
      const registerAnnouncement = await retrieveRegisterAnnouncement(
        club_id,
        user_id,
        club_post_id
      );
      res.send(SUCCESS);
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// 댓글 작성
module.exports.comment = async (req, res) => {
  try {
    const user_id = parseInt(req.body.user_id);
    const club_post_id = parseInt(req.params.club_post_id);
    const comment_content_text = req.body.comment_content_text;
    console.log(user_id, club_post_id, comment_content_text);
    if (!user_id) {
      res.send("This is not proper id");
      res.redirect("/");
    } else {
      const addComment = await retrieveAddComment(
        user_id,
        club_post_id,
        comment_content_text
      );
      // comment_num(댓글 개수) +1 증가
      const addCommentCount = await retrieveAddCommentCount(club_post_id);
      res.send(SUCCESS);
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// 게시물 작성
module.exports.post = async (req, res) => {
  try {
    const user_id = parseInt(req.body.user_id);
    const club_id = parseInt(req.body.club_id);
    const club_post_title = req.body.club_post_title;
    const post_content_text = req.body.post_content_text;
    const img_status = req.body.img_status;
    const img_url = req.file.location;
    if (!img_url) {
      res.send("Invalid file path");
    }
    if (!user_id) {
      res.send("This is not proper id");
      res.redirect("/");
    } else {
      const addPost = await retrieveAddPost(
        user_id,
        club_id,
        club_post_title,
        post_content_text,
        img_status,
        img_url
      );
      res.send(SUCCESS);
    }
  } catch (err) {
    console.log("Error", err);
  }
};

// 게시물 & 댓글 보기
module.exports.viewPost = async (req, res) => {
  try {
    const club_post_id = parseInt(req.params.club_post_id);
    if (!club_post_id) {
      res.send("Invalid club_post_id");
      res.redirect("/");
    } else {
      const viewPost = await retrieveViewPost(club_post_id);
      const CommentData = await retrieveViewPostComment(club_post_id);
      //console.log(viewPost);
      //console.log(viewPostComment);
      console.log(Object.assign(viewPost, { CommentData }));
      result = Object.assign(viewPost, { CommentData });
      res.send(result);
    }
  } catch (err) {
    console.log("Error", err);
  }
};