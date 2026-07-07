'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createFeedbackRecord } from '@/actions/feedbacks';

export function CreateFeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const content = formData.get('content') as string;
    const files = formData.getAll('files') as File[];
    
    // Filter out empty files if user didn't select any
    const validFiles = files.filter(file => file.size > 0);
    let mediaUrls: string[] = [];

    if (validFiles.length > 0) {
      const uploadData = new FormData();
      validFiles.forEach(f => uploadData.append('files', f));
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        
        if (!res.ok) {
          throw new Error('File upload failed');
        }
        
        const data = await res.json();
        mediaUrls = data.urls;
      } catch (err) {
        console.error(err);
        setError('Failed to upload files.');
        setLoading(false);
        return;
      }
    }

    try {
      await createFeedbackRecord(name, content, mediaUrls);
      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError('Failed to save feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      
      {success && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
          Thank you! Your feedback has been submitted successfully and is now live.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="e.g. John Doe"
          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Your Experience
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          required
          placeholder="Tell us about your trip..."
          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">
          Photos / Videos (Optional)
        </label>
        <input
          id="files"
          name="files"
          type="file"
          multiple
          accept="image/*,video/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 transition-colors"
        />
      </div>

      <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
}
