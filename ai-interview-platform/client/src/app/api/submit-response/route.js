import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, context, audioData } = body;
    const { role, experience, skills, difficulty } = context;

    // Create a more specific prompt based on context
    const prompt = `
      Context:
      - Role: ${role} (Detailed job title)
      - Years of Experience: ${experience}
      - Skills: ${skills.join(', ')}
      - Question Difficulty: ${difficulty}

      Candidate Response: "${text}"

      Please analyze this interview response considering:
      1. Technical accuracy for ${role} position
      2. Relevance to the specific role requirements
      3. Depth of knowledge in required areas
      4. Communication clarity
      5. Areas for improvement
      6. Confidence and presentation (based on video/audio)

      Provide a structured analysis with specific feedback.
    `;

    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 250,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const analysis = response.data.choices[0].text.trim();
    
    return NextResponse.json({ 
      success: true, 
      textAnalysis: analysis 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process response' },
      { status: 500 }
    );
  }
} 