const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
            type: String,
        }
    },
    eventType: {
        type: String,
        enum: ['local', 'seminar', 'cultural']
    },
    eventName: {
        type: String
    },
    eventImage: {
        type: String, // Store image URL (uploaded to a storage service or locally)
        default: null
    },
    location: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
