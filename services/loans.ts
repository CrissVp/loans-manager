import { CreateLoanFields, CreatePaymentFields, Loan, Payment } from '@/types';
import { db } from '@/utils/firebaseConfig';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

export async function addNewLoan(loan: CreateLoanFields) {
  if (!loan.title || !loan.description || !loan.total || !loan.interest) return;

  try {
    const newLoan: Omit<Loan, 'id'> = {
      ...loan,
      status: 'active',
      startDate: Timestamp.fromDate(new Date()),
      endDate: Timestamp.fromDate(loan.endDate),
      payments: [],
    };

    const docRef = await addDoc(collection(db, 'loans'), newLoan);
    const docData = await getDoc(docRef);
    if (!docData.exists()) return null;

    return { id: docData.id, ...docData.data() } as Loan;
  } catch (error) {
    throw new Error('Error creating loan: ' + error);
  }
}

export async function getLoans(): Promise<Loan[]> {
  try {
    const result = await getDocs(query(collection(db, 'loans'), orderBy('startDate', 'desc')));
    return result.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Loan));
  } catch (error) {
    console.log({ error });
    throw new Error('There was an error retrieving loans.');
  }
}

export async function getLoanById(id: string): Promise<Loan | null> {
  try {
    const result = await getDoc(doc(db, 'loans', id));
    if (!result.exists()) return null;

    return { id: result.id, ...result.data() } as Loan;
  } catch (error) {
    throw new Error('Error getting loan: ' + error);
  }
}

export async function addLoanPayment(
  loanId: string,
  payment: CreatePaymentFields
): Promise<Loan | null> {
  if (!payment.title || !payment.amount || !payment.date) {
    throw new Error('There are required fields missing');
  }

  try {
    const docRef = doc(db, 'loans', loanId);
    const paymentId = doc(collection(db, '_')).id;

    await updateDoc(docRef, {
      payments: arrayUnion({
        ...payment,
        id: paymentId,
        date: Timestamp.fromDate(payment.date),
      }),
    });

    const docData = await getDoc(docRef);
    if (!docData.exists()) return null;

    return { id: docData.id, ...docData.data() } as Loan;
  } catch (error) {
    console.log({ error });
    throw new Error('Error creating payment');
  }
}
