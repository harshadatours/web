'use server';

import { revalidatePath } from 'next/cache';
import { deleteFeedback as deleteFeedbackData, saveFeedback, Feedback } from '@/lib/feedbacks';
import { nanoid } from 'nanoid';

export async function removeFeedback(id: string) {
  await deleteFeedbackData(id);
  revalidatePath('/admin');
  revalidatePath('/feedbacks');
}

export async function createFeedbackRecord(name: string, content: string, mediaUrls: string[]) {
  const newFeedback: Feedback = {
    id: nanoid(),
    name,
    content,
    createdAt: new Date().toISOString(),
    mediaUrls,
  };
  
  await saveFeedback(newFeedback);
  revalidatePath('/admin');
  revalidatePath('/feedbacks');
}
