import { NextResponse } from 'next/server';

// This would typically come from a database
const mockInterviews = [
  {
    id: 1,
    candidateName: "John Doe",
    email: "john@example.com",
    role: "Frontend Developer",
    score: 12,
    status: "PASSED",
    date: "2024-02-20T10:00:00Z",
    responses: [
      {
        question: "What programming languages are you familiar with?",
        answer: "I'm proficient in JavaScript, TypeScript, and Python...",
        score: 1
      },
      // ... more responses
    ]
  },
  // ... more interviews
];

export async function GET() {
  return NextResponse.json(mockInterviews);
} 