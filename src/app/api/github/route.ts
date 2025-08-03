// src/app/api/github/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { title, body, labels } = await request.json();

  if (!process.env.GITHUB_API_TOKEN) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
  }

  const response = await fetch('https://api.github.com/repos/maddox-southard/invest-vs-debt/issues', {
    method: 'POST',
    headers: {
      'Authorization': `token ${process.env.GITHUB_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({ title, body, labels }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ error: 'Failed to create GitHub issue', details: errorData }, { status: response.status });
  }

  const issue = await response.json();
  return NextResponse.json(issue, { status: 201 });
}