'use client';

import { useEffect, useState } from 'react';
import { getUserExpenses } from '@/firebase/firestore';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';


type Expense = {
  id: string;
  amount: number;
  category: string;
  note: string;
  createdAt: any;
};

export default function DashboardClient({ email }: { email: string }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    const data = await getUserExpenses(email);
    setExpenses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {email}</h1>
      <ExpenseForm email={email} onAdded={fetchExpenses} />
      {loading ? <p>Loading...</p> : <ExpenseList expenses={expenses} />}
    </div>
  );
}
