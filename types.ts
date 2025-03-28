export type Status = 'active' | 'completed';

export interface Loan {
    id: string
    title: string
    description: string
    total: number
    months: number
    interest: number
    status: Status
    payments: Payment[]
}

export interface Payment {
    id: string
    amount: number
    status: Status
}