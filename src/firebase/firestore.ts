// === STEP 2: /firebase/firestore.ts ===
import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from 'firebase/firestore';

export async function getUserExpenses(email: string) {
  const expensesRef = collection(db, 'expenses');
  const q = query(
    expensesRef,
    where('email', '==', email),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addExpense(email: string, amount: number, category: string, note?: string) {
  const expensesRef = collection(db, 'expenses');
  await addDoc(expensesRef, {
    email,
    amount,
    category,
    note: note || '',
    createdAt: Timestamp.now(),
  });
}