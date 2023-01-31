const multer = require('multer');
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

//원격서버에서만 multer S3가 적용되되고, 로컬에서는 로컬 스토리지에 저장.
//const isRemoteServer = process.env.NODE_ENV === "production"

const s3 = new aws.S3({
    credentials: {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET,
    },
});
  
const s3ImageUploader = multerS3({
    s3: s3,
    bucket: "boookmark/images",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);

   },
});


module.exports.imgUpload = multer({
  dest: "uploads/club/",
  limits: {
    fileSize: 3000000,
  },
  storage: s3ImageUploader,
});

