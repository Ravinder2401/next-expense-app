// === STEP 8: /app/login/page.tsx ===
import { getCurrentUser } from '../lib/auth';
import { redirect } from 'next/navigation';
import AuthForm from '../components/AuthForm';

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return <AuthForm type="login" />;
}