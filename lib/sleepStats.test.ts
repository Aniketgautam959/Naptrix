import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculateGoalProgress,
  calculateSleepDebt,
  calculateStreak,
} from './sleepStats';
import { Record } from '@/types/Record';

const base = {
  id: '1',
  text: 'Refreshed',
  userId: 'user-1',
  createdAt: new Date(),
};

function record(date: string, amount: number): Record {
  return { ...base, id: `${date}-${amount}`, date, amount };
}

describe('calculateStreak', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-07T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 when there are no records', () => {
    expect(calculateStreak([], 8)).toBe(0);
  });

  it('counts consecutive days that meet the goal', () => {
    const records = [
      record('2026-06-07', 8),
      record('2026-06-06', 7.5),
      record('2026-06-05', 8),
    ];
    expect(calculateStreak(records, 7)).toBe(3);
  });

  it('stops streak when a day falls below goal', () => {
    const records = [
      record('2026-06-07', 8),
      record('2026-06-06', 5),
      record('2026-06-05', 8),
    ];
    expect(calculateStreak(records, 7)).toBe(1);
  });

  it('counts from yesterday if today has no record yet', () => {
    const records = [record('2026-06-06', 8), record('2026-06-05', 8)];
    expect(calculateStreak(records, 7)).toBe(2);
  });
});

describe('calculateGoalProgress', () => {
  it('returns zeros for empty records', () => {
    expect(calculateGoalProgress([], 8)).toEqual({
      met: 0,
      total: 0,
      percentage: 0,
    });
  });

  it('calculates how often the goal was met', () => {
    const records = [
      record('2026-06-01', 8),
      record('2026-06-02', 6),
      record('2026-06-03', 7),
      record('2026-06-04', 9),
    ];
    expect(calculateGoalProgress(records, 7)).toEqual({
      met: 3,
      total: 4,
      percentage: 75,
    });
  });
});

describe('calculateSleepDebt', () => {
  it('returns 0 when there are no records', () => {
    expect(calculateSleepDebt([], 8)).toBe(0);
  });

  it('sums missing hours from the last 7 records', () => {
    const records = [
      record('2026-06-07', 6),
      record('2026-06-06', 8),
      record('2026-06-05', 5),
    ];
    // (8-6) + (8-8) + (8-5) = 2 + 0 + 3 = 5
    expect(calculateSleepDebt(records, 8)).toBe(5);
  });
});
