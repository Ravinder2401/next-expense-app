// components/DashboardSummary.tsx
interface SummaryProps {
  total: number;
  count: number;
  categories: Record<string, number>;
}

export default function DashboardSummary({ total, count, categories }: SummaryProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h3 className="text-sm text-blue-700">Total Expenses</h3>
        <p className="text-2xl font-bold text-blue-900">₹{total}</p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded p-4">
        <h3 className="text-sm text-green-700">Total Records</h3>
        <p className="text-2xl font-bold text-green-900">{count}</p>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
        <h3 className="text-sm text-yellow-700">Top Category</h3>
        <p className="text-lg font-semibold text-yellow-900">
          {Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
        </p>
      </div>
    </div>
  );
}
