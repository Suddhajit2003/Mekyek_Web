const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

const analyzeVideoFrame = async (imageBuffer) => {
  try {
    const [result] = await client.faceDetection({
      image: { content: imageBuffer }
    });
    
    const faces = result.faceAnnotations;
    
    // Extract relevant facial features
    const analysis = faces.map(face => ({
      joy: face.joyLikelihood,
      sorrow: face.sorrowLikelihood,
      anger: face.angerLikelihood,
      confidence: face.detectionConfidence,
      pose: {
        roll: face.rollAngle,
        tilt: face.tiltAngle,
        pan: face.panAngle
      }
    }));

    return analysis;
  } catch (error) {
    console.error('Video Analysis Error:', error);
    throw new Error('Failed to analyze video frame');
  }
};

module.exports = { analyzeVideoFrame }; 