// === STEP 3: /lib/auth.ts ===
import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const user = cookieStore.get('user');
  if (!user) return null;
  try {
    return JSON.parse(user.value);
  } catch {
    return null;
  }
}