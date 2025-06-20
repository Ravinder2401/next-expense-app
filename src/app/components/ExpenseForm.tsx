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

  // SVG Icons for buttons
  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 mr-2 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  const PlusIcon = () => (
    <svg
      className="h-5 w-5 mr-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );

  const EditIcon = () => (
    <svg
      className="h-5 w-5 mr-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5h6M4 12v7a2 2 0 002 2h8a2 2 0 002-2v-7"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.5 5.5a2.121 2.121 0 113 3L12 18l-4 1 1-4 9.5-9.5z"
      />
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
        min={0.01}
        step="0.01"
      />

      <CategoryDropdown value={category} onChange={setCategory} />

      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
        className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <div className="flex justify-between gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center px-6 py-2 text-white rounded-lg transition
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? (
            <>
              <Spinner />
              Saving...
            </>
          ) : existing ? (
            <>
              Update
            </>
          ) : (
            <>
              Add
            </>
          )}
        </button>
      </div>
    </form>
  );
}
