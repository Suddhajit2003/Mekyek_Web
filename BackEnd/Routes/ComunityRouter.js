const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryConfig");

const { createCommunity, getCommunity, getCommunitybyUserId, getCommunitybyId, createPostCommunity, likeCommunityPost, commentCommunityPost, getCommentsCommunityPost } = require('../Controllers/ComunityController');
const { communityValidation } = require('../Middlewares/ComunityValidation');


const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/comunityLogo", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const communityPostImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/comunityPost", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });
const uploadPost = multer({ storage: communityPostImage });

module.exports = upload;

router.post('/post', upload.single('file'), (req, res, next) => {
    if (!req.file) {
        console.error("❌ File upload failed! No file received.");
    }

    next();
}, createCommunity);

router.get('/get', getCommunity);

router.get('/getWithUserId', getCommunitybyUserId);

router.get('/getById', getCommunitybyId);

router.post('/post/create', uploadPost.single('image'),  createPostCommunity);

router.post('/post/like', likeCommunityPost);

router.post('/post/commentPost', commentCommunityPost);

router.get('/post/getComments', getCommentsCommunityPost);   


module.exports = router;