'use client';

import { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import { deleteExpenseById } from '@/firebase/firestore';
import formatDate from '../utils/formatDate';

interface Props {
  expenses: any[];
}

export default function ExpenseList({ expenses: initialExpenses }: Props) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [editing, setEditing] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpenseById(id);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const handleEdit = (exp: any) => {
    setEditing(exp);
    setShowModal(true);
  };

  const handleUpdate = (updatedExpense: any) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
    setShowModal(false);
    setEditing(null);
  };

  return (
    <>
      <ul className="space-y-3">
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="bg-white border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{exp.note}</p>
              <p className="text-sm text-gray-600">{exp.category}</p>
              <p className="text-sm text-gray-500">{formatDate(exp.createdAt)}</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-green-600 font-semibold">₹{exp.amount}</span>
              <button onClick={() => handleEdit(exp)} title="Edit">
                ✏️
              </button>
              <button onClick={() => handleDelete(exp.id)} title="Delete">
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for editing */}
      {showModal && editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Edit Expense</h2>
            <ExpenseForm
              email={editing.email}
              onUpdated={handleUpdate}
              existing={editing}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
