// === STEP 6: /components/ExpenseList.tsx ===
interface Expense {
  id: string;
  amount: number;
  category: string;
  note?: string;
  createdAt: { seconds: number };
}

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (!expenses.length) return <p>No expenses found.</p>;

  return (
    <ul className="space-y-2">
      {expenses.map((exp) => (
        <li key={exp.id} className="p-3 border rounded bg-white shadow-sm">
          <div className="font-semibold">₹{exp.amount} - {exp.category}</div>
          {exp.note && <div className="text-sm text-gray-600">{exp.note}</div>}
          <div className="text-xs text-gray-500">
            {new Date(exp.createdAt.seconds * 1000).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}