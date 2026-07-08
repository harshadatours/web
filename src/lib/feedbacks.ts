import { supabase } from './supabase';

export interface Feedback {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  mediaUrls: string[]; // URLs to photos or videos
}

export async function getFeedbacks(): Promise<Feedback[]> {
  try {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map(item => ({
      ...item,
      mediaUrls: item.media_urls,
      createdAt: item.created_at
    })) as Feedback[];
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return [];
  }
}

export async function saveFeedback(feedback: Feedback): Promise<void> {
  try {
    const { id, name, content, mediaUrls, createdAt } = feedback;
    
    const { error } = await supabase.from('feedbacks').insert([{
      id,
      name,
      content,
      media_urls: mediaUrls,
      created_at: createdAt
    }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw new Error('Failed to save feedback');
  }
}

export async function deleteFeedback(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw new Error('Failed to delete feedback');
  }
}

