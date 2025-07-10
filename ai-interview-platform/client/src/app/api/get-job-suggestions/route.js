import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { input } = await request.json();

    if (!input || input.trim().length < 2) {
      return NextResponse.json([]);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a job suggestion assistant. Provide relevant tech job titles and descriptions based on user input."
        },
        {
          role: "user",
          content: `Suggest 5 relevant tech job titles and brief descriptions related to: ${input}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const suggestions = parseOpenAIResponse(completion.choices[0].message.content);
    return NextResponse.json(suggestions);

  } catch (error) {
    console.error('Job suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}

function parseOpenAIResponse(content) {
  try {
    // Default suggestions in case parsing fails
    const defaultSuggestions = [
      {
        title: "Software Developer",
        description: "Develops and maintains software applications"
      },
      {
        title: "Frontend Developer",
        description: "Specializes in user interface and web development"
      },
      {
        title: "Backend Developer",
        description: "Focuses on server-side logic and databases"
      },
      {
        title: "Full Stack Developer",
        description: "Works on both frontend and backend development"
      },
      {
        title: "DevOps Engineer",
        description: "Manages deployment and infrastructure automation"
      }
    ];

    // Try to parse OpenAI's response
    const lines = content.split('\n').filter(line => line.trim());
    const suggestions = [];

    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i] && lines[i + 1]) {
        const title = lines[i].replace(/^\d+\.\s*/, '').trim();
        const description = lines[i + 1].replace(/^-\s*/, '').trim();
        
        if (title && description) {
          suggestions.push({ title, description });
        }
      }
    }

    return suggestions.length > 0 ? suggestions : defaultSuggestions;
  } catch (error) {
    console.error('Error parsing OpenAI response:', error);
    return defaultSuggestions;
  }
} 