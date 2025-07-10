import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

export default function Interview() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [transcription, setTranscription] = useState('');
  const [videoAnalysis, setVideoAnalysis] = useState(null);
  const [score, setScore] = useState(null);
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = useRef(null);

  const startInterview = async () => {
    // Fetch the first question from the server
    const res = await axios.get('/api/get-question');
    setQuestion(res.data.question);
  };

  const recordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return new Promise((resolve) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64Audio = reader.result.split(',')[1];
            resolve(base64Audio);
          };
          stream.getTracks().forEach(track => track.stop());
        });

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 5000); // Record for 5 seconds
      });
    } catch (error) {
      console.error('Error recording audio:', error);
      return null;
    }
  };

  const recordResponse = async () => {
    try {
      const videoBlob = webcamRef.current.getScreenshot({ type: 'video/webm' });
      const audioBlob = await recordAudio();
      const textResponse = response;

      const result = await axios.post('/api/submit-response', {
        video: videoBlob,
        audio: audioBlob,
        text: textResponse,
      });

      if (result.data.transcription) {
        setTranscription(result.data.transcription);
      }
      if (result.data.textAnalysis) {
        setAnalysis(result.data.textAnalysis);
      }
      if (result.data.videoAnalysis) {
        setVideoAnalysis(result.data.videoAnalysis);
      }
      if (result.data.score !== undefined) {
        setScore(result.data.score);
      }
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Driven Interview</h1>
      <button 
        onClick={startInterview}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Interview
      </button>
      {question && (
        <div className="mt-4">
          <p className="text-lg mb-4">{question}</p>
          <Webcam ref={webcamRef} className="mb-4" />
          <textarea 
            value={response} 
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response or speak into the microphone"
            className="w-full p-2 border rounded mb-4"
            rows={4}
          />
          <button 
            onClick={recordResponse}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Response
          </button>
          
          {score !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold">Overall Score:</h3>
              <p>{score}/100</p>
            </div>
          )}
          
          {transcription && (
            <div className="mt-4">
              <h3 className="font-bold">Speech Transcription:</h3>
              <p>{transcription}</p>
            </div>
          )}
          
          {analysis && (
            <div className="mt-4">
              <h3 className="font-bold">Content Analysis:</h3>
              <p>{analysis}</p>
            </div>
          )}
          
          {videoAnalysis && (
            <div className="mt-4">
              <h3 className="font-bold">Video Analysis:</h3>
              <ul>
                <li>Confidence: {(videoAnalysis[0]?.confidence * 100).toFixed(1)}%</li>
                <li>Joy Level: {videoAnalysis[0]?.joy}</li>
                <li>Posture: {Math.abs(videoAnalysis[0]?.pose.tilt) < 15 ? 'Good' : 'Could be improved'}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}