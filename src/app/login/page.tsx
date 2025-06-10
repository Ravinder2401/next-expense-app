'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) router.push('/dashboard'); // 👈 Redirect if already logged in
  }, [user, loading]);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) router.push('/dashboard');
    else setError('Invalid credentials.');
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (user) return null; // prevent flicker

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
}
