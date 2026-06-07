import { Record } from '@/types/Record';

function toLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function calculateStreak(records: Record[], goalHours: number): number {
  if (records.length === 0) return 0;

  const byDate = new Map<string, number>();
  for (const record of records) {
    const key = toLocalDateKey(new Date(record.date));
    const existing = byDate.get(key);
    if (existing === undefined || record.amount > existing) {
      byDate.set(key, record.amount);
    }
  }

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  // Allow starting from today or yesterday (haven't logged today yet)
  const todayKey = toLocalDateKey(cursor);
  const yesterday = new Date(cursor);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toLocalDateKey(yesterday);

  if (!byDate.has(todayKey) && byDate.has(yesterdayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const key = toLocalDateKey(cursor);
    const hours = byDate.get(key);
    if (hours === undefined || hours < goalHours) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function calculateGoalProgress(records: Record[], goalHours: number) {
  if (records.length === 0) {
    return { met: 0, total: 0, percentage: 0 };
  }

  const met = records.filter((r) => r.amount >= goalHours).length;
  const total = records.length;
  return {
    met,
    total,
    percentage: Math.round((met / total) * 100),
  };
}

export function calculateSleepDebt(records: Record[], goalHours: number): number {
  if (records.length === 0) return 0;

  const last7 = [...records]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  const debt = last7.reduce((sum, r) => sum + Math.max(0, goalHours - r.amount), 0);
  return Math.round(debt * 10) / 10;
}
