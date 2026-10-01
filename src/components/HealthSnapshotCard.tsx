import React from 'react';
import { Heart, Activity, Droplets, UserCheck, PhoneCall } from 'lucide-react';
import { HealthSnapshot } from '../types';

interface HealthSnapshotCardProps {
  snapshot: HealthSnapshot;
  onOpenEmergencyContacts: () => void;
  onOpenVitalsLog: () => void;
  onAddHydration: () => void;
}

export const HealthSnapshotCard: React.FC<HealthSnapshotCardProps> = ({
  snapshot,
  onOpenEmergencyContacts,
  onOpenVitalsLog,
  onAddHydration
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          Health Snapshot
        </h3>
        <button
          onClick={onOpenVitalsLog}
          className="text-[10px] text-emerald-600 font-semibold hover:underline flex items-center gap-1"
        >
          <Activity className="w-3 h-3" />
          <span>Quick Log</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs border-b border-slate-100 pb-2.5">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Blood Group</span>
          <span className="font-bold text-slate-800 font-mono">{snapshot.bloodGroup}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Profile</span>
          <span className="font-bold text-emerald-600 font-mono">{snapshot.profileCompletion}%</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Last Update</span>
          <span className="font-medium text-slate-600 truncate block text-[11px]">{snapshot.lastUpdated}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium">Fitness:</span>
          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            {snapshot.fitnessLevel}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium">Emergency Contacts:</span>
          <button
            onClick={onOpenEmergencyContacts}
            className="text-[11px] font-bold text-sky-700 hover:text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100 flex items-center gap-1 active:scale-95 transition-all"
          >
            <PhoneCall className="w-2.5 h-2.5" />
            <span>Setup</span>
          </button>
        </div>
      </div>

      {/* Real-time high altitude metrics bar: SpO2, Heart Rate, Hydration */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
        <div className="bg-slate-50/80 rounded-xl p-2 text-center border border-slate-100">
          <span className="text-[10px] text-slate-400 block font-medium">Blood SpO2</span>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <span className="text-sm font-bold text-slate-800 font-mono">{snapshot.currentSpO2}%</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="bg-slate-50/80 rounded-xl p-2 text-center border border-slate-100">
          <span className="text-[10px] text-slate-400 block font-medium">Pulse (BPM)</span>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-800 font-mono">{snapshot.restingHeartRate}</span>
          </div>
        </div>

        <button
          onClick={onAddHydration}
          className="bg-sky-50/80 hover:bg-sky-100/80 active:scale-95 rounded-xl p-2 text-center border border-sky-100 transition-all group"
          title="Click to add +250ml water"
        >
          <span className="text-[10px] text-sky-600 block font-semibold group-hover:underline">
            Hydration +
          </span>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <Droplets className="w-3 h-3 text-sky-500 fill-sky-400" />
            <span className="text-sm font-bold text-sky-900 font-mono">
              {snapshot.hydrationLiters.toFixed(1)}L
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
