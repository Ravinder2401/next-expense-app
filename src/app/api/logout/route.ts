import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete('user'); // This will remove the 'user' cookie
  const response = NextResponse.redirect(new URL('/login', 'http://localhost:3000'));

  // Clear token cookie
  response.cookies.set('token', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
