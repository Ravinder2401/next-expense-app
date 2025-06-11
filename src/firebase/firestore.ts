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
  doc,
  getDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

type Expense = {
  id: string;
  amount: number;
  category: string;
  note: string;
  createdAt: any;
};

export async function getUserExpenses(email: string) {
  const expensesRef = collection(db, 'expenses');
  const q = query(
    expensesRef,
    where('email', '==', email),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Expense));
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

export async function deleteExpenseById(id: string) {
  const ref = doc(db, 'expenses', id);
  await deleteDoc(ref);
}

export async function updateExpenseById(id: string, data: any) {
  const ref = doc(db, 'expenses', id);
  await updateDoc(ref, data);
  const updatedSnap = await getDoc(ref);
  return { id, ...updatedSnap.data() } as any;
}