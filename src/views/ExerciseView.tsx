import React, { useState, useEffect } from 'react';
import {
  Wind,
  Flame,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart
} from 'lucide-react';
import { YogaPose } from '../types';
import { YOGA_POSES } from '../data/mockData';

interface ExerciseViewProps {
  onStartBreathingPacer: () => void;
  streakDays: number;
  wellnessScore: number;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  onStartBreathingPacer,
  streakDays,
  wellnessScore
}) => {
  const [selectedPose, setSelectedPose] = useState<YogaPose>(YOGA_POSES[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Interactive Asana Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(selectedPose.durationMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(3);

  // Sync timer when pose changes
  useEffect(() => {
    setTimerSeconds(selectedPose.durationMinutes * 60);
    setIsRunning(false);
  }, [selectedPose]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isRunning) {
      setIsRunning(false);
      setCompletedSessions((prev) => prev + 1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const filteredPoses =
    filterCategory === 'all'
      ? YOGA_POSES
      : YOGA_POSES.filter((p) => p.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div className="pb-24 pt-3 px-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Himalayan Yogic Wellness
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            High-Altitude Asanas & Prana
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-amber-800">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
          <span className="font-bold font-mono">{streakDays} Day Streak</span>
        </div>
      </div>

      {/* Featured Pranayama Breathing Quick Launch */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded-full inline-block">
            High Altitude Pranayama
          </span>
          <h3 className="text-base font-bold text-white">
            Nadi Shodhana & Oxygen Pacer
          </h3>
          <p className="text-xs text-emerald-100 max-w-[280px] leading-relaxed">
            Gentle 4-4-4 diaphragmatic breathing optimizes oxygen saturation and soothes hypoxia-induced tachycardia.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartBreathingPacer}
              className="py-2.5 px-4 rounded-xl bg-white text-emerald-900 font-bold text-xs flex items-center gap-2 hover:bg-emerald-50 active:scale-95 shadow-sm transition-all"
            >
              <Wind className="w-4 h-4 text-emerald-600" />
              <span>Launch Guided Breathing Pacer</span>
            </button>
          </div>
        </div>

        {/* Ambient decorative lotus circles */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-4 top-4 text-5xl opacity-30 select-none">
          🧘
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {['all', 'pranayama', 'restorative', 'oxygenation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors capitalize ${
              filterCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Active Pose & Step-by-Step Demonstration */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              {selectedPose.category} · {selectedPose.recommendedAltitude}
            </span>
            <h3 className="text-lg font-bold text-slate-800">
              {selectedPose.englishName}
            </h3>
            <p className="text-xs font-semibold text-slate-400 italic">
              {selectedPose.sanskritName}
            </p>
          </div>

          {/* Interactive Guided Timer */}
          <div className="text-right">
            <span className="text-xl font-mono font-extrabold text-slate-800 block">
              {formatTimer(timerSeconds)}
            </span>
            <div className="flex items-center gap-1 mt-1 justify-end">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-1.5 rounded-lg text-white text-xs ${
                  isRunning ? 'bg-amber-600' : 'bg-emerald-700'
                }`}
                title={isRunning ? 'Pause' : 'Start'}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimerSeconds(selectedPose.durationMinutes * 60);
                }}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs hover:bg-slate-200"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Animated Pose Visual Illustration (Feature 10: Guided Visual Demonstration) */}
        <div className="relative h-44 rounded-2xl bg-gradient-to-b from-sky-50 via-teal-50 to-emerald-50 border border-emerald-100 overflow-hidden flex items-center justify-center p-3">
          {/* Animated Aura Ring */}
          <div
            className={`w-32 h-32 rounded-full border-2 border-emerald-400/40 flex items-center justify-center ${
              isRunning ? 'animate-pulse' : ''
            }`}
          >
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-5xl">
              {selectedPose.illustrationType === 'pranayama' && '🧘'}
              {selectedPose.illustrationType === 'wall-legs' && '🤸'}
              {selectedPose.illustrationType === 'child' && '🙇'}
              {selectedPose.illustrationType === 'cobra' && '🐍'}
            </div>
          </div>

          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-100">
            <span className="text-slate-600 font-medium truncate max-w-[220px]">
              {selectedPose.breathingRatio || 'Slow diaphragmatic breaths'}
            </span>
            <span className="text-emerald-700 font-bold font-mono">
              {selectedPose.durationMinutes} min
            </span>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Guided Step-by-Step Sequence:
          </h4>
          <ol className="space-y-1.5 text-xs text-slate-700">
            {selectedPose.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Altitude Benefits & Precautions */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-900 block mb-1">
              🏔️ High-Altitude Benefits
            </span>
            <ul className="text-[11px] text-emerald-950 space-y-1 list-disc list-inside">
              {selectedPose.altitudeBenefits.slice(0, 2).map((b, i) => (
                <li key={i} className="leading-tight">{b}</li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
            <span className="text-[10px] font-bold text-amber-900 block mb-1">
              ⚠️ Mountain Precautions
            </span>
            <ul className="text-[11px] text-amber-950 space-y-1 list-disc list-inside">
              {selectedPose.precautions.slice(0, 2).map((p, i) => (
                <li key={i} className="leading-tight">{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pose Library Switcher */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight px-1">
          Recommended High Altitude Pose Library
        </h3>
        <div className="space-y-2">
          {filteredPoses.map((pose) => (
            <button
              key={pose.id}
              onClick={() => setSelectedPose(pose)}
              className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                selectedPose.id === pose.id
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                  {pose.illustrationType === 'pranayama' && '🧘'}
                  {pose.illustrationType === 'wall-legs' && '🤸'}
                  {pose.illustrationType === 'child' && '🙇'}
                  {pose.illustrationType === 'cobra' && '🐍'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {pose.englishName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {pose.sanskritName} · {pose.category}
                  </p>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-slate-500">
                  {pose.durationMinutes} min
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
