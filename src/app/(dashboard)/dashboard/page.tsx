import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p className="text-gray-700">Welcome, {user.email}! You’ll see your summary here soon.</p>
    </>
  );
}
