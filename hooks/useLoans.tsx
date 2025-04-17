import { CreateLoanFields, DataContextType } from '@/types';
import { addNewLoan, getLoans } from '@/services/loans';
import { useContext, useEffect } from 'react';
import DataContext from '@/contexts/dataContext';

export default function useLoans(options = { allowRefetch: true }) {
  const { loans, setLoans } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    const getAllLoans = async () => {
      try {
        const result = await getLoans();

        setLoans({
          data: result,
          isLoading: false,
          error: undefined,
        });
      } catch (error: unknown) {
        setLoans({
          data: [],
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    if (options.allowRefetch) getAllLoans();
  }, []);

  const addLoan = async (loan: CreateLoanFields) => {
    try {
      const addedLoan = await addNewLoan(loan);

      if (addedLoan) {
        setLoans((oldData) => {
          const oldLoans = oldData.data || [];
          return {
            data: [addedLoan, ...oldLoans],
            isLoading: false,
            error: undefined,
          };
        });
      }

      return addedLoan;
    } catch (error) {
      setLoans((oldData) => ({
        data: oldData.data,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  return { loans, addLoan };
}
