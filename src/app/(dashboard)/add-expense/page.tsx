import ExpenseForm from '@/app/components/ExpenseForm';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';


export default async function AddExpensePage() {
      const user = await getCurrentUser();
      if (!user) redirect('/login');

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Add New Expense</h1>
      {user.email && <ExpenseForm email={user.email} />}
    </>
  );
}
