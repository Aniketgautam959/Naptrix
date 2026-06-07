'use server';

import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateSleepGoal(goal: number) {
  const user = await checkUser();
  if (!user) return { error: 'User not found' };

  if (goal < 4 || goal > 12) {
    return { error: 'Goal must be between 4 and 12 hours' };
  }

  await db.user.update({
    where: { clerkUserId: user.clerkUserId },
    data: { sleepGoal: goal },
  });

  revalidatePath('/');
  return { success: true };
}
