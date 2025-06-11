'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 Get current path
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
    if (token && userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = async () => {
    // Clear localStorage first
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    // Call server-side API to clear cookie
    const res = await fetch('/api/logout', { method: 'GET' });

    // Use router only after response
    if (res.ok || res.redirected) {
      router.push('/login');
    } else {
      alert('Logout failed. Try again.');
    }
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/add-expense', label: 'Add Expense' },
    { href: '/view-expenses', label: 'View Expenses' },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6 text-sm">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                isActive ? 'font-bold text-blue-300 underline' : ''
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {email && <span className="text-xs">👤 {email}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
