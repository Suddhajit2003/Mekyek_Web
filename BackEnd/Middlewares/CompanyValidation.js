const { companyRegistrationSchema } = require("../schema");
const { jobApplicationSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

const companyValidation = (req, res, next) => {
    console.log("Validating company registration...");

    const data = {
        companyName: req.body.companyName,
        companyLogo: req.file ? req.file.buffer.toString("base64") : undefined,
        address: req.body.address,
        email: req.body.email,
        motto: req.body.motto,
        website: req.body.website,
        domain: req.body.domain,
        gstNumber: req.body.gstNumber,
        corporateId: req.body.corporateId,
        userId: Array.isArray(req.body.userId) ? req.body.userId[0] : req.body.userId || "",
    };
    // console.log('schema',companyRegistrationSchema)
    // const { error } = companyRegistrationSchema.validate(data, { abortEarly: false });
    // console.log('data',data)
    // if (error) {
    //     console.log("❌ Company registration validation failed:", error);
    //     return next(new ExpressError(error.details.map(err => err.message).join(", "), 400));
    // }
    // console.log("✅ Company registration data is valid");
    next();
};


const jobApplyValidation = (req, res, next) => {
    console.log("Validating job application...");

    const data = {
        jobID: req.body.jobID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        resume: req.file ? req.file.buffer.toString("base64") : null,
        area: req.body.area,
        cityStateCountry: req.body.cityStateCountry,
        getEmailUpdates: req.body.getEmailUpdates || false,
        userId: req.body.userId,
        companyId: req.body.companyId,
    };

    // const { error } = jobApplicationSchema.validate(data, { abortEarly: false });
    // if (error) {
    //     console.log("❌ Job application validation failed:", error);
    //     return next(new ExpressError(error.details.map(err => err.message).join(", "), 400));
    // }
    // console.log("✅ Job application data is valid");
    next();
};

module.exports = { companyValidation, jobApplyValidation };
