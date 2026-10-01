import React, { useState } from 'react';
import { Settings, Shield, Bell, Moon, Heart, Sliders, X, Check } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  altitudeUnit: 'meters' | 'feet';
  onToggleAltitudeUnit: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  altitudeUnit,
  onToggleAltitudeUnit
}) => {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Application Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Altitude Unit Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Altitude Measurement Unit</span>
              <span className="text-[10px] text-slate-400">Current: {altitudeUnit === 'meters' ? 'Meters (m)' : 'Feet (ft)'}</span>
            </div>
            <button
              onClick={onToggleAltitudeUnit}
              className="py-1 px-3 rounded-xl bg-emerald-700 text-white font-semibold text-xs capitalize hover:bg-emerald-800"
            >
              {altitudeUnit}
            </button>
          </div>

          {/* Acclimatization Reminder Interval */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">AMS Morning Check Reminder</span>
              <span className="text-[10px] text-slate-400">Alert at 8:00 AM daily in high zones</span>
            </div>
            <input
              type="checkbox"
              checked={remindersEnabled}
              onChange={(e) => setRemindersEnabled(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
          </div>

          {/* Offline Himalayan Mode */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Offline Mountain Storage</span>
              <span className="text-[10px] text-slate-400">Retain Lake Louise logs without cellular network</span>
            </div>
            <input
              type="checkbox"
              checked={offlineSync}
              onChange={(e) => setOfflineSync(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
          </div>

          {/* Sound & Haptic */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-800 block">Chime & Vibration Cues</span>
              <span className="text-[10px] text-slate-400">For breathing pacer & emergency warnings</span>
            </div>
            <input
              type="checkbox"
              checked={hapticFeedback}
              onChange={(e) => setHapticFeedback(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
          </div>

          {/* App Info */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-950 space-y-1">
            <span className="font-bold block text-emerald-900">
              AltitudeCare v2.4 (Himalayan Edition)
            </span>
            <p className="text-[10px] text-emerald-800">
              Adheres to Wilderness Medical Society (WMS) & 2018 Lake Louise Consensus Criteria.
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
