const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    content: {
        type: String
    },
    author: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        profilePhoto: {
            type: String
        },
        _id: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    newsPhoto: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    likeBy: [
        {
            type: Schema.Types.ObjectId,
                ref: 'User'
        }
    ],
    comments: [
        {
            comment: {
                type: String,

            },
            commenter: {
                type: Schema.Types.ObjectId,
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

const NewsModel = mongoose.model('News', NewsSchema);
module.exports = NewsModel;
