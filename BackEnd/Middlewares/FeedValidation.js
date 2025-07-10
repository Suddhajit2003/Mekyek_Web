const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');
const { feedSchema } = require('../Schema/FeedsSchema');
const ExpressError = require('../utils/ExpressError');

const feedValidation = (req, res, next) => {
    console.log("Validating feed:");

    // ✅ Ensure `req.body` contains expected data
    const data = {
        content: req.body.content,
        author: {
            firstName: req.body.firstName || "",
            lastName: req.body.lastName || "",
            profilePhoto: req.body.userPhoto || "",
            _id: req.body.userId || "",
        },
        feedImage: req.file ? req.file.buffer.toString("base64") : undefined,
        postOn: req.body.postOn,
    };

    const { error } = feedSchema.validate(data, { abortEarly: false });

    if (error) {
        console.log("Error", error);
        return next(new ExpressError(error.details.map(err => err.message).join(', '), 400));
    }

    next();
}

module.exports = { feedValidation };