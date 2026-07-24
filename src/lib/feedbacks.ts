import { supabase } from './supabase';
import { unstable_cache, revalidateTag } from 'next/cache';

export interface Feedback {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  mediaUrls: string[]; // URLs to photos or videos
}

async function fetchFeedbacksFromSupabase(): Promise<Feedback[]> {
  try {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    
    return data.map(item => ({
      ...item,
      mediaUrls: item.media_urls || [],
      createdAt: item.created_at
    })) as Feedback[];
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return [];
  }
}

export const getFeedbacks = unstable_cache(
  fetchFeedbacksFromSupabase,
  ['feedbacks-list-v1'],
  { revalidate: 60, tags: ['feedbacks'] }
);

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

    try {
      revalidateTag('feedbacks', 'max');
    } catch {}
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw new Error('Failed to save feedback');
  }
}

export async function deleteFeedback(id: string): Promise<void> {
  try {
    // Fetch the feedback first to get its media URLs
    const { data: feedback } = await supabase
      .from('feedbacks')
      .select('media_urls')
      .eq('id', id)
      .single();

    if (feedback && feedback.media_urls && feedback.media_urls.length > 0) {
      const pathsToRemove = feedback.media_urls.map((url: string) => {
        const parts = url.split('/uploads/');
        return parts.length > 1 ? parts[1] : null;
      }).filter(Boolean) as string[];
      
      if (pathsToRemove.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('uploads')
          .remove(pathsToRemove);
        if (storageError) console.error('Error deleting feedback images:', storageError);
      }
    }

    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .eq('id', id);

    if (error) throw error;

    try {
      revalidateTag('feedbacks', 'max');
    } catch {}
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw new Error('Failed to delete feedback');
  }
}

