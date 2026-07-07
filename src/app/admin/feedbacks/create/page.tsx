'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createFeedbackRecord } from '@/actions/feedbacks';

export default function CreateFeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
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
      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError('Failed to save feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Feedback</h1>
      </div>

      <div className="rounded-xl border bg-white shadow-sm p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 md:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Feedback Text
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                required
                className="mt-1 flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 md:text-sm"
              />
            </div>

            <div>
              <label htmlFor="files" className="block text-sm font-medium text-gray-700">
                Photos / Videos
              </label>
              <input
                id="files"
                name="files"
                type="file"
                multiple
                accept="image/*,video/*"
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <p className="mt-1 text-xs text-gray-500">You can select multiple files.</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Feedback'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
