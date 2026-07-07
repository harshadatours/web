import fs from 'fs';
import path from 'path';

export interface Feedback {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  mediaUrls: string[]; // URLs to photos or videos
}

const dataFilePath = path.join(process.cwd(), 'data', 'feedbacks.json');

export async function getFeedbacks(): Promise<Feedback[]> {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data) as Feedback[];
  } catch (error) {
    console.error('Error reading feedbacks:', error);
    return [];
  }
}

export async function saveFeedback(feedback: Feedback): Promise<void> {
  try {
    const feedbacks = await getFeedbacks();
    feedbacks.unshift(feedback); // Add to the beginning
    fs.writeFileSync(dataFilePath, JSON.stringify(feedbacks, null, 2));
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw new Error('Failed to save feedback');
  }
}

export async function deleteFeedback(id: string): Promise<void> {
  try {
    const feedbacks = await getFeedbacks();
    const updated = feedbacks.filter((f) => f.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(updated, null, 2));
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw new Error('Failed to delete feedback');
  }
}
