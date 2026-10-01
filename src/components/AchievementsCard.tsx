import React from 'react';
import { Award, Mountain, HeartPulse, ChevronRight } from 'lucide-react';

interface AchievementsCardProps {
  onOpenCategory: (category: 'badges' | 'trekking' | 'health') => void;
}

export const AchievementsCard: React.FC<AchievementsCardProps> = ({
  onOpenCategory
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          Achievements
        </h3>
        <span className="text-[10px] text-slate-400 font-medium">3 Unlocked</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onOpenCategory('badges')}
          className="flex flex-col items-center p-2 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 active:scale-95 transition-all text-center border border-amber-100/80 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mb-1 group-hover:scale-110 transition-transform">
            <Award className="w-4 h-4 fill-amber-500 text-amber-600" />
          </div>
          <span className="text-[10px] font-bold text-slate-800 leading-tight">
            Recent Badges
          </span>
        </button>

        <button
          onClick={() => onOpenCategory('trekking')}
          className="flex flex-col items-center p-2 rounded-xl bg-teal-50/60 hover:bg-teal-100/80 active:scale-95 transition-all text-center border border-teal-100/80 group"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 mb-1 group-hover:scale-110 transition-transform">
            <Mountain className="w-4 h-4 text-teal-700" />
          </div>
          <span className="text-[10px] font-bold text-slate-800 leading-tight">
            Trekking Milestones
          </span>
        </button>

        <button
          onClick={() => onOpenCategory('health')}
          className="flex flex-col items-center p-2 rounded-xl bg-rose-50/60 hover:bg-rose-100/80 active:scale-95 transition-all text-center border border-rose-100/80 group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 mb-1 group-hover:scale-110 transition-transform">
            <HeartPulse className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-[10px] font-bold text-slate-800 leading-tight">
            Health Accomplishments
          </span>
        </button>
      </div>
    </div>
  );
};
