// === STEP 9: /app/signup/page.tsx ===
import { getCurrentUser } from '../lib/auth';
import { redirect } from 'next/navigation';
import AuthForm from '../components/AuthForm';

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return <AuthForm type="signup" />;
}