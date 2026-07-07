import { getFeedbacks } from '@/lib/feedbacks';
import { CreateFeedbackForm } from './create-feedback-form';
import Image from 'next/image';

export default async function FeedbacksPage() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Customer Feedbacks
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See what our happy travelers have to say about their experiences with Harshada Tours & Travels. Share your own journey with us!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {feedbacks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">No feedbacks yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbacks.map((f) => (
                <div key={f.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {f.mediaUrls.length > 0 && (
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      {f.mediaUrls[0].match(/\.(mp4|webm|ogg)$/i) ? (
                        <video 
                          src={f.mediaUrls[0]} 
                          controls 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          src={f.mediaUrls[0]}
                          alt={`Media for feedback from ${f.name}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-gray-700 italic mb-4">"{f.content}"</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{f.name}</span>
                      <span className="text-xs text-gray-500">{new Date(f.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h2>
            <CreateFeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}
