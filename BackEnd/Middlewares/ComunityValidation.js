const { comunitySchema } = require('../Schema/ComunitySchema')
const ExpressError = require('../utils/ExpressError');

const communityValidation = (req, res, next) => {
    console.log("Validating community:");

    const data = {
        name: req.body.name,
        description: req.body.description,
        members: req.body.members.map(member => ({
            userId: member.userId,
            role: member.role
        })),
        posts: req.body.posts.map(post => ({
            author: {
                firstName: post.author.firstName,
                lastName: post.author.lastName,
                profilePhoto: post.author.profilePhoto,
                _id: post.author._id
            },
            content: post.content,
            image: post.image || null,
            createdAt: post.createdAt || Date.now(),
            likes: post.likes || 0,
            likeBy: post.likeBy,
            comments: post.comments.map(comment => ({
                comment: comment.comment,
                commenter: comment.commenter,
                createdAt: comment.createdAt || Date.now(),
                userName: comment.userName
            }))
        }))
    };

    const { error } = communitySchema.validate(data);
    if (error) {
        console.log("Error", error);
        throw new ExpressError(error.details[0].message, 400);
    } else {
        next();
    }
};

module.exports = {communityValidation};
