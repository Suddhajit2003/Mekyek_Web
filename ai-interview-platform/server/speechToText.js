const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

const convertSpeechToText = async (audioBuffer) => {
  try {
    // The audio input configuration
    const audio = {
      content: audioBuffer.toString('base64'),
    };
    
    const config = {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 48000,
      languageCode: 'en-US',
    };

    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    return transcription;
  } catch (error) {
    console.error('Speech-to-Text Error:', error);
    throw new Error('Failed to convert speech to text');
  }
};

module.exports = { convertSpeechToText }; 