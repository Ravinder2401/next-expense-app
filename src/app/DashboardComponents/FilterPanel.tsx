'use client';

interface Props {
  category: string;
  setCategory: (val: string) => void;
  range: string;
  setRange: (val: string) => void;
}

export default function FilterPanel({ category, setCategory, range, setRange }: Props) {
  return (
    <div className="bg-white rounded shadow p-4 border mb-6 flex flex-col sm:flex-row gap-4">
      <select
        className="border rounded px-3 py-2 text-sm w-full sm:w-1/2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {['Home', 'Personal', 'Emi', 'Sip/Investment', 'Office', 'Medical', 'Travel/Petrol'].map(
          (c) => (
            <option key={c} value={c}>
              {c}
            </option>
          )
        )}
      </select>
      <select
        className="border rounded px-3 py-2 text-sm w-full sm:w-1/2"
        value={range}
        onChange={(e) => setRange(e.target.value)}
      >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 3 Months</option>
      </select>
    </div>
  );
}
