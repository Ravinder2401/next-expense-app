
import ExpenseList from '@/app/components/ExpenseList';
import FilteredExpenses from '@/app/components/FilteredExpenses';
import { getCurrentUser } from '@/app/lib/auth';
import { getUserExpenses } from '@/firebase/firestore';
import { redirect } from 'next/navigation';

export default async function ViewExpensesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const expenses = await getUserExpenses(user.email);
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const serializedExpenses = expenses.map((exp) => ({
    ...exp,
    createdAt: exp.createdAt?.toDate?.() ?? null, // ✅ convert to Date
  }));  

  return (
    <>
      <FilteredExpenses email={user.email} initialExpenses={serializedExpenses} />
    </>
  );
}
