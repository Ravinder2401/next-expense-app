'use client';
import { useEffect } from 'react';
import { auth } from '@/firebase/config';

export default function Home() {
  useEffect(() => {
    console.log('Firebase Auth instance:', auth);
  }, []);

  return <h1>Hello Firebase + Next.js!</h1>;
}
