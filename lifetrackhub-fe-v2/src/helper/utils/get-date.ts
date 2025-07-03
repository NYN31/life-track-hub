import { formatISO, addDays } from 'date-fns';

export function getStrToDate(date: string | null) {
  return date ? new Date(date) : null;
}

export function getDateToString(date: Date | null, isEndDate = false) {
  if (!date) return '';

  const adjustedDate = isEndDate ? addDays(date, 1) : date;
  return formatISO(adjustedDate, { representation: 'date' });
}
