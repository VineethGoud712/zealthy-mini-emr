import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
}