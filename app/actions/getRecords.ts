'use server';
import { db } from '@/lib/db';
import { checkUser } from '@/lib/checkUser';
import { Record } from '@/types/Record';

async function getRecords(): Promise<{
  records?: Record[];
  error?: string;
}> {
  try {
    const user = await checkUser();

    if (!user) {
      return { error: 'User not found' };
    }

    const records = await db.record.findMany({
      where: { userId: user.clerkUserId },
      orderBy: {
        date: 'desc',
      },
      take: 10,
    });

    // Convert dates to ISO strings for client-side serialization
    const serializedRecords = records.map(record => ({
      ...record,
      date: record.date.toISOString(),
      createdAt: record.createdAt.toISOString(),
    }));

    return { records: serializedRecords as unknown as Record[] };
  } catch (error) {
    console.error('Error fetching records:', error);
    return { error: 'Database error' };
  }
}

export default getRecords;
