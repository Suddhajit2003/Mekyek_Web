const e = require('cors');
const { language } = require('googleapis/build/src/apis/language');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        unique: true ,
        sparse: true,
    },
    password: {
        type: String,
    },
    profilePhoto: {
        type: String,
    },
    gender: {
        type: String,
    },
    country : {
        type: String,
    },
    profileBanner: {
        location: {
            type: String,
        },
        description : {
            type: String,
        }
    },
    about: {
        type: String,
    },
    workExperience: [{
        title: {
            type: String,
        },
        company: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        description: {
            type: String,
        },
        jobType: {
            type: String,
        },
    }],
    skills: {
        technicalKnowledge: {
            language: [{
                type: String,
            }],
            framework: [{
                type: String,
            }],
        },
        coreKnowledge: [
            {
                type: String,
            }
        ],
        languages: [
            {
                name: {
                    type: String,
                },
                level: {
                    type: String,
                }
            }
        ]
    },
    education: [
        {
            name: {
                type: String,
            },
            stream: {
                type: String,
            },
            endDate: {
                type: Date,
            },
        }
    ],
    certificate: [
        {
            name: {
                type: String,
            },
            issuedBy: {
                type: String,
            },
            courseType: {
                type: String,
            },
            duration: {
                type: String,
            },
            description: {
                type: String,
            },
        }
    ],
    appliedJobs: [
        {
            jobId: {
                type: Schema.Types.ObjectId,
                ref: 'jobs',
            },
            companyId: {
                type: Schema.Types.ObjectId,
                ref: 'company',
            },
            resume: {
                type: String,
            },
            status: {
                type: String,
            },
            appliedDate: {
                type: Date,
            },
            getEmailUpdates: {
                type: Boolean,
            }
        }
    ],
    friends: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            status: {
                type: String,
            },
            connectionDate: {
                type: Date,
            }
        }
    ],
    pendingFriends: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            status: {
                type: String,
            },
            requestDate: {
                type: Date,
            }
        }
    ],
    friendRequests: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'users',
            },
            status: {
                type: String,
            },
            requestDate: {
                type: Date,
            }
        }
    ],
});

const UserModal = mongoose.model('users', UserSchema);
module.exports = UserModal;