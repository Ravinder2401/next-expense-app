export function getDateRange(type: 'today' | 'week' | 'month' | '3months') {
  const now = new Date();
  const end = new Date(now);
  let start = new Date(now);

  if (type === 'today') {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  } else if (type === 'week') {
    start.setDate(start.getDate() - 6);
  } else if (type === 'month') {
    start.setMonth(start.getMonth() - 1);
  } else if (type === '3months') {
    start.setMonth(start.getMonth() - 3);
  }

  return { start, end };
}

// utils/dateUtils.ts
export function getDateRangeFromDays(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days + 1);
  return { start, end };
}

