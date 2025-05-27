import { createContext, ReactNode, useState } from 'react';
import { DataContextType, FetchState, Loan } from '@/types';

const DataContext = createContext<DataContextType | null>(null);

export function DataContextProvider({ children }: { children: Readonly<ReactNode> }) {
  const [loansDataState, setLoansDataState] = useState<FetchState<Loan[]>>({
    data: [],
    isLoading: true,
    error: undefined,
  });

  const [selectedLoanState, setSelectedLoanState] = useState<FetchState<Loan>>({
    data: null,
    isLoading: true,
    error: undefined,
  });

  // const [clients, setClients] = useState([]);

  return (
    <DataContext.Provider
      value={{
        loans: loansDataState,
        setLoans: setLoansDataState,
        selectedLoan: selectedLoanState,
        setSelectedLoan: setSelectedLoanState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
