import { getProfit, getTimeframe } from '@/utils/helperFunctions';
import { useZustandLoans } from './useLoanStore';
import { useEffect, useState } from 'react';

export default function useYearStatistics(year: number) {
  const { loans } = useZustandLoans();

  const [revenue, setRevenue] = useState<number[]>(Array(12).fill(0));
  const [loansCreated, setLoansCreated] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const fetchYearStatistics = async () => {
      if (!loans.data) return;

      const currentYear = new Date(year, 0, 1).getFullYear();

      const monthlyRevenue = Array(12).fill(0); // One entry for each month (Jan-Dec)
      const monthlyLoansCreated = Array(12).fill(0); // One entry for each month (Jan-Dec)

      loans.data.forEach((loan) => {
        const start = new Date(loan.startDate.toDate());
        const end = new Date(loan.endDate.toDate());

        const startYear = start.getFullYear();
        const endYear = end.getFullYear();

        const timeFrame = getTimeframe(loan.startDate, loan.endDate);
        const totalMonths = timeFrame.months;
        const monthlyProfit = getProfit(loan.total, loan.interest, totalMonths) / totalMonths;

        // Loop through each month of the loan duration
        let current = new Date(start);

        while (current <= end) {
          const year = current.getFullYear();
          const month = current.getMonth(); // 0 = January

          if (year === currentYear) {
            monthlyRevenue[month] += monthlyProfit;
          }

          // Move to next month
          current.setMonth(current.getMonth() + 1);
        }
      });

      console.log(monthlyRevenue); // Revenue distributed across months

      // const loansCreated = loans.data.filter((loan) => {
      //   const loanDate = new Date(loan.startDate.toDate());
      //   return loanDate.getFullYear() === currentYear;
      // }).length;

      loans.data.forEach((loan) => {
        const start = new Date(loan.startDate.toDate());

        if (start.getFullYear() === currentYear) {
          const month = start.getMonth(); // 0 = January
          monthlyLoansCreated[month] += 1;
        }
      });

      setRevenue(monthlyRevenue);
      setLoansCreated(monthlyLoansCreated);
    };

    fetchYearStatistics();
  }, [loans.data, year]);

  return {
    revenue,
    loansCreated,
  };
}
