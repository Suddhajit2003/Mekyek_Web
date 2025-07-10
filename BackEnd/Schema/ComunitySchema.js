const joi = require("joi");

const comunitySchema = joi.object({
    name: joi.string(),
    description: joi.string(),
    members: joi.array().items(joi.object({
        userId: joi.string(),
        role: joi.string().valid('admin', 'member', 'owner')
    })),
    posts: joi.array().items(joi.object({
        author: joi.object({
            firstName: joi.string(),
            lastName: joi.string(),
            profilePhoto: joi.string(),
            _id: joi.string()
        }),
        content: joi.string(),
        image: joi.string().default(null),
        createdAt: joi.date().default(Date.now),
        likes: joi.number().default(0),
        likeBy: joi.array().items(joi.string()),
        comments: joi.array().items(joi.object({
            comment: joi.string(),
            commenter: joi.string(),
            createdAt: joi.date().default(Date.now),
            userName: joi.string()
        }))
    }))
});

module.exports = { comunitySchema };