
import ExpenseList from '@/app/components/ExpenseList';
import { getCurrentUser } from '@/app/lib/auth';
import { getUserExpenses } from '@/firebase/firestore';
import { redirect } from 'next/navigation';

export default async function ViewExpensesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const expenses = await getUserExpenses(user.email);
  const serializedExpenses = expenses.map((exp) => ({
    ...exp,
    createdAt: exp.createdAt?.toDate?.().toISOString() ?? null,
  }));

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Your Expenses</h1>
      <ExpenseList expenses={serializedExpenses} />
    </>
  );
}
