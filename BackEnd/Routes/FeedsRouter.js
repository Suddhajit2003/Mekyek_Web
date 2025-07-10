const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryConfig");

const { postFeed, getFeeds, likeFeed, commentPostFeed, getComments } = require('../Controllers/FeedsController');
const { feedValidation } = require('../Middlewares/FeedValidation');

const router = express.Router();


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/feed", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

router.post('/post', upload.single('file'), (req, res, next) => {
    console.log("Processing Feed Post...");
    console.log("Req Body", req.body);
    console.log("Req File", req.file);
    if (!req.file) {
        console.error("❌ File upload failed! No file received.");
    }
    next();
}, postFeed);

router.get('/getFeeds', getFeeds);
router.post('/like', likeFeed);
router.post('/commentPost', commentPostFeed);
router.get('/getComments', getComments);    


module.exports = router;