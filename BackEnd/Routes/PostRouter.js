const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryConfig");

const { 
    getNews, postNews, likeNews, commentPostNews, getComments, 
    getEvents, getEventsById, postEvents, 
    postJob, getJobs, getJobById 
} = require('../Controllers/PostController');

const { newsValidation, eventValidation, jobValidation } = require('../Middlewares/PostValidation');

const router = express.Router();

// Storage for news images
const newsStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads/news",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

// Storage for event images
const eventStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads/events",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const uploadNewsImage = multer({ storage: newsStorage });
const uploadEventImage = multer({ storage: eventStorage });
const uploadJob = multer();

// Route for posting news with error handling
router.post(
    '/news',
    (req, res, next) => {
        uploadNewsImage.single('newsPhoto')(req, res, (err) => {
            if (err) {
                console.error("Error uploading news photo:", err);
                return res.status(400).json({ message: err.message, success: false });
            }
            if (!req.file) {
                console.error("No news photo received");
                return res.status(400).json({ message: "No news photo received", success: false });
            }
            next();
        });
    },
    postNews
);

router.get('/news', getNews);
router.post('/news/like', likeNews);
router.post('/news/commentPost', commentPostNews);
router.get('/news/getComments', getComments);

// Route for posting events with error handling
router.post(
    '/event',
    (req, res, next) => {
        uploadEventImage.single('eventImage')(req, res, (err) => {
            if (err) {
                console.error("Error uploading event image:", err);
                return res.status(400).json({ message: err.message, success: false });
            }
            if (!req.file) {
                console.error("No event image received");
                return res.status(400).json({ message: "No event image received", success: false });
            }
            next();
        });
    },
    postEvents
);

router.get('/events', getEvents);
router.get('/events/:eventId', getEventsById);

// Route for posting job with validation
router.post(
    '/job',
    uploadJob.none(),
    (req, res, next) => {
        console.log("Processing Job Post...");
        console.log("req.body", req.body);
        next();
    },
    postJob
);

router.get('/jobs', getJobs);
router.get("/jobs/:jobId", getJobById);

module.exports = router;
