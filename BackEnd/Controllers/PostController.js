const NewsModel = require('../Models/News');
const EventModel = require('../Models/Event');
const JobModel = require('../Models/Job');
const CompanyJobModel = require('../Models/ATS/CompanyJobs');
const wrapAsync = require('../utils/wrapAsync');

// POST News
const postNews = wrapAsync(async (req, res) => {
    console.log("Processing News Post...");

    if (!req.body.content) {
        console.error("❌ Content is required.");
        return res.status(400).json({ message: "Content is required.", success: false });
    }

    const news = new NewsModel({
        content: req.body.content,
        author: {
            firstName: req.body.firstName || "Unknown",
            lastName: req.body.lastName || "",
            profilePhoto: req.body.userPhoto || "",
            _id: req.body.userId || "",
        },
        newsPhoto: req.file ? req.file.path: null,
        likes: 0,
        likeBy: [],
        comments: [],
    });

    console.log("news:", news);

    const savedNews = await news.save();
    console.log("✅ News saved successfully:", savedNews);

    res.status(201).json({ message: 'News created successfully', success: true, news: savedNews });
});

// GET News
const getNews = wrapAsync(async (req, res) => {
    const news = await NewsModel.find({});
    res.status(200).json(news);
});

// Like News

const likeNews = wrapAsync(async (req, res) => {
    console.log("Processing News Like...");
    const { newsId, userId } = req.body;

    const News = await NewsModel.findById(newsId);
    if (!News) {
        console.error("❌ News not found");
        return res.status(404).json({ message: "News not found", success: false });
    }

    if (News.likeBy.includes(userId)) {
        News.likes -= 1;
        News.likeBy = News.likeBy.filter((id) => 
            id.toString() !== userId.toString()
        );
        const updatedNews = await News.save();
        console.log("✅ News unliked successfully:", updatedNews);

        res.status(200).json({ message: "News unliked successfully", success: true, News: updatedNews });
        return;
    }

    News.likes += 1;
    News.likeBy.push(userId);

    const updatedNews = await News.save();
    console.log("✅ News liked successfully:", updatedNews);

    res.status(200).json({ message: "News liked successfully", success: true, News: updatedNews });
}
);  

const commentPostNews = wrapAsync(async (req, res) => {
    console.log("Processing News Comment...");
    const { newsId, userId, comment, userName } = req.body;

    const News = await NewsModel.findById(newsId);
    if (!News) {
        console.error("❌ News not found");
        return res.status(404).json({ message: "News not found", success: false });
    }

    News.comments.push({
        userId,
        comment,
        userName,
        createdAt: new Date(),
    });

    const updatedNews = await News.save();
    console.log("✅ News commented successfully:", updatedNews);

    res.status(200).json({ message: "News commented successfully", success: true, News: updatedNews });
});

const getComments = wrapAsync(async (req, res) => {
    const { newsId } = req.query;

    const News = await NewsModel.findById(newsId);
    if (!News) {
        console.error("❌ News not found");
        return res.status(404).json({ message: "News not found", success: false });
    }

    res.status(200).json({ comments: News.comments });
});

// POST Event
const postEvents = wrapAsync(async (req, res) => {
    console.log("Processing Event Post...");

    const { eventType, eventName, location, date, time } = req.body;

    if (!eventType || !eventName || !location || !date || !time) {
        return res.status(400).json({ message: "All event fields are required.", success: false });
    }

    const event = new EventModel({
        eventType,
        eventName,
        eventImage: req.file ? req.file.path : null,
        location,
        date,
        time,
        author: {
            firstName: req.body.firstName || "Unknown",
            lastName: req.body.lastName || "",
            profilePhoto: req.body.userPhoto || "",
            _id: req.body.userId || "",
        },
    });

    const savedEvent = await event.save();
    console.log("✅ Event saved successfully:", savedEvent);

    res.status(201).json({ message: 'Event created successfully', success: true, event: savedEvent });
});

// GET Events
const getEvents = wrapAsync(async (req, res) => {
    const events = await EventModel.find({});
    res.status(200).json(events);
});

// GET Event by ID
const getEventsById = wrapAsync(async (req, res) => {
    const { eventId } = req.params;
    console.log("Fetching event with ID:", req.params);
    const event = await EventModel.findById(eventId);

    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
});

// POST Job
const postJob = wrapAsync(async (req, res) => {
    console.log("Processing Job Post...");
    console.log("Request body:", req.body);

    const {
        qualifications,
        location,
        jobBenefits,
        jobDescription,
        role,
        industryType,
        department,
        employmentType,
        roleCategory,
        salary,
        experience,
        jobType,
        postedOn,
        companyName,
        companyLogo,
        companyEmail,
        companyId,
    } = req.body;

    console.log("Validating request body:");

    // Validate required fields
    if (!role || !industryType || !employmentType || !location || !jobDescription || !companyId) {
        console.log(role, industryType, employmentType, location, jobDescription, companyId);
        console.log("❌ Missing required job fields.");
        return res.status(400).json({ message: "Missing required job fields.", success: false });
    }

    // Create a new job
    const job = new JobModel({
        qualifications,
        location,
        jobBenefits,
        jobDescription,
        role,
        industryType,
        department,
        employmentType,
        roleCategory,
        salary,
        experience,
        jobType,
        postedOn: postedOn || new Date(),
        company: {
            companyName,
            companyLogo,
            companyEmail,
            companyId,
        },
    });

    // Save the job to the database
    const savedJob = await job.save();
    console.log("✅ Job saved successfully:", savedJob);

    // Automatically create a corresponding entry in CompanyJobModel
    const companyJob = new CompanyJobModel({
        jobId: savedJob._id,
        companyId: companyId,
        title: role,
        jobType: jobType,
        applicants: 0,
        postedOn: savedJob.postedOn,
        postedBy: 'Admin',
        rejected: [],
        onHold: [],
        interviewPending: [],
        interviewPassed: [],
        hired: [],
        totalCandidates: [],
        activeCandidates: [],
        location: location,
    });

    console.log("Creating Company Job entry...");

    // Save the company job entry
    const savedCompanyJob = await companyJob.save();
    console.log("✅ Company Job created successfully:", savedCompanyJob);

    res.status(201).json({
        message: 'Job created successfully',
        success: true,
        job: savedJob,
        companyJob: savedCompanyJob
    });
});



// GET Jobs
const getJobs = wrapAsync(async (req, res) => {
    const jobs = await JobModel.find({});
    res.status(200).json(jobs);
});

// Get a single job by ID
const getJobById = wrapAsync(async (req, res) => {
    console.log("Fetching job with ID:", req.params);
    const { jobId } = req.params;
    const job = await JobModel.findById(jobId);

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
});

module.exports = { getNews, postNews, likeNews, commentPostNews, getComments, getEvents, postEvents, getEventsById, getJobs, getJobById, postJob };
