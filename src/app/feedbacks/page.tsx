import { getFeedbacks } from '@/lib/feedbacks';
import { CreateFeedbackForm } from './create-feedback-form';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export default async function FeedbacksPage() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          Customer <span className="text-primary italic">Experiences</span>
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          See what our happy travelers have to say about their trips with Harshada Tours & Travels. Share your own journey with us!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {feedbacks.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl border border-white/10">
              <p className="text-white/50 text-xl font-medium">No feedbacks yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className="break-inside-avoid glass rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 border border-white/10 relative group"
                >
                  {f.mediaUrls.length > 0 && (
                    <div className="relative w-full bg-slate-900/50">
                      {f.mediaUrls[0].match(/\.(mp4|webm|ogg)$/i) ? (
                        <video 
                          src={f.mediaUrls[0]} 
                          controls 
                          className="w-full h-auto object-contain max-h-[500px]"
                        />
                      ) : (
                        <div className="relative w-full">
                          {/* We use standard img to allow natural height to dictate layout in masonry */}
                          <img
                            src={f.mediaUrls[0]}
                            alt={`Experience from ${f.name}`}
                            className="w-full h-auto object-cover max-h-[500px]"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    </div>
                  )}
                  
                  <div className={`p-8 relative ${f.mediaUrls.length > 0 ? '-mt-12 z-10' : ''}`}>
                    <Quote className="w-10 h-10 text-primary/40 mb-4 transform -scale-x-100" />
                    <p className="text-white/90 text-lg leading-relaxed italic mb-8 font-light">
                      "{f.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center font-bold text-white shadow-lg">
                        {f.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{f.name}</h3>
                        <span className="text-xs text-white/50 font-medium tracking-wider uppercase">
                          {new Date(f.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-4">
          <div className="sticky top-8 glass rounded-3xl shadow-2xl border border-white/10 p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] -mr-10 -mt-10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Share Your Story</h2>
              <p className="text-white/60 mb-8 text-sm">Help others by sharing your travel experience and photos.</p>
              <CreateFeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
