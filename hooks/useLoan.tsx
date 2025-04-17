import { addLoanPayment, getLoanById } from '@/services/loans';
import { CreatePaymentFields, DataContextType } from '@/types';
import { useContext, useEffect } from 'react';
import DataContext from '@/contexts/dataContext';

export default function useLoan(id: string, options = { allowRefetch: true }) {
  const { selectedLoan: state, setSelectedLoan: setState } = useContext(
    DataContext
  ) as DataContextType;

  useEffect(() => {
    const getLoan = async () => {
      try {
        const result = await getLoanById(id);
        setState({
          data: result,
          isLoading: false,
          error: undefined,
        });
      } catch (error: unknown) {
        setState({
          data: null,
          isLoading: false,
          error: 'Something went wrong retrieving information of loan.',
        });
      }
    };

    if (options.allowRefetch) getLoan();

    return () => {
      if (options.allowRefetch) {
        setState({ data: null, isLoading: true, error: undefined });
      }
    };
  }, [id]);

  const addPayment = async (payment: CreatePaymentFields) => {
    try {
      const addedPayment = await addLoanPayment(id, payment);

      if (addedPayment) {
        setState((oldData) => {
          if (!oldData.data) return oldData;

          return {
            data: {
              ...oldData.data,
              payments: [addedPayment, ...oldData.data.payments],
            },
            error: undefined,
            isLoading: false,
          };
        });
      }

      return addedPayment;
    } catch (error) {
      setState((oldData) => ({
        data: oldData.data,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  };

  return { state, addPayment };
}
