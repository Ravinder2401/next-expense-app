// === STEP 4: /components/AuthForm.tsx ===
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold text-center capitalize">{type}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Password"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? 'Please wait...' : type === 'login' ? 'Login' : 'Signup'}
      </button>
    </div>
  );
} 