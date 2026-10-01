import React, { useState } from 'react';
import { ChevronRight, X, ExternalLink, BookOpen } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsCarouselProps {
  articles: NewsArticle[];
}

export const NewsCarousel: React.FC<NewsCarouselProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          Latest News Carousel
        </h3>
        <span className="text-[10px] text-emerald-600 font-semibold cursor-pointer hover:underline">
          View all
        </span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {articles.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedArticle(item)}
            className="flex-shrink-0 w-44 bg-white rounded-2xl p-2.5 border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group flex items-center justify-between gap-2"
          >
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block truncate">
                {item.category}
              </span>
              <p className="text-xs font-bold text-slate-800 line-clamp-2 mt-0.5 leading-snug group-hover:text-emerald-700 transition-colors">
                {item.title}
              </p>
            </div>

            {/* Picturesque mountain thumbnail */}
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
              <img
                src="/src/assets/images/namche_bazaar_mountain_1790863299271.jpg"
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100">
            <div className="relative h-36 bg-slate-900">
              <img
                src="/src/assets/images/namche_bazaar_mountain_1790863299271.jpg"
                alt={selectedArticle.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/80 text-white px-2 py-0.5 rounded-full">
                  {selectedArticle.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 leading-snug line-clamp-2">
                  {selectedArticle.title}
                </h4>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-100 pb-2">
                <span>{selectedArticle.source}</span>
                <span>{selectedArticle.date} · {selectedArticle.readTime}</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {selectedArticle.content}
              </p>

              <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 text-xs text-emerald-900">
                <p className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
                  <BookOpen className="w-3.5 h-3.5" /> High Altitude Advisory
                </p>
                Stay attuned to changing mountain conditions. At high elevations, weather shifts within 20 minutes.
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
