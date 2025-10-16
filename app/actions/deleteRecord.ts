'use server';
import { db } from '@/lib/db';
import { checkUser } from '@/lib/checkUser';
import { revalidatePath } from 'next/cache';

async function deleteRecord(recordId: string): Promise<{
  message?: string;
  error?: string;
}> {
  const user = await checkUser();

  if (!user) {
    return { error: 'User not found' };
  }

  try {
    await db.record.delete({
      where: {
        id: recordId,
        userId: user.clerkUserId,
      },
    });

    revalidatePath('/');

    return { message: 'Record deleted' };
  } catch (error) {
    console.error('Error deleting record:', error); // Log the error
    return { error: 'Database error' };
  }
}

export default deleteRecord;