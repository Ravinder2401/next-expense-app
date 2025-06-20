'use client';

import { useEffect, useState } from 'react';

import { fetchExpensesByFilter } from '@/firebase/firestore';
import { useAuth } from '@/app/context/AuthContext';
import { getDateRangeFromDays } from '@/app/utils/dateUtils';
import FilterPanel from '@/app/DashboardComponents/FilterPanel';
import DashboardSummary from '@/app/DashboardComponents/DashboardSummary';
import ExpenseBarChart from '@/app/DashboardComponents/ExpenseBarchart';
import CategoryPieChart from '@/app/DashboardComponents/CategoryPieChart';
import { useRouter } from 'next/navigation';

export default function DashboardPage({user}:any) {
  console.log('user---',user);
  
  const [category, setCategory] = useState('');
  const [range, setRange] = useState('30');
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    const { start, end } = getDateRangeFromDays(Number(range));
    const data = await fetchExpensesByFilter(user?.email, category || undefined, start, end);
    const normalized = data.map((e:any) => ({
      ...e,
      createdAt: e.createdAt?.toDate?.() ?? null,
    }));
    setExpenses(normalized);
    setLoading(false);
  };

useEffect(() => {
  if (user?.email) loadData();
}, [user?.email, category, range]);

  const categoryMap = expenses.reduce((acc: any, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // For pie chart
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));


  const chartData = expenses.map((exp) => ({
    date: exp.createdAt?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    }),
    amount: exp.amount,
  }));

  if(!user) return (
            <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 text-sm">Please wait...</span>
        </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.email}</h1>
      <FilterPanel category={category} setCategory={setCategory} range={range} setRange={setRange} />
      <DashboardSummary
        total={expenses.reduce((sum, e) => sum + e.amount, 0)}
        count={expenses.length}
        categories={categoryMap}
      />
      {!loading && (
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            <ExpenseBarChart data={chartData} />
          </div>
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            <CategoryPieChart data={categoryData} />
          </div>
        </div>
      )}
      {loading && (
        <div className="text-center text-sm text-gray-500 mt-6">Loading dashboard...</div>
      )}
    </div>
  );
}
