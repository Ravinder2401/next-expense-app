// components/ExpenseBarChart.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: { date: string; amount: number }[];
}

export default function ExpenseBarChart({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow border mt-3">
      <h2 className="text-lg font-bold mb-4">Expenses (Last 30 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
