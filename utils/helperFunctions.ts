import type { Timestamp } from 'firebase/firestore';

export function timestampToDate(date: Timestamp) {
  return new Date(date.toDate()).toLocaleString([], { dateStyle: 'medium' });
}

export function getTimeframe(start: Timestamp, end: Timestamp) {
  const MILLISECONDS_DAY = 1000 * 60 * 60 * 24;

  const timeFrameMiliseconds = end.toMillis() - start.toMillis();
  const days = timeFrameMiliseconds / MILLISECONDS_DAY;
  const weeks = days / 7;
  const fortnights = days / 14;
  const months = days / 30.44;
  const years = days / 365.25;

  return { days, weeks, fortnights, months, years };
}

export function getProfit(amount: number, interest: number, timeframe: number) {
  const timeframeMonths = timeframe < 1 ? 1 : Math.round(timeframe);
  return amount * (interest / 100) * timeframeMonths;
}

export function getSuggestedFee(amount: number, timeframe: number) {
  if (timeframe < 1) return amount;
  return amount / Math.round(timeframe);
}
