'use client';

import { useEffect, useState } from 'react';
import { getDateRange } from '../utils/dateUtils';
import { fetchExpensesByFilter, deleteExpenseById } from '@/firebase/firestore';
import CategoryDropdown from './CategoryDropdown';
import formatDate from '../utils/formatDate';
import ExpenseForm from './ExpenseForm';
import { useRouter } from 'next/navigation';

interface Props {
  email: string;
  initialExpenses: any[];
}

const TagIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 12v6a2 2 0 0 1-2 2h-6l-8-8 6-6 8 8z" />
    <circle cx="18" cy="6" r="2" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EditIcon = () => (
  <svg
    className="w-5 h-5 text-blue-600 hover:text-blue-800"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-5 h-5 text-red-600 hover:text-red-800"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-2 14H7L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const MoneyNotesIcon = () => (
  <svg
    className="w-6 h-6 inline-block mr-2 text-green-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 7v-4" />
    <path d="M12 21v-4" />
  </svg>
);

export default function FilteredExpenses({ email, initialExpenses }: Props) {
  const [expenses, setExpenses] = useState(initialExpenses || []);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | '3months'>('week');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const loadFilteredExpenses = async () => {
    setLoading(true);
    const { start, end } = getDateRange(dateRange);
    const data = await fetchExpensesByFilter(email, category || undefined, start, end);
    const normalized = data.map((exp: any) => ({
      ...exp,
      createdAt: exp.createdAt?.toDate?.() ?? null,
    }));
    setExpenses(normalized);
    setHasLoaded(true);
    setLoading(false);
  };

  useEffect(() => {
    loadFilteredExpenses();
  }, [category, dateRange]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpenseById(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
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
 <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          {/* Loading Spinner */}
      {!hasLoaded && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 text-sm">Loading expenses...</span>
        </div>
      )}

      <div className="bg-white border rounded-lg shadow p-4 mb-6 flex flex-col gap-4">

  {/* Total Expenses (Full Width) */}
  {hasLoaded && expenses.length > 0 && (
    <div className="text-sm font-semibold text-green-700 bg-green-50 border border-green-300 px-4 py-2 rounded flex items-center">
      <MoneyNotesIcon />
      Total Expenses: ₹{expenses.reduce((sum, e) => sum + e.amount, 0)}
    </div>
  )}

  {/* Filters Row (Responsive) */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
    {/* Category Dropdown */}
    <div className="w-full sm:w-1/2">
      <CategoryDropdown value={category} onChange={setCategory} />
    </div>

    {/* Date Range Selector */}
    <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value as any)}
        className="w-full border border-gray-300 text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="today">Today</option>
        <option value="week">Last 7 Days</option>
        <option value="month">Last 30 Days</option>
        <option value="3months">Last 3 Months</option>
      </select>
    </div>
  </div>
</div>


      {/* Expense List */}
      {!hasLoaded ? (
        <p className="text-gray-500 text-sm"></p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-500 text-sm">No expenses found.</p>
      ) : (
        <>
        {/* Filters + Total Expenses */}
        <ul className="divide-y divide-gray-200 border rounded-lg bg-white shadow">
          {expenses.map((exp) => (
            <li
              key={exp.id}
              className="p-4 flex flex-col sm:flex-row justify-between gap-3 sm:gap-6 items-start sm:items-center hover:bg-gray-50 transition"
            >
              <div className="flex-1 w-full">
                <p className="text-base font-medium text-gray-900">
                  {exp.note || 'Unnamed Expense'}
                </p>
                <div className="flex flex-wrap text-sm text-gray-600 mt-1 gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1">
                    <TagIcon />
                    {exp.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon />
                    {exp.createdAt ? formatDate(exp.createdAt) : 'No date'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-green-600 font-semibold text-base whitespace-nowrap">
                  ₹{exp.amount}
                </span>
                <button onClick={() => handleEdit(exp)} title="Edit">
                  <EditIcon />
                </button>
                <button onClick={() => handleDelete(exp.id)} title="Delete">
                  <TrashIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
        </>
      )}

      {/* Edit Modal */}
      {showModal && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
            <ExpenseForm
              email={editing.email}
              existing={editing}
              onUpdated={handleUpdate}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

