const mongoose = require('mongoose');

const comunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: null
    },
    members: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            role: {
                type: String,
                enum: ['admin', 'member', 'owner'],
                default: 'member'
            }
        }
    ],
    posts: [
        {
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
        }
    ]
});

const Comunity = mongoose.model('Comunity', comunitySchema);

module.exports = Comunity;