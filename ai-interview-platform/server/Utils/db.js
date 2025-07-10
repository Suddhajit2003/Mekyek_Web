const mongoose = require('mongoose');

const mongo_url = process.env.MONGODB_URL;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log('Connected to MongoDB');
        
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

connectToDatabase();

module.exports = mongoose;