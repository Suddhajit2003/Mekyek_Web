"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";

// Add this gradient background class to your globals.css
const gradientBg = "bg-gradient-to-br from-blue-50 via-white to-purple-50";

// Add valid job roles and skills arrays
const VALID_JOB_ROLES = [
  "Software Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "UI/UX Designer",
  "Product Manager",
  "QA Engineer",
  "Mobile Developer",
];

const VALID_SKILLS = [
  // Technical Programming Languages
  "Python Programming",
  "Java Programming",
  "C Programming",
  "C++ Programming",
  "JavaScript Development",
  "HTML5 Coding",
  "CSS3 Styling",
  "SQL Querying",
  // ... (continue with all 1000 skills)
].sort(); // Sort alphabetically for better user experience

// Here's how to organize the skills by categories:
const SKILL_CATEGORIES = {
  "Programming Languages": [
    "Python Programming",
    "Java Programming",
    "C Programming",
    "C++ Programming",
    // ...
  ],
  "Web Development": [
    "HTML5 Coding",
    "CSS3 Styling",
    "JavaScript Development",
    // ...
  ],
  Database: [
    "SQL Querying",
    "NoSQL Database Management",
    "MongoDB Management",
    // ...
  ],
  // ... other categories
};

export default function Interview() {
  const [started, setStarted] = useState(false);
  const [profile, setProfile] = useState({
    role: "",
    experience: "",
    skills: [],
  });
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [context, setContext] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(75 * 15);
  const [questionTimer, setQuestionTimer] = useState(75);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [fullscreenViolations, setFullscreenViolations] = useState(0);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showStartAnimation, setShowStartAnimation] = useState(false);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const questionTimerRef = useRef(null);

  const QUESTION_TIME = 75; // 1.25 minutes in seconds
  const MAX_VIOLATIONS = 2;

  useEffect(() => {
    if (started) {
      startMediaRecording();
    }
    return () => {
      stopMediaRecording();
    };
  }, [started]);

  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerRef.current);
    } else if (timeLeft === 0) {
      handleInterviewEnd();
    }
  }, [started, timeLeft]);

  useEffect(() => {
    if (question && questionTimer > 0) {
      questionTimerRef.current = setInterval(() => {
        setQuestionTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(questionTimerRef.current);
    } else if (questionTimer === 0) {
      handleQuestionTimeout();
    }
  }, [question, questionTimer]);

  useEffect(() => {
    if (isInterviewComplete) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isInterviewComplete]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (started && !document.fullscreenElement) {
        setFullscreenViolations((prev) => {
          const newCount = prev + 1;
          if (newCount > MAX_VIOLATIONS) {
            handleAutoFail();
            return prev;
          }
          showFullscreenWarning(MAX_VIOLATIONS - newCount);
          handleFullscreen();
          return newCount;
        });
      }
    };

    if (started) {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [started]);

  // Add screen capture prevention
  useEffect(() => {
    if (started) {
      // Prevent screenshots
      document.addEventListener("keydown", preventScreenCapture);

      // Prevent screen recording
      const style = document.createElement("style");
      style.innerHTML = `
        .interview-content {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        video, canvas {
          -webkit-filter: blur(0);
          filter: blur(0);
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.removeEventListener("keydown", preventScreenCapture);
        document.head.removeChild(style);
      };
    }
  }, [started]);

  const preventScreenCapture = (e) => {
    // Prevent common screenshot shortcuts
    if (
      e.key === "PrintScreen" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "C") ||
      (e.ctrlKey && e.key === "u") ||
      (e.metaKey && e.shiftKey && e.key === "3") ||
      (e.metaKey && e.shiftKey && e.key === "4")
    ) {
      e.preventDefault();
      alert("Screen capture is not allowed during the interview.");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleQuestionTimeout = async () => {
    if (questionCount < 15) {
      await getNextQuestion();
      setQuestionTimer(QUESTION_TIME);
      setQuestionCount((prev) => prev + 1);
    } else {
      handleInterviewEnd();
    }
  };

  const handleInterviewEnd = () => {
    stopMediaRecording();
    setIsInterviewComplete(true);

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }

    window.removeEventListener("beforeunload", handleBeforeUnload);
  };

  const checkResponseQuality = (text) => {
    const poorResponsePatterns = [
      /^(no|nope|na|not sure|don't know|unsure)$/i,
      /^.{0,20}$/, // Too short responses
      /^i don't have experience/i,
      /^never done that/i,
      /^not applicable/i,
      /^pass$/i,
      /^skip$/i,
    ];
    return poorResponsePatterns.some((pattern) => pattern.test(text.trim()));
  };

  const handleWrongAnswer = async () => {
    setConsecutiveWrongAnswers((prev) => prev + 1);
    setResponse("");

    try {
      const res = await axios.post("/api/get-question", {
        ...profile,
        lastResponseWasWrong: true,
        consecutiveWrongAnswers: consecutiveWrongAnswers + 1,
      });

      setQuestion(res.data.question);
      setContext(res.data.context);
      setQuestionTimer(QUESTION_TIME);

      const feedback = document.createElement("div");
      feedback.className = "text-red-500 mb-4";
      feedback.textContent =
        "Let's try a different question that might be more suitable.";
      document.querySelector("#questionContainer").prepend(feedback);

      setTimeout(() => feedback.remove(), 3000);
    } catch (error) {
      console.error("Error getting new question:", error);
    }
  };

  const startMediaRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);

      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        // Process audio if needed
      };

      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopMediaRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleFullscreen = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
    }
  };

  const handleStartInterview = async (e) => {
    e.preventDefault();
    setShowStartAnimation(true);

    // Wait for animation to complete
    setTimeout(async () => {
      await handleFullscreen();
      setStarted(true);
      await getNextQuestion();
      setShowStartAnimation(false);
    }, 2000); // 2 seconds for animation

    window.addEventListener("beforeunload", handleBeforeUnload);
  };

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "Interview in progress. Are you sure you want to leave?";
    return e.returnValue;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && started) {
        e.preventDefault();
        handleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      if (started && !document.fullscreenElement) {
        handleFullscreen();
      }
    };

    if (started) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [started]);

  const getNextQuestion = async () => {
    try {
      const res = await axios.post("/api/get-question", profile);
      setQuestion(res.data.question);
      setContext(res.data.context);
    } catch (error) {
      console.error("Error getting question:", error);
      alert("Failed to get question. Please try again.");
    }
  };

  const submitResponse = async () => {
    try {
      const finalResponse = response.trim();

      if (!finalResponse) {
        alert("Please provide an answer before submitting.");
        return;
      }

      const isWrongAnswer = checkResponseQuality(finalResponse);

      if (!isWrongAnswer) {
        setScore((prev) => prev + 1);
      }

      if (questionCount < 14) {
        await getNextQuestion();
        setQuestionTimer(QUESTION_TIME);
        setResponse("");
        setQuestionCount((prev) => prev + 1);
      } else {
        handleInterviewEnd();
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const getJobSuggestions = async (input) => {
    if (!input) {
      setJobSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await axios.post("/api/get-job-suggestions", { input });
      setJobSuggestions(response.data);
    } catch (error) {
      console.error("Error getting job suggestions:", error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (profile.role) {
        getJobSuggestions(profile.role);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [profile.role]);

  const showFullscreenWarning = (remainingAttempts) => {
    const warning = document.createElement("div");
    warning.className =
      "fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50";
    warning.textContent = `Warning: Exiting fullscreen is not allowed. ${remainingAttempts} attempts remaining before automatic disqualification.`;
    document.body.appendChild(warning);
    setTimeout(() => warning.remove(), 3000);
  };

  const handleAutoFail = () => {
    setScore(0);
    setIsInterviewComplete(true);
    setStarted(false);
    stopMediaRecording();

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  const resetInterview = () => {
    setStarted(false);
    setProfile({
      role: "",
      experience: "",
      skills: [],
    });
    setQuestion("");
    setResponse("");
    setAnalysis("");
    setContext(null);
    setIsRecording(false);
    setAudioStream(null);
    setTimeLeft(75 * 15);
    setQuestionTimer(75);
    setQuestionCount(0);
    setWrongAnswers(0);
    setConsecutiveWrongAnswers(0);
    setScore(0);
    setIsInterviewComplete(false);
    setFullscreenViolations(0);
    setShowSkillSuggestions(false);

    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }

    window.removeEventListener("beforeunload", handleBeforeUnload);
  };

  const renderContent = () => {
    if (showStartAnimation) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center z-50">
          <div className="text-center space-y-10">
            {/* Logo Animation */}
            <div className="relative">
              {/* Multiple glowing rings */}
              <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-10"></div>
              <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-15 delay-100"></div>
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20 delay-200"></div>

              <div className="relative animate-bounce-slow">
                <svg
                  className="w-32 h-32 text-gradient-purple-blue transform transition-transform"
                  fill="none"
                  stroke="url(#gradient)"
                  viewBox="0 0 24 24">
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    className="animate-draw"
                  />
                </svg>
              </div>
            </div>

            {/* Text Animations */}
            <div className="space-y-8">
              <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 animate-fade-in-up">
                Interview Starting
              </h2>
              <div className="flex items-center justify-center space-x-3 animate-fade-in">
                <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full animate-loading-1"></div>
                <div className="w-4 h-4 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full animate-loading-2"></div>
                <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-loading-3"></div>
              </div>
              <p className="text-2xl bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200 text-transparent bg-clip-text animate-fade-in-up-delay font-light">
                Powered by <span className="font-semibold">Mekyek AI</span>
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (isInterviewComplete) {
      return (
        <div
          className={`min-h-screen flex items-center justify-center ${gradientBg}`}>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              Interview Complete
            </h2>

            {fullscreenViolations > MAX_VIOLATIONS ? (
              <div className="space-y-4 text-center">
                <div className="text-6xl mb-6">⚠️</div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  Disqualified
                </h3>
                <p className="text-gray-600">
                  You were disqualified for attempting to exit fullscreen mode.
                </p>
              </div>
            ) : score >= 8 ? (
              <div className="space-y-4 text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Congratulations!
                </h3>
                <p className="text-gray-600">
                  You've successfully completed the interview!
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="text-6xl mb-6">💪</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                  Better luck next time!
                </h3>
              </div>
            )}

            {fullscreenViolations <= MAX_VIOLATIONS && (
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    Your Score
                  </p>
                  <p className="text-3xl font-bold text-blue-600">{score}/15</p>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-500">Page will refresh in 5 seconds...</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-[shrink_5s_linear]" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!started) {
      return (
        <div
          className={`min-h-screen py-12 px-4 ${gradientBg}`}
          style={{ backgroundColor: "transparent" }}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
              <h1 className="text-3xl font-bold mb-8 text-gray-800">
                AI Interview Setup
              </h1>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-8">
                <h2 className="text-lg font-semibold text-amber-800 mb-4">
                  Before You Begin
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center text-amber-700">
                    <span className="mr-2">📹</span>
                    Working webcam and microphone
                  </li>
                  <li className="flex items-center text-amber-700">
                    <span className="mr-2">🔇</span>
                    Quiet environment
                  </li>
                  <li className="flex items-center text-amber-700">
                    <span className="mr-2">⏰</span>
                    45-60 minutes of uninterrupted time
                  </li>
                  <li className="flex items-center text-amber-700">
                    <span className="mr-2">🌐</span>
                    Stable internet connection
                  </li>
                </ul>
              </div>

              <form onSubmit={handleStartInterview} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Role
                  </label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) =>
                      setProfile({ ...profile, role: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white"
                    placeholder="Enter your job role..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={profile.experience}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow single digits (0-9)
                      if (
                        value === "" ||
                        (parseInt(value) >= 0 && parseInt(value) <= 9)
                      ) {
                        setProfile({ ...profile, experience: value });
                      }
                    }}
                    onKeyPress={(e) => {
                      // Prevent non-numeric and numbers > 9
                      if (!/[0-9]/.test(e.key) || e.target.value + e.key > 9) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white"
                    min="0"
                    max="9"
                    required
                    placeholder="0-9"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (Add multiple)
                  </label>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center">
                          {skill}
                          <button
                            onClick={() => {
                              const newSkills = profile.skills.filter(
                                (_, i) => i !== index
                              );
                              setProfile({ ...profile, skills: newSkills });
                            }}
                            className="ml-2 text-blue-500 hover:text-blue-700">
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={profile.currentSkill || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value.includes(",")) {
                          setProfile({ ...profile, currentSkill: value });

                          if (
                            VALID_SKILLS.some(
                              (skill) =>
                                skill
                                  .toLowerCase()
                                  .startsWith(value.toLowerCase()) &&
                                !profile.skills.includes(skill)
                            )
                          ) {
                            setShowSkillSuggestions(true);
                          } else {
                            setShowSkillSuggestions(false);
                          }
                        } else {
                          const newSkill = value.replace(",", "").trim();
                          if (newSkill && !profile.skills.includes(newSkill)) {
                            setProfile({
                              ...profile,
                              skills: [...profile.skills, newSkill],
                              currentSkill: "",
                            });
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          const newSkill = profile.currentSkill?.trim();
                          if (newSkill && !profile.skills.includes(newSkill)) {
                            setProfile({
                              ...profile,
                              skills: [...profile.skills, newSkill],
                              currentSkill: "",
                            });
                          }
                        }
                      }}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white"
                      placeholder="Type a skill and press Enter or comma"
                    />

                    {showSkillSuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {VALID_SKILLS.filter(
                          (skill) =>
                            skill
                              .toLowerCase()
                              .startsWith(
                                (profile.currentSkill || "").toLowerCase()
                              ) && !profile.skills.includes(skill)
                        ).map((skill, index) => (
                          <div
                            key={index}
                            className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                            onClick={() => {
                              setProfile({
                                ...profile,
                                skills: [...profile.skills, skill],
                                currentSkill: "",
                              });
                              setShowSkillSuggestions(false);
                            }}>
                            <span className="text-gray-900 font-medium">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      Press Enter or comma to add multiple skills
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all font-medium text-lg">
                  Schedule Interview
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-screen bg-gray-50 interview-content">
        {/* Timer bar */}
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg p-4 z-50">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            {/* Left timer */}
            <div className="flex items-center">
              <div className="text-center">
                <span className="text-sm font-medium text-gray-500">
                  Total Time
                </span>
                <p className="text-2xl font-bold text-red-600">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>

            {/* Center progress */}
            <div className="flex items-center">
              <div className="text-center">
                <span className="text-sm font-medium text-gray-500">
                  Progress
                </span>
                <p className="text-xl font-bold text-gray-900">
                  {questionCount + 1}/15
                </p>
              </div>
            </div>

            {/* Right timer */}
            <div className="flex items-center">
              <div className="text-center">
                <span className="text-sm font-medium text-gray-500">
                  Question Timer
                </span>
                <p className="text-2xl font-bold text-red-600">
                  {formatTime(questionTimer)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 mt-2">
            <div
              className="h-full bg-red-600 transition-all duration-1000"
              style={{ width: `${(questionTimer / QUESTION_TIME) * 100}%` }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 mt-24">
          {/* Sidebar */}
          <div className="w-96 bg-white/80 backdrop-blur-sm p-6 border-r border-gray-200">
            {/* Candidate View Section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Live Preview
                  </h2>
                  {isRecording && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                      Live
                    </span>
                  )}
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored
                    className="w-full aspect-video object-cover"
                    screenshotFormat="image/webp"
                    videoConstraints={{
                      width: 1280,
                      height: 720,
                      facingMode: "user",
                      screenshotQuality: 0,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium">Camera Active</span>
                    </div>
                    {isRecording && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Recording</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    Candidate Profile
                  </h3>
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-500 mb-1">Role</p>
                    <p className="text-gray-900 font-semibold">
                      {profile.role}
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-500 mb-1">Experience</p>
                    <p className="text-gray-900 font-semibold">
                      {profile.experience}{" "}
                      {profile.experience === "1" ? "year" : "years"}
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-500 mb-1">Skills</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question area */}
          <div className="flex-1 p-8 overflow-y-auto">
            {question && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <p className="text-xl font-medium text-gray-900 mb-8">
                  {question}
                </p>

                <div className="space-y-6">
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full p-4 border border-gray-300 rounded-xl min-h-[200px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-semibold placeholder-gray-500"
                    rows={8}
                    required
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={submitResponse}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all font-medium flex items-center">
                    Submit <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}

            {analysis && (
              <div className="mt-8 bg-gray-50 rounded-xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI Analysis
                </h3>
                <div className="prose prose-blue max-w-none">{analysis}</div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={getNextQuestion}
                    className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all font-medium">
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
}
