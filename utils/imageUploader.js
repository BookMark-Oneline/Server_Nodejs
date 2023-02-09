//import dotenv from "dotenv";
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// aws
AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bookmark001",
    acl: "public-read-write",
    key: (req, file, cb) => {
      // 업로드할 directory 설정
      //const uploadDirectory = req.query.img_directory ?? "";
      const extension = path.extname(file.originalname);
      // extension 확인
      if (!allowedExtensions.includes(extension)) {
        return cb(new Error("wrong extension"));
      }
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = imageUploader;
