import { addDoc, collection, doc, getDoc, getDocs, Timestamp } from "firebase/firestore";
import { CreateLoanFields, CreatePaymentFields, Loan, Payment } from "@/types";
import { db } from "@/utils/firebaseConfig";

export async function addNewLoan(loan: CreateLoanFields) {
    if (!loan.title || !loan.description || !loan.total || !loan.interest) return;

    try {
        const newLoan: Omit<Loan, 'id'> = {
            ...loan,
            status: "active",
            startDate: Timestamp.fromDate(new Date()),
            endDate: Timestamp.fromDate(loan.endDate),
            payments: []
        }

        const docRef = await addDoc(collection(db, 'loans'), newLoan);
        const docData = await getDoc(docRef);
        if (!docData.exists()) return null;

        return { id: docData.id, ...docData.data() } as Loan;
    } catch (error) {
        throw new Error('Error creating loan: ' + error)
    }
};

export async function getLoans(): Promise<Loan[]> {
    try {
        const result = await getDocs(collection(db, 'loans'));
        return result.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Loan));
    } catch (error) {
        throw new Error('Error getting loans: ' + error);
    }
}

export async function getLoanById(id: string): Promise<Loan | null> {
    try {
        const result = await getDoc(doc(db, 'loans', id));
        if (!result.exists()) return null;

        const paymentsResult = await getDocs(collection(db, 'loans', id, 'payments'));
        const payments = paymentsResult.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Payment)

        return { id: result.id, ...result.data(), payments } as Loan;
    } catch (error) {
        throw new Error('Error getting loan: ' + error);
    }
}

export async function addLoanPayment(loanId: string, payment: CreatePaymentFields) {
    if (!payment.title || !payment.amount) return;

    try {
        const newPayment: Omit<Payment, 'id'> = {
            ...payment,
            date: Timestamp.fromDate(new Date())
        };

        return await addDoc(collection(db, 'loans', loanId, 'payments'), newPayment);
    } catch (error) {
        throw new Error('Error creating payment: ' + error)
    }
}
