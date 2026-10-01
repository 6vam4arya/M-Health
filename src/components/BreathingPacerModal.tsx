import React, { useState, useEffect } from 'react';
import { Wind, X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface BreathingPacerModalProps {
  onClose: () => void;
  onFinishSession?: () => void;
}

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest';

export const BreathingPacerModal: React.FC<BreathingPacerModalProps> = ({
  onClose,
  onFinishSession
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [phase, setPhase] = useState<BreathPhase>('Inhale');
  const [countdown, setCountdown] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // 4-4-4-4 Box / Sama Vritti breathing ratio for high-altitude stabilization
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Switch phase
          if (phase === 'Inhale') {
            setPhase('Hold');
            playChime(660);
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            playChime(520);
            return 4;
          } else if (phase === 'Exhale') {
            setPhase('Rest');
            playChime(440);
            return 4;
          } else {
            setPhase('Inhale');
            playChime(587);
            setCompletedCycles((c) => c + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, phase]);

  const playChime = (freq: number) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Audio context might require initial interaction
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'Inhale':
        return 'Inhale deeply through your nose, expanding your lower abdomen...';
      case 'Hold':
        return 'Hold gently without straining your throat or chest...';
      case 'Exhale':
        return 'Slowly release breath through nose or pursed lips...';
      case 'Rest':
        return 'Pause quietly in still awareness before the next breath...';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-gradient-to-b from-slate-900 via-teal-950 to-slate-950 text-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-teal-800/50 flex flex-col items-center relative overflow-hidden">
        {/* Background tranquil aurora blur */}
        <div className="absolute top-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Pranayama Oxygen Pacer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated Expanding & Contracting Breathing Bubble */}
        <div className="relative my-8 w-56 h-56 flex items-center justify-center">
          {/* Outer Ripple Rings */}
          <div
            className={`absolute rounded-full border-2 border-emerald-400/20 transition-all duration-1000 ${
              phase === 'Inhale'
                ? 'w-56 h-56 scale-100 opacity-90'
                : phase === 'Hold'
                ? 'w-56 h-56 scale-105 opacity-100'
                : phase === 'Exhale'
                ? 'w-36 h-36 scale-75 opacity-40'
                : 'w-32 h-32 scale-70 opacity-30'
            }`}
          />

          <div
            className={`absolute rounded-full bg-gradient-to-tr from-emerald-500/30 to-teal-400/40 blur-md transition-all duration-1000 ${
              phase === 'Inhale'
                ? 'w-48 h-48 scale-100'
                : phase === 'Hold'
                ? 'w-48 h-48 scale-105'
                : phase === 'Exhale'
                ? 'w-28 h-28 scale-75'
                : 'w-24 h-24 scale-70'
            }`}
          />

          {/* Central Breath Core */}
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex flex-col items-center justify-center shadow-xl shadow-emerald-900/50 transition-all duration-1000 ${
              phase === 'Inhale' || phase === 'Hold' ? 'scale-110' : 'scale-90'
            }`}
          >
            <span className="text-sm font-black tracking-wider uppercase text-white/90">
              {phase}
            </span>
            <span className="text-3xl font-black font-mono mt-1 text-white">
              {countdown}s
            </span>
          </div>
        </div>

        {/* Instruction and Guidance */}
        <p className="text-xs text-center text-emerald-100/90 min-h-[36px] max-w-[260px] leading-relaxed mb-4">
          {getPhaseInstruction()}
        </p>

        {/* Completed Cycles and Controls */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between mb-4">
          <div className="text-left">
            <span className="text-[10px] text-emerald-300/70 block uppercase font-bold">
              Completed Cycles
            </span>
            <span className="text-sm font-bold font-mono text-white">
              {completedCycles} Rounds
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              onClick={() => {
                setCompletedCycles(0);
                setCountdown(4);
                setPhase('Inhale');
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            if (onFinishSession) onFinishSession();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
        >
          Finish & Return
        </button>
      </div>
    </div>
  );
};
