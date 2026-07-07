import { getFeedbacks } from '@/lib/feedbacks';
import { removeFeedback } from '@/actions/feedbacks';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2, MessageSquarePlus, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your customer feedbacks and testimonials.</p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm gap-2">
          <Link href="/admin/feedbacks/create">
            <MessageSquarePlus className="w-4 h-4" />
            Add Feedback
          </Link>
        </Button>
      </div>

      {feedbacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/50 border border-dashed border-gray-300 rounded-3xl">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <MessageSquarePlus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No feedbacks yet</h3>
          <p className="text-gray-500 text-center max-w-sm mb-6">
            Get started by adding your first customer feedback to display on your website.
          </p>
          <Button asChild variant="outline" className="rounded-xl border-gray-200 text-gray-700">
            <Link href="/admin/feedbacks/create">Create Feedback</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((f) => (
            <div key={f.id} className="group flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300 overflow-hidden relative">
              {f.mediaUrls.length > 0 ? (
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  {f.mediaUrls[0].match(/\.(mp4|webm|ogg)$/i) ? (
                    <video 
                      src={f.mediaUrls[0]} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={f.mediaUrls[0]}
                      alt="Thumbnail"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1.5">
                    <ImageIcon className="w-3 h-3" />
                    {f.mediaUrls.length} file{f.mediaUrls.length !== 1 && 's'}
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-100">
                  <span className="text-gray-400 font-medium">No Media Attached</span>
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-gray-900 truncate" title={f.name}>{f.name}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1 leading-relaxed">
                  "{f.content}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-xs font-medium text-gray-400">
                    {new Date(f.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </span>
                  <form action={async () => {
                    'use server';
                    await removeFeedback(f.id);
                  }}>
                    <button 
                      type="submit" 
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center"
                      title="Delete Feedback"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
