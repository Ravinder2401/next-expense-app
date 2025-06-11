'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  type: 'login' | 'signup';
}

export default function AuthForm({ type }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const res = await fetch(`/api/${type}`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      document.cookie = `user=${JSON.stringify(user)}; path=/`;
      router.push('/dashboard');
    } else {
      const err = await res.text();
      setError(err || 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="absolute top-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700">TrueSpend</h1>
        <p className="text-gray-600 mt-1 text-lg italic">
        Track every rupee. Master your money.
        </p>
    </div>

    <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left image / illustration */}
        <div className="hidden md:block md:w-1/2 bg-blue-100">
          {/* <img
            src="https://source.unsplash.com/600x600/?finance,money"
            alt="Login illustration"
            className="object-cover h-full w-full"
          /> */}
          <Image src="/images/expense-logo.png" alt="Expense Image" width={500} height={300} />
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
            {type === 'login' ? 'Login to your account' : 'Create an account'}
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
            >
              {loading ? 'Please wait...' : type === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </div>

          {/* Switch between login/signup */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            {type === 'login' ? (
              <>
                Didn&apos;t register yet?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already registered?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
