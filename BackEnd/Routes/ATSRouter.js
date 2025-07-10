const express = require('express');
const { getCompanyJobs, getApplicants, getAllPosts } = require('../Controllers/ATSController');

const router = express.Router();

router.get('/get-company-jobs', getCompanyJobs);
router.get('/applicants', getApplicants);
router.get('/get-all-posts', getAllPosts);

module.exports = router;
