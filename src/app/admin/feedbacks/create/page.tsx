'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createFeedbackRecord } from '@/actions/feedbacks';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CreateFeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const content = formData.get('content') as string;
    const files = formData.getAll('files') as File[];
    
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
        
        if (!res.ok) throw new Error('File upload failed');
        
        const data = await res.json();
        mediaUrls = data.urls;
      } catch (err) {
        console.error(err);
        setError('Failed to upload files. Please try again.');
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
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Add New Feedback</h1>
        <p className="text-gray-500 mt-2">Publish a testimonial or review manually to the website.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        <form className="p-8 md:p-10 space-y-8" onSubmit={handleSubmit} onDragEnter={handleDrag}>
          
          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Customer Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-semibold text-gray-700">
                Feedback Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={5}
                required
                placeholder="What did they say about the trip?"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Media Attachments
              </label>
              <div 
                className={cn(
                  "relative group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl transition-all duration-200 ease-in-out bg-gray-50",
                  dragActive 
                    ? "border-indigo-500 bg-indigo-50/50" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                  const files = e.dataTransfer.files;
                  const fileInput = document.getElementById('files') as HTMLInputElement;
                  if (fileInput) {
                    fileInput.files = files;
                  }
                }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                  <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300 text-indigo-500">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    <span className="text-indigo-600 font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or MP4 (max. 800x400px)</p>
                </div>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className={cn(
                "w-full h-12 rounded-xl text-base font-semibold shadow-sm transition-all duration-300",
                loading ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 text-white"
              )}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  Publishing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Publish Feedback
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
