// === STEP 5: /components/ExpenseForm.tsx ===
'use client';

import { useState } from 'react';
import { addExpense } from '@/firebase/firestore'; 

interface Props {
  email: string;
  onAdded: () => void;
}

export default function ExpenseForm({ email, onAdded }: Props) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    setError('');
    if (!amount || !category) {
      setError('Amount and category are required');
      return;
    }

    setLoading(true);
    await addExpense(email, parseFloat(amount), category, note);
    setAmount('');
    setCategory('');
    setNote('');
    setLoading(false);
    // 👇 Notify parent to refresh
    if (onAdded) onAdded();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
      <h2 className="font-semibold text-lg">Add Expense</h2>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Amount"
        type="number"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Category"
      />
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Note (optional)"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </div>
  );
}