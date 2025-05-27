import { CreatePaymentFields, FetchState, Loan } from '@/types';
import { addLoanPayment, getLoans } from '@/services/loans';
import { useEffect } from 'react';
import { create } from 'zustand';

interface LoanStore {
  loans: FetchState<Loan[]>;
  fetchLoans: () => Promise<void>;
  updateLoan: (id: string, updatedLoan: Loan) => Promise<void>;
}

const useLoanStore = create<LoanStore>((set, get) => ({
  // Loans Initial State
  loans: {
    data: [],
    isLoading: true,
    error: undefined,
  },
  // This function fetches the loans from the API and updates the state
  fetchLoans: async () => {
    try {
      const result = await getLoans();
      set({ loans: { data: result, isLoading: false, error: undefined } });
    } catch (error) {
      set({
        loans: {
          data: [],
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  },
  // This function updates a loan in the state
  updateLoan: async (id: string, updatedLoan: Loan) => {
    set((state) => {
      if (!state.loans.data) return state;

      return {
        loans: {
          ...state.loans,
          data: state.loans.data.map((loan) => (loan.id === id ? updatedLoan : loan)),
        },
      };
    });
  },
}));

export function useZustandLoans() {
  const loans = useLoanStore((state) => state.loans);
  const fetchLoans = useLoanStore((state) => state.fetchLoans);

  useEffect(() => {
    if (!loans.data?.length) {
      console.log('Fetching loans with zustand...');
      fetchLoans();
    }
  }, [fetchLoans, loans.data]);

  return { loans };
}

export function useZustandLoan(id: string) {
  const loan = useLoanStore((state) => state.loans.data?.find((loan) => loan.id === id));
  const updateLoan = useLoanStore((state) => state.updateLoan);

  const addPayment = async (payment: CreatePaymentFields) => {
    try {
      const updatedLoan = await addLoanPayment(id, payment);

      if (updatedLoan) {
        updateLoan(id, updatedLoan);
      }
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  return { loan, addPayment };
}
