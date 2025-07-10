const joi = require("joi");

const feedSchema = joi.object({
    author: joi.object({
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        profilePhoto: joi.string().optional(),
        _id: joi.string().required()
    }),
    content: joi.string(),
    image: joi.string().default(null).optional(),
    createdAt: joi.date().default(Date.now),
    likes: joi.number().default(0),
    likeBy: joi.array().items(joi.string()),
    comments: joi.array().items(joi.object({
        comment: joi.string().required(),
        commenter: joi.string().required(),
        createdAt: joi.date().default(Date.now),
        userName: joi.string().optional
    }))
});

module.exports = {feedSchema};