import { getProfit, getTimeframe } from '@/utils/helperFunctions';
import { useEffect, useState } from 'react';
import useLoans from './useLoans';
import { useZustandLoans } from './useLoanStore';

export default function useGeneralResume() {
  const { loans } = useZustandLoans();

  const [totalInvested, setTotalInvested] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const paidPercent = (totalPaid / (totalInvested + totalProfit)) * 100 || 0;

  useEffect(() => {
    const fetchGeneralResume = async () => {
      if (!loans.data) return;

      const totalInvested = loans.data.reduce((acc, loan) => acc + loan.total, 0);

      const totalPaid = loans.data.reduce((acc, loan) => {
        const paid = loan.payments.reduce((acc, payment) => acc + payment.amount, 0);
        return acc + paid;
      }, 0);

      const totalPending = loans.data.reduce((acc, loan) => {
        const paid = loan.payments.reduce((acc, payment) => acc + payment.amount, 0);
        const timeFrame = getTimeframe(loan.startDate, loan.endDate);
        const profit = getProfit(loan.total, loan.interest, timeFrame.months);
        return acc + (loan.total + profit - paid);
      }, 0);

      const totalProfit = loans.data.reduce((acc, loan) => {
        const timeFrame = getTimeframe(loan.startDate, loan.endDate);
        return acc + getProfit(loan.total, loan.interest, timeFrame.months);
      }, 0);

      setTotalInvested(totalInvested);
      setTotalPaid(totalPaid);
      setTotalPending(totalPending);
      setTotalProfit(totalProfit);
    };

    fetchGeneralResume();
  }, [loans.data]);

  return {
    totalInvested,
    totalPaid,
    totalPending,
    totalProfit,
    paidPercent,
  };
}
