const wrapAsync = require("../utils/wrapAsync");
const CompanyJobModel = require("../Models/ATS/CompanyJobs");
const UserModal = require("../Models/User");
const FeedModal = require("../Models/Feed");
const NewsModel = require("../Models/News");
const EventModel = require("../Models/Event");

// GET Company Jobs
const getCompanyJobs = wrapAsync(async (req, res) => {
    const { companyId, jobType } = req.query;

    if (!companyId) {
        console.log("Company ID is missing.");
        return res.status(400).json({ error: "Company ID is required." });
    }

    if (!jobType) {
        console.log("Job Type is missing.");
        return res.status(400).json({ error: "Job Type is required." });
    }

    let jobs;

    if (jobType == "All") {
        jobs = await CompanyJobModel.find({ companyId: companyId });
    } else {
        jobs = await CompanyJobModel.find({ companyId: companyId, jobType: jobType });
    }

    if (!jobs.length) {
        console.log("No jobs found for this company.");
        return res.status(404).json({ message: "No jobs found for this company." });
    }

    res.status(200).json(jobs);
});

// GET Applicants
const getApplicants = wrapAsync(async (req, res) => {
    const { jobId } = req.query;

    if (!jobId) {
        return res.status(400).json({ error: "Job ID is required." });
    }
    
    const jobs = await UserModal.find({ "appliedJobs.jobId": jobId });

    if (!jobs) {
        console.log("Job not found.");
        return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json(jobs);
});

// GET All Posts
const getAllPosts = wrapAsync(async (req, res) => {
    const companyId = req.query.companyId;

    if (!companyId) {
        console.log("Company ID is missing.");
        return res.status(400).json({ error: "Company ID is required." });
    }

    const [feeds, events, news] = await Promise.all([
        FeedModal.find({ "author._id": companyId }),
        EventModel.find({ "author._id": companyId }),
        NewsModel.find({ "author._id": companyId })
    ]);

    let combinedPosts = [
        ...feeds.map(feed => ({ ...feed.toObject(), type: 'Feed' })),
        ...events.map(event => ({ ...event.toObject(), type: 'Event' })),
        ...news.map(newsItem => ({ ...newsItem.toObject(), type: 'News' }))
    ];

    combinedPosts.sort((a, b) => {
        const dateA = a.createdAt || a.date;
        const dateB = b.createdAt || b.date;
        return new Date(dateB) - new Date(dateA);
      });

    res.status(200).json({ success: true, posts: combinedPosts });
});

module.exports = { getCompanyJobs, getApplicants, getAllPosts };
