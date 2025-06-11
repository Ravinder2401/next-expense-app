'use client';

import { useEffect, useState } from 'react';
import { addExpense, updateExpenseById } from '@/firebase/firestore';
import CategoryDropdown from './CategoryDropdown';

interface Props {
  email: string;
  onUpdated?: (updated: any) => void;
  existing?: any;
  onCancel?: () => void;
}

export default function ExpenseForm({ email, onUpdated, existing, onCancel }: Props) {
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existing) {
     setAmount(existing.amount.toString());
     setCategory(existing.category);
     setNote(existing.note);
    }
  }, [existing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const expenseData = {
      note,
      amount: parseFloat(amount),
      category,
      email,
    };

    try {
      if (existing) {
        const updated = await updateExpenseById(existing.id, expenseData);
        onUpdated?.(updated);
      } else {
        await addExpense(expenseData?.email, expenseData?.amount, expenseData?.category, expenseData?.note);
      }

      if (!existing) {
        setNote('');
        setAmount('');
        setCategory('');
      }
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
      />

    <CategoryDropdown value={category} onChange={setCategory} />

    <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
        className="w-full border p-2 rounded"
        required
      />

      <div className="flex justify-between gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : existing ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}
