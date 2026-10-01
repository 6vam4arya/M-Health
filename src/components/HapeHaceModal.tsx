import React from 'react';
import { ShieldAlert, AlertTriangle, ArrowDown, X, Info } from 'lucide-react';

interface HapeHaceModalProps {
  onClose: () => void;
  onTriggerSOS: () => void;
}

export const HapeHaceModal: React.FC<HapeHaceModalProps> = ({
  onClose,
  onTriggerSOS
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl border border-slate-100">
        <div className="bg-slate-900 p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>High-Altitude Pathology</span>
          </div>
          <h3 className="text-base font-bold text-white">
            AMS vs. HAPE vs. HACE Guide
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Recognizing early indicators saves lives on the mountain.
          </p>
        </div>

        <div className="p-4 space-y-3.5 text-xs">
          {/* 1. AMS (Acute Mountain Sickness) */}
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-900">
                1. Acute Mountain Sickness (AMS)
              </h4>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                Common
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Similar to a severe hangover. Characterized by <strong>headache</strong> plus at least one of: fatigue, nausea/loss of appetite, insomnia, or dizziness.
            </p>
            <p className="text-[10px] text-amber-800 font-semibold">
              Action: Rest at current altitude; do NOT ascend. Hydrate and use mild analgesics.
            </p>
          </div>

          {/* 2. HAPE (High Altitude Pulmonary Edema) */}
          <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sky-900">
                2. High Altitude Pulmonary Edema (HAPE)
              </h4>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                Life-Threatening
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Fluid accumulates in the alveoli of lungs. Hallmarks: <strong>breathlessness at rest</strong>, persistent dry/wet cough, chest tightness, gurgling breath sounds, cyanosis (blue lips), and pink frothy sputum.
            </p>
            <p className="text-[10px] text-rose-700 font-semibold">
              Action: IMMEDIATE DESCENT! Supplemental oxygen, Gamow bag, Nifedipine.
            </p>
          </div>

          {/* 3. HACE (High Altitude Cerebral Edema) */}
          <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-rose-900">
                3. High Altitude Cerebral Edema (HACE)
              </h4>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                Critical Emergency
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Brain swelling due to hypoxia. Hallmarks: <strong>Ataxia (staggering gait, inability to walk heel-to-toe)</strong>, confusion, sluggish mentation, irrational choices, extreme lethargy, or coma.
            </p>
            <p className="text-[10px] text-rose-700 font-semibold">
              Action: IMMEDIATE DESCENT! Dexamethasone 8mg stat, high-flow O2, evacuate.
            </p>
          </div>

          {/* Golden Rule Banner */}
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-[11px] text-emerald-950">
            <strong>The Himalayan Golden Rule:</strong> Any sickness at altitude is altitude sickness until proven otherwise! Never leave an unwell climber alone.
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 font-semibold text-slate-700 text-xs"
          >
            Got It
          </button>
          <button
            onClick={() => {
              onClose();
              onTriggerSOS();
            }}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Open SOS Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};
