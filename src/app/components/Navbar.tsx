'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
    if (token && userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    const res = await fetch('/api/logout', { method: 'GET' });
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
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between relative">
      {/* Logo or Brand */}
      <div className="text-lg font-semibold">Expense Tracker</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-sm">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${
                isActive ? 'font-bold text-blue-300 underline' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Desktop User Info + Logout */}
      <div className="hidden md:flex items-center gap-4">
        {email && <span className="text-xs select-none">👤 {email}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className={`h-6 w-6 transition-transform duration-300 ease-in-out ${
            menuOpen ? 'rotate-90' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            // X icon when open
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Hamburger icon when closed
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-900 overflow-hidden transition-[max-height,padding] duration-300 ease-in-out
          ${menuOpen ? 'max-h-60 py-4' : 'max-h-0 py-0'}`}
      >
        <div className="flex flex-col gap-4 px-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`block text-white hover:underline ${
                  isActive ? 'font-bold text-blue-300 underline' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <div className="border-t border-gray-700 pt-4 flex flex-col gap-2">
            {email && (
              <span className="text-xs select-none flex items-center gap-1">
                👤 {email}
              </span>
            )}
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs w-fit"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
