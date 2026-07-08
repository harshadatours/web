'use client';

import { useState, useRef, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UploadCloud, X, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExistingImage {
  url: string;
  isNew: false;
}
interface NewImage {
  preview: string;
  file: File;
  isNew: true;
}
type ImageEntry = ExistingImage | NewImage;

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/admin/services/${id}`)
      .then(r => r.json())
      .then(data => {
        setName(data.name || '');
        setDescription(data.description || '');
        setImages((data.images || []).map((url: string) => ({ url, isNew: false })));
        setFetching(false);
      })
      .catch(() => {
        setError('Failed to load service.');
        setFetching(false);
      });
  }, [id]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newEntries: NewImage[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(file => ({ preview: URL.createObjectURL(file), file, isNew: true }));
    setImages(prev => [...prev, ...newEntries]);
  };

  const removeImage = (idx: number) => {
    setImages(prev => {
      const copy = [...prev];
      const entry = copy[idx];
      if (entry.isNew) URL.revokeObjectURL(entry.preview);
      copy.splice(idx, 1);
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Upload new images
    const newImages = images.filter((img): img is NewImage => img.isNew);
    let newUrls: string[] = [];
    if (newImages.length > 0) {
      const uploadData = new FormData();
      newImages.forEach(img => uploadData.append('files', img.file));
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        newUrls = data.urls;
      } catch {
        setError('Failed to upload new images.');
        setLoading(false);
        return;
      }
    }

    // Combine existing + new urls in order
    let newIdx = 0;
    const finalUrls = images.map(img => {
      if (!img.isNew) return img.url;
      return newUrls[newIdx++];
    });

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, description, images: finalUrls }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Save failed');
      router.push('/admin/services');
      router.refresh();
    } catch {
      setError('Failed to save. Please try again.');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Edit Service</h1>
        <p className="text-gray-500 mt-2">Update the name, description, or photos for this service.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">Service / Route Name *</label>
              <input
                id="name" type="text" required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Pune to Mumbai Cab"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                id="description" rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Brief description of this service..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Photos</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); addFiles(e.dataTransfer.files); }}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200',
                  dragActive ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                )}
              >
                <UploadCloud className="w-5 h-5 text-indigo-500 mb-1" />
                <p className="text-sm text-gray-600"><span className="text-indigo-600 font-semibold">Click</span> or drag to add more photos</p>
                <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => addFiles(e.target.files)} />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.isNew ? img.preview : img.url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      {idx === 0 && (
                        <div className="absolute bottom-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white px-1.5 py-0.5 rounded">
                          Cover
                        </div>
                      )}
                      {img.isNew && (
                        <div className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-1.5 py-0.5 rounded">
                          New
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 flex flex-col items-center justify-center text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-xs mt-1">Add more</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full h-12 rounded-xl text-base font-semibold transition-all duration-300',
              loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            )}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" />Save Changes</div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
