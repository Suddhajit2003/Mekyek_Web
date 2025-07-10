const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    candidateName: {
        type: String,
    },
    candidateEmail: {
        type: String,
    },
    candidateId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    interviewerName: {
        type: String,
    },
    interviewerId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    companyName: {
        type: String,
    },
    companyId: {
        ref: 'Company',
        type: mongoose.Schema.Types.ObjectId,
    },
    role: {
        type: String,
    },
    yearOfExperience: {
        type: Number,
    },
    skils: [
        {
            type: String
        }
    ],
    date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    isPassed: {
        type: Boolean,
        default : false
    },
    score : {
        type: Number
    },
    questions: [{
        question: {
            type: String
        },
        response: {
            type: String
        },
        isCorrect: {
            type: Boolean
        }
    }]
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;