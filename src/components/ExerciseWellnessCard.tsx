import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface ExerciseWellnessCardProps {
  onOpenYoga: () => void;
  onOpenBreathingPacer: () => void;
  streakDays?: number;
  wellnessScore?: number;
}

export const ExerciseWellnessCard: React.FC<ExerciseWellnessCardProps> = ({
  onOpenYoga,
  onOpenBreathingPacer,
  streakDays = 12,
  wellnessScore = 88
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          Exercise & Wellness
        </h3>
        <button
          onClick={onOpenYoga}
          className="text-[10px] text-emerald-600 font-semibold hover:underline"
        >
          View all poses
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">
            Today's Exercise:
          </span>
          <button
            onClick={onOpenYoga}
            className="text-sm font-bold text-slate-800 hover:text-emerald-700 text-left transition-colors"
          >
            Yoga Poses
          </button>
        </div>

        <button
          onClick={onOpenBreathingPacer}
          className="flex flex-col items-center justify-center bg-emerald-50 hover:bg-emerald-100 active:scale-95 px-3 py-1.5 rounded-xl border border-emerald-100 transition-all text-center group"
          title="Start 2-minute Pranayama Breathing Pacer"
        >
          <span className="text-lg leading-none group-hover:scale-110 transition-transform">
            🧘
          </span>
          <span className="text-[9px] font-bold text-emerald-800 leading-tight mt-0.5">
            Breathing shortcut
          </span>
        </button>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-xs">
            <span className="text-slate-400 font-medium">Streak:</span>
            <span className="font-bold text-amber-600 flex items-center font-mono">
              <Flame className="w-3 h-3 fill-amber-500 text-amber-500 inline mr-0.5" />
              {streakDays} Days
            </span>
          </div>
          <div className="flex items-center justify-end gap-1 text-xs mt-0.5">
            <span className="text-slate-400 font-medium">Wellness score:</span>
            <span className="font-bold text-emerald-600 font-mono">
              {wellnessScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
