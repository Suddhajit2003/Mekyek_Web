const { newsSchema, eventSchema, jobSchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');

const newsValidation = (req, res, next) => {
    console.log("Validating news:");
    // ✅ Ensure `req.body` contains expected data
    const data = {
        content: req.body.content,
        author: {
            firstName: req.body.firstName || "",
            lastName: req.body.lastName || "",
            profilePhoto: req.body.userPhoto || "",
            _id: req.body.userId || "",
        },
        newsPhoto: req.file ? req.file.buffer.toString("base64") : undefined,
    };

    const { error } = newsSchema.validate(data, { abortEarly: false });

    if (error) {
        return next(new ExpressError(error.details.map(err => err.message).join(', '), 400));
    }

    next();
};


const eventValidation = (req, res, next) => {
    console.log("Validating event:");

    // ✅ Ensure `req.body` contains expected data
    const data = {
        author: {
            firstName: req.body.firstName || "",
            lastName: req.body.lastName || "",
            profilePhoto: req.body.userPhoto || "",
            _id: req.body.userId || "",
        },
        eventType: req.body.eventType,
        eventName: req.body.eventName,
        eventImage: req.file ? req.file.buffer.toString("base64") : undefined,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
    };

    // const { error } = eventSchema.validate(data, { abortEarly: false });

    if (error) {
        return next(new ExpressError(error.details.map(err => err.message).join(', '), 400));
    }

    next();
};

const jobValidation = (req, res, next) => {
    console.log("Validating job posting...");
    console.log("Request body:", req.body);
    const data = {
        qualifications: req.body.qualifications,
        location: req.body.location,
        jobBenefits: req.body.jobBenefits,
        jobDescription: req.body.jobDescription,
        role: req.body.role,
        industryType: req.body.industryType,
        department: req.body.department,
        employmentType: req.body.employmentType,
        roleCategory: req.body.roleCategory,
        salary: req.body.salary,
        experience: req.body.experience,
        jobType: req.body.jobType,
        postedOn: req.body.postedOn,
        company: {
            companyName: req.body.companyName,
            companyLogo: req.body.companyLogo,
            companyEmail: req.body.companyEmail,
            companyId: req.body.companyId,
        }
    };

    console.log("Request data:", data);

    console.log("Validating job data:");

    const { error } = jobSchema.validate(data, { abortEarly: false });

    if (error) {
        console.log("❌ Job validation failed:", error.details.map(err => err.message).join(', '));
        return next(new ExpressError(error.details.map(err => err.message).join(', '), 400));
    }

    next();
};

module.exports = { newsValidation, eventValidation, jobValidation };
