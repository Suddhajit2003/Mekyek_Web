const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    author: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        profilePhoto: {
            type: String,
        },
        _id: {
            type: String
        }
    },
    content: {
        type: String,
    },
    image: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    likeBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            comment: {
                type: String,
                required: true
            },
            commenter: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            userName: {
                type: String
            },
        }
    ]
});

const FeedModal = mongoose.model('Feed', feedSchema);

module.exports = FeedModal;
