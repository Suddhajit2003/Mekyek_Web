const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const ExpressError = require('./utils/ExpressError.js');
const authRoutes = require('./Routes/AuthRouter.js');
const postRoutes = require('./Routes/PostRouter.js');
const companyRoutes = require('./Routes/CompanyRouter.js');
const ATSRouter = require('./Routes/ATSRouter.js');
const profileRoutes = require('./Routes/ProfileRouter.js');
const feedsRoutes = require('./Routes/FeedsRouter.js');
const CommunityRouter = require('./Routes/CommunityRouter.js');
require('./mongodb.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// To resolve the CORS issue, I'm allowing requests from the frontend development server
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Adding '/api' prefix to all routes to match frontend requests
const apiRouter = express.Router();

// Routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/posts', postRoutes);
// Using feedsRoutes for the '/news' endpoint as it seems to be the most relevant
//apiRouter.use('/news', feedsRoutes); 
apiRouter.use('/company', companyRoutes);
apiRouter.use('/ATS', ATSRouter);
apiRouter.use('/profile', profileRoutes);
apiRouter.use('/feeds', feedsRoutes);
apiRouter.use('/community', CommunityRouter);

app.use('/api', apiRouter);

app.get('/ping', (req, res) => res.send('PONG'));

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
