'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Record } from '@/types/Record';

async function getRecords(): Promise<{
  records?: Record[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const records = await db.record.findMany({
      where: { userId },
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
