import ExpenseForm from '@/app/components/ExpenseForm';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';


export default async function AddExpensePage() {
      const user = await getCurrentUser();
      if (!user) redirect('/login');

  return (
    <>
      {user.email && <ExpenseForm email={user.email} />}
    </>
  );
}
