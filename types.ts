import type { Timestamp } from 'firebase/firestore'

export type Status = 'active' | 'completed';

export interface Loan {
    id: string
    title: string
    description: string
    total: number
    interest: number
    status: Status
    startDate: Timestamp
    endDate: Timestamp
    payments: Payment[]
}

export interface Payment {
    id: string
    amount: number
    title: string
    date: Timestamp
}

export interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | undefined
};

export interface DataContextType {
    loans: FetchState<Loan[]>,
    setLoans: React.Dispatch<React.SetStateAction<FetchState<Loan[]>>>
}

export type CreateLoanFields = Pick<Loan, 'title' | 'total' | 'interest' | 'description'> & { endDate: Date };
export type CreatePaymentFields = Pick<Payment, 'amount' | 'title'>;

export enum Period {
    Daily = 'days',
    Weekly = 'weeks',
    Fortnightly = 'fortnights',
    Monthly = 'months',
    Yearly = 'years'
}