import { NextResponse } from 'next/server';

export async function GET() {
  // This would typically be calculated from database data
  const stats = {
    totalInterviews: 150,
    passRate: 68,
    averageScore: 9.2
  };

  return NextResponse.json(stats);
} 