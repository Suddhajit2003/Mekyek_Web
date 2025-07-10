const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Utils/db.js');
const { analyzeTextResponse } = require('./openAi');
// const { convertSpeechToText } = require('./speechToText');
// const { analyzeVideoFrame } = require('./videoAnalysis');

const app = express();

// Update CORS configuration
app.use(cors({
  origin: ['http://localhost:9000', 'http://127.0.0.1:9000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '50mb' }));

// Add OPTIONS handler for preflight requests
app.options('*', cors());

// Mock questions
const questions = [
  { id: 1, text: 'Tell us about yourself.' },
  { id: 2, text: 'Describe a challenging project you worked on.' },
];

// API to get a question
app.get('/api/get-question', (req, res) => {
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  res.json({ question: randomQuestion.text });
});

// API to submit a response
app.post('/api/submit-response', async (req, res) => {
  try {
    const { text } = req.body;
    
    // Analyze the text response using OpenAI
    const textAnalysis = await analyzeTextResponse(text);
    
    res.json({ 
      success: true, 
      textAnalysis
    });
  } catch (error) {
    console.error('Error processing response:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process response' 
    });
  }
});

// Scoring function
function calculateScore({ textAnalysis, videoAnalysis, transcription }) {
  let score = 0;
  const maxScore = 100;
  
  // Text analysis scoring (50%)
  if (textAnalysis) {
    // Add scoring logic based on OpenAI analysis
    score += 50; // Placeholder - implement actual scoring logic
  }
  
  // Video analysis scoring (30%)
  if (videoAnalysis && videoAnalysis.length > 0) {
    const face = videoAnalysis[0];
    if (face.joy === 'VERY_LIKELY') score += 10;
    if (face.confidence > 0.8) score += 10;
    if (Math.abs(face.pose.tilt) < 15) score += 10; // Good posture
  }
  
  // Audio transcription scoring (20%)
  if (transcription) {
    score += 20; // Placeholder - implement actual scoring logic
  }
  
  return Math.min(score, maxScore);
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});