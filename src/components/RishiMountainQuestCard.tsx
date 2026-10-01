import React from 'react';
import { Trophy, Compass, Sparkles } from 'lucide-react';

interface RishiMountainQuestCardProps {
  punya: number;
  paap: number;
  level: number;
  rank: number;
  onOpenQuest: () => void;
}

export const RishiMountainQuestCard: React.FC<RishiMountainQuestCardProps> = ({
  punya,
  paap,
  level,
  rank,
  onOpenQuest
}) => {
  return (
    <div
      onClick={onOpenQuest}
      className="relative rounded-2xl overflow-hidden shadow-sm border border-sky-100 hover:shadow-md transition-all cursor-pointer group bg-gradient-to-r from-sky-100 via-teal-50 to-emerald-100 p-3.5"
    >
      {/* Mountain path backdrop styling */}
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <span>Rishi's Mountain Quest</span>
        </h3>
        <span className="text-[10px] font-bold text-teal-800 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full border border-teal-200">
          Daily Challenge
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mt-1">
        {/* Left: Friendly Rishi cartoon character with winding path */}
        <div className="relative flex items-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white shadow-sm bg-amber-50 relative group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              src="/src/assets/images/rishi_sage_character_1790863286592.jpg"
              alt="Himalayan Rishi"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Winding mountain path vector in background */}
          <div className="hidden sm:block ml-2 w-14 h-12 opacity-70">
            <svg viewBox="0 0 60 50" fill="none" className="w-full h-full">
              <path
                d="M 2 45 Q 15 35 25 38 T 45 20 T 55 5"
                stroke="#0284c7"
                strokeWidth="4"
                strokeDasharray="2 3"
                strokeLinecap="round"
              />
              <circle cx="55" cy="5" r="4" fill="#f59e0b" />
            </svg>
          </div>
        </div>

        {/* Right side stats matching user mockup */}
        <div className="flex-1 space-y-0.5 text-xs text-right pl-2">
          <div className="flex items-center justify-end gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-xs" />
            <span className="font-medium text-slate-700">Punya:</span>
            <span className="font-bold text-amber-700 font-mono">{punya} (Gold)</span>
          </div>

          <div className="flex items-center justify-end gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-700 inline-block shadow-xs" />
            <span className="font-medium text-slate-700">Paap:</span>
            <span className="font-bold text-rose-800 font-mono">{paap} (Maroon)</span>
          </div>

          <div className="flex items-center justify-end gap-1.5 pt-0.5">
            <span className="text-[11px] font-semibold text-slate-600">Level: {level}</span>
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-400 inline ml-1" />
          </div>

          <div className="text-[11px] font-bold text-emerald-800">
            Leaderboard Rank: {rank}
          </div>
        </div>
      </div>
    </div>
  );
};
