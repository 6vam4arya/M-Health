import React, { useState } from 'react';
import { Activity, Heart, Droplets, Footprints, Moon, X, Check } from 'lucide-react';
import { HealthSnapshot } from '../types';

interface VitalsQuickLogModalProps {
  snapshot: HealthSnapshot;
  onSaveVitals: (updated: Partial<HealthSnapshot>) => void;
  onClose: () => void;
}

export const VitalsQuickLogModal: React.FC<VitalsQuickLogModalProps> = ({
  snapshot,
  onSaveVitals,
  onClose
}) => {
  const [spo2, setSpo2] = useState(snapshot.currentSpO2);
  const [heartRate, setHeartRate] = useState(snapshot.restingHeartRate);
  const [hydration, setHydration] = useState(snapshot.hydrationLiters);
  const [steps, setSteps] = useState(snapshot.dailySteps);
  const [sleep, setSleep] = useState(snapshot.sleepHours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveVitals({
      currentSpO2: Number(spo2),
      restingHeartRate: Number(heartRate),
      hydrationLiters: Number(hydration),
      dailySteps: Number(steps),
      sleepHours: Number(sleep),
      lastUpdated: 'Just now'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-4 shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Quick Log Mountain Vitals
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="text-slate-600 font-semibold block mb-1">
                SpO2 Saturation (%)
              </label>
              <input
                type="number"
                min="60"
                max="100"
                value={spo2}
                onChange={(e) => setSpo2(Number(e.target.value))}
                className="w-full p-1.5 bg-white border border-slate-200 rounded-lg font-mono font-bold text-sm text-center"
              />
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="text-slate-600 font-semibold block mb-1">
                Heart Rate (BPM)
              </label>
              <input
                type="number"
                min="40"
                max="180"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="w-full p-1.5 bg-white border border-slate-200 rounded-lg font-mono font-bold text-sm text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="text-slate-600 font-semibold block mb-1">
                Hydration (Liters)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={hydration}
                onChange={(e) => setHydration(Number(e.target.value))}
                className="w-full p-1.5 bg-white border border-slate-200 rounded-lg font-mono font-bold text-sm text-center"
              />
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="text-slate-600 font-semibold block mb-1">
                Sleep (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="16"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
                className="w-full p-1.5 bg-white border border-slate-200 rounded-lg font-mono font-bold text-sm text-center"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <label className="text-slate-600 font-semibold block mb-1">
              Trekking Steps Today
            </label>
            <input
              type="number"
              min="0"
              max="50000"
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-full p-1.5 bg-white border border-slate-200 rounded-lg font-mono font-bold text-sm text-center"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-xs"
            >
              Save Vitals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
