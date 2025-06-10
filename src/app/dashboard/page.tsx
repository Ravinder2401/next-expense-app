'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserExpenses, addExpense } from '@/firebase/firestore';

type Expense = {
  id: string;
  amount: number;
  category: string;
  note: string;
  createdAt: any;
};

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [fetching, setFetching] = useState(true);

  // 🚫 Prevent access if not logged in
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  // ✅ Fetch expenses once user is loaded
  useEffect(() => {
    if (user?.email) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    setFetching(true);
    const data = await getUserExpenses(user!.email!);
    setExpenses(data as Expense[]);
    setFetching(false);
  };

  const handleAdd = async () => {
    if (!amount || !category) return;
    await addExpense(user!.email!, parseFloat(amount), category, note);
    setAmount('');
    setCategory('');
    setNote('');
    fetchExpenses(); // refresh list
  };

  if (loading) return <div className="p-8">Loading auth...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          Logout
        </button>
      </div>

      {/* Add Expense */}
      <div className="bg-white p-4 rounded shadow mb-8 space-y-2">
        <h2 className="text-xl font-semibold">Add Expense</h2>
        <input
          className="border p-2 w-full"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* Expense List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
        {fetching ? (
          <p>Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="p-2 border-b flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    ₹{exp.amount} - {exp.category}
                  </p>
                  {exp.note && <p className="text-sm text-gray-600">{exp.note}</p>}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(exp.createdAt.seconds * 1000).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
