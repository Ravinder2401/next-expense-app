import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';


// Add expense in firebase
export const addExpense = async (
  email: string,
  amount: number,
  category: string,
  note: string
) => {
  const ref = collection(db, 'expenses');
  return await addDoc(ref, {
    email,
    amount,
    category,
    note,
    createdAt: Timestamp.now(),
  });
};

// Get all expenses of user
export const getUserExpenses = async (email: string) => {
  const ref = collection(db, 'expenses');
  const q = query(ref, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
