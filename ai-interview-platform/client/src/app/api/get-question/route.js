import { NextResponse } from 'next/server';

const questions = {
  software: {
    entry: [
      { id: 1, text: 'What programming languages are you familiar with and how have you used them in your projects?' },
      { id: 2, text: 'Describe your most significant project and the challenges you overcame.' },
      { id: 3, text: 'How do you stay updated with new technologies in your field?' },
      { id: 4, text: 'Explain your approach to debugging and problem-solving.' },
      { id: 5, text: 'What development tools and IDEs do you prefer and why?' },
    ],
    intermediate: [
      { id: 6, text: 'Describe a time when you improved code performance. What was your approach?' },
      { id: 7, text: 'How do you ensure code quality and maintainability in your projects?' },
      { id: 8, text: 'Explain your experience with version control and branching strategies.' },
      { id: 9, text: 'How do you handle technical debt in your projects?' },
      { id: 10, text: 'Describe your experience with CI/CD pipelines.' },
    ],
    senior: [
      { id: 11, text: 'How do you make architectural decisions for large-scale applications?' },
      { id: 12, text: 'Describe how you mentor junior developers and lead technical teams.' },
      { id: 13, text: 'How do you balance technical requirements with business needs?' },
      { id: 14, text: 'Explain your approach to system design and scalability.' },
      { id: 15, text: 'How do you handle emergency production issues and implement preventive measures?' },
    ],
  },
  data: {
    entry: [
      { id: 101, text: 'Explain your experience with data analysis tools and SQL.' },
      { id: 102, text: 'How do you approach data cleaning and preprocessing?' },
      { id: 103, text: 'Describe your experience with data visualization tools.' },
      { id: 104, text: 'What statistical methods have you used in your projects?' },
      { id: 105, text: 'How do you ensure data quality in your analysis?' },
    ],
    intermediate: [
      { id: 106, text: 'Describe a time when you improved code performance. What was your approach?' },
      { id: 107, text: 'How do you ensure code quality and maintainability in your projects?' },
      { id: 108, text: 'Explain your experience with version control and branching strategies.' },
      { id: 109, text: 'How do you handle technical debt in your projects?' },
      { id: 110, text: 'Describe your experience with CI/CD pipelines.' },
    ],
    senior: [
      { id: 111, text: 'How do you make architectural decisions for large-scale applications?' },
      { id: 112, text: 'Describe how you mentor junior developers and lead technical teams.' },
      { id: 113, text: 'How do you balance technical requirements with business needs?' },
      { id: 114, text: 'Explain your approach to system design and scalability.' },
      { id: 115, text: 'How do you handle emergency production issues and implement preventive measures?' },
    ],
  },
  design: {
    entry: [
      { id: 201, text: 'What design tools are you proficient in?' },
      { id: 202, text: 'How do you approach user research?' },
      { id: 203, text: 'Describe your design process for a recent project.' },
      { id: 204, text: 'How do you handle user feedback in your designs?' },
      { id: 205, text: "What is your approach to responsive design?" },
    ],
    intermediate: [
      { id: 206, text: 'Describe a time when you improved design performance.' },
      { id: 207, text: 'How do you ensure design consistency across projects?' },
      { id: 208, text: 'Explain your experience with design systems.' },
      { id: 209, text: 'How do you handle design debt in your projects?' },
      { id: 210, text: 'Describe your experience with design handoff to developers.' },
    ],
    senior: [
      { id: 211, text: 'How do you make design decisions for large-scale applications?' },
      { id: 212, text: 'Describe how you mentor junior designers and lead design teams.' },
      { id: 213, text: 'How do you balance user needs with business requirements?' },
      { id: 214, text: 'Explain your approach to scalable design systems.' },
      { id: 215, text: 'How do you handle design emergencies and implement improvements?' },
    ],
  },
  // Add more domains as needed
};

// Track question history for better follow-ups
const questionHistory = {
  currentDomain: '',
  askedQuestions: new Set(),
  wrongAnswers: 0,
  currentDifficulty: ''
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { role, experience, skills, lastResponseWasWrong, consecutiveWrongAnswers } = body;

    // Determine domain based on role and skills
    const domain = determineJobDomain(role, skills);
    questionHistory.currentDomain = domain;

    // Adjust difficulty based on experience and wrong answers
    let difficulty = determineDifficulty(experience, consecutiveWrongAnswers);
    questionHistory.currentDifficulty = difficulty;

    // If too many wrong answers, try a different domain or easier questions
    if (consecutiveWrongAnswers > 2) {
      return getAlternativeQuestion(domain, difficulty, consecutiveWrongAnswers);
    }

    const relevantQuestions = questions[domain][difficulty].filter(
      q => !questionHistory.askedQuestions.has(q.id)
    );

    if (relevantQuestions.length === 0) {
      questionHistory.askedQuestions.clear();
      return getAlternativeQuestion(domain, difficulty, consecutiveWrongAnswers);
    }

    const randomQuestion = relevantQuestions[Math.floor(Math.random() * relevantQuestions.length)];
    questionHistory.askedQuestions.add(randomQuestion.id);

    return NextResponse.json({ 
      question: randomQuestion.text,
      context: { role, experience, skills, difficulty, domain }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get question' },
      { status: 500 }
    );
  }
}

function determineJobDomain(role, skills) {
  const roleAndSkills = `${role} ${skills.join(' ')}`.toLowerCase();
  
  if (roleAndSkills.match(/\b(software|developer|programmer|coding|javascript|python|java)\b/)) {
    return 'software';
  }
  if (roleAndSkills.match(/\b(data|analyst|scientist|analytics|machine learning|statistics)\b/)) {
    return 'data';
  }
  if (roleAndSkills.match(/\b(design|ui|ux|user|interface|graphic)\b/)) {
    return 'design';
  }
  return 'software'; // default domain
}

function determineDifficulty(experience, wrongAnswers) {
  if (wrongAnswers > 3) return 'entry';
  if (experience > 5) return 'senior';
  if (experience > 2) return 'intermediate';
  return 'entry';
}

function stepDownDifficulty(currentDifficulty) {
  const levels = ['senior', 'intermediate', 'entry'];
  const currentIndex = levels.indexOf(currentDifficulty);
  return levels[Math.min(currentIndex + 1, levels.length - 1)];
}

function getAlternativeQuestion(currentDomain, currentDifficulty, wrongAnswers) {
  // If too many wrong answers, step down difficulty
  if (wrongAnswers > 2) {
    currentDifficulty = stepDownDifficulty(currentDifficulty);
  }

  // If at entry level and still struggling, try a different domain
  if (currentDifficulty === 'entry' && wrongAnswers > 3) {
    const alternativeDomains = Object.keys(questions).filter(d => d !== currentDomain);
    currentDomain = alternativeDomains[Math.floor(Math.random() * alternativeDomains.length)];
  }

  const availableQuestions = questions[currentDomain][currentDifficulty];
  const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

  return NextResponse.json({
    question: question.text,
    context: { 
      domain: currentDomain, 
      difficulty: currentDifficulty,
      isAlternative: true 
    }
  });
} 