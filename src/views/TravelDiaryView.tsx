import React, { useState } from 'react';
import {
  Mountain,
  Calendar,
  Activity,
  Plus,
  AlertCircle,
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles,
  Heart
} from 'lucide-react';
import { TravelLogEntry, LocationData } from '../types';

interface TravelDiaryViewProps {
  currentLocation: LocationData;
  travelLogs: TravelLogEntry[];
  onAddTravelLog: (entry: TravelLogEntry) => void;
}

export const TravelDiaryView: React.FC<TravelDiaryViewProps> = ({
  currentLocation,
  travelLogs,
  onAddTravelLog
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLocationName, setNewLocationName] = useState(currentLocation.name);
  const [newAltitude, setNewAltitude] = useState(currentLocation.altitudeMeters);
  const [newSpO2, setNewSpO2] = useState(91);
  const [newPulse, setNewPulse] = useState(78);
  const [newAmsScore, setNewAmsScore] = useState(1);
  const [newNotes, setNewNotes] = useState('');
  const [newAcclimatization, setNewAcclimatization] = useState<'Good' | 'Mild Discomfort' | 'Needed Rest Day'>('Good');

  // Find if user had a previous rough acclimatization around this altitude
  const matchingPastLog = travelLogs.find(
    (l) => Math.abs(l.altitudeMeters - currentLocation.altitudeMeters) <= 600 && (l.amsScore >= 3 || l.spO2 < 88)
  );

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: TravelLogEntry = {
      id: `log-${Date.now()}`,
      locationName: newLocationName,
      altitudeMeters: Number(newAltitude),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amsScore: Number(newAmsScore),
      spO2: Number(newSpO2),
      heartRate: Number(newPulse),
      notes: newNotes || 'Ascent logged smoothly.',
      symptoms: newAmsScore > 0 ? ['Mild headache'] : [],
      acclimatizationState: newAcclimatization
    };
    onAddTravelLog(entry);
    setShowAddModal(false);
    setNewNotes('');
  };

  const highestAltitude = Math.max(...travelLogs.map((l) => l.altitudeMeters));

  return (
    <div className="pb-24 pt-3 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Himalayan Travel Log & History
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Trek Diary & Elevation Path
          </h2>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Log</span>
        </button>
      </div>

      {/* Feature 5: Acclimatization Memory Warning (Intelligent Historical Detection) */}
      {matchingPastLog && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Personalized Acclimatization Memory Alert</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            Historical analysis shows that at <strong>{matchingPastLog.locationName} ({matchingPastLog.altitudeMeters} m)</strong> on {matchingPastLog.date}, you recorded an AMS score of <strong>{matchingPastLog.amsScore}/15</strong> and blood oxygen of <strong>{matchingPastLog.spO2}%</strong>.
          </p>
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100 text-[11px] text-amber-900">
            💡 <strong>Recommendation:</strong> Since you are currently at <strong>{currentLocation.altitudeMeters} m ({currentLocation.name})</strong>, take an extra acclimatization rest day, hydrate with 3.5L fluids, and recheck your SpO2 before ascending higher.
          </div>
        </div>
      )}

      {/* Elevation Ascent Path Graph / Visual Overview */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Himalayan Elevation Progression</span>
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-700">
            Peak: {highestAltitude} m
          </span>
        </div>

        {/* Visual mountain stage timeline */}
        <div className="relative pt-4 pb-2">
          <div className="flex items-end justify-between gap-1 h-32 px-2 border-b border-slate-200">
            {travelLogs.map((log, index) => {
              const heightPct = Math.round((log.altitudeMeters / 6000) * 100);
              return (
                <div key={log.id} className="flex-1 flex flex-col items-center group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-1.5 rounded pointer-events-none whitespace-nowrap z-20 font-mono">
                    {log.locationName}: {log.altitudeMeters}m (SpO2 {log.spO2}%)
                  </div>

                  <span className="text-[9px] font-mono text-slate-400 mb-1 group-hover:text-emerald-700 font-bold">
                    {log.altitudeMeters}m
                  </span>

                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                      log.amsScore >= 3
                        ? 'bg-amber-400 group-hover:bg-amber-500'
                        : 'bg-emerald-600 group-hover:bg-emerald-700'
                    }`}
                  />

                  <span className="text-[9px] text-slate-500 truncate max-w-[42px] mt-1.5 block">
                    {log.locationName.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Historical Travel Log Cards */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-700 px-1">
          Recorded Treks & Health Logs ({travelLogs.length})
        </h3>

        {travelLogs.map((log) => (
          <div
            key={log.id}
            className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  <Mountain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {log.locationName}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>{log.date}</span>
                    <span>·</span>
                    <span className="font-mono font-semibold text-slate-600">
                      {log.altitudeMeters.toLocaleString()} m
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    log.acclimatizationState === 'Good'
                      ? 'bg-emerald-100 text-emerald-800'
                      : log.acclimatizationState === 'Mild Discomfort'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {log.acclimatizationState}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                  AMS: {log.amsScore}/15
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-xl text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Activity className="w-3 h-3 text-emerald-600" />
                <span>SpO2:</span>
                <span className="font-bold text-slate-800 font-mono">{log.spO2}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>Pulse:</span>
                <span className="font-bold text-slate-800 font-mono">{log.heartRate} BPM</span>
              </div>
            </div>

            {log.notes && (
              <p className="text-[11px] text-slate-600 italic border-l-2 border-emerald-300 pl-2">
                "{log.notes}"
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Add New Log Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-800">
                Add Travel & Health Log
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLog} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">
                  Location / Station Name
                </label>
                <input
                  type="text"
                  required
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                  placeholder="e.g. Tengboche Monastery"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    Altitude (m)
                  </label>
                  <input
                    type="number"
                    required
                    value={newAltitude}
                    onChange={(e) => setNewAltitude(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    Lake Louise Score (0-15)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={newAmsScore}
                    onChange={(e) => setNewAmsScore(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    SpO2 (%)
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="100"
                    value={newSpO2}
                    onChange={(e) => setNewSpO2(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    Heart Rate (BPM)
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="160"
                    value={newPulse}
                    onChange={(e) => setNewPulse(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">
                  Acclimatization State
                </label>
                <select
                  value={newAcclimatization}
                  onChange={(e) =>
                    setNewAcclimatization(
                      e.target.value as 'Good' | 'Mild Discomfort' | 'Needed Rest Day'
                    )
                  }
                  className="w-full p-2 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="Good">Good (No severe distress)</option>
                  <option value="Mild Discomfort">Mild Discomfort (Mild headache/fatigue)</option>
                  <option value="Needed Rest Day">Needed Rest Day (Significant fatigue/headache)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">
                  Notes & Symptoms
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                  placeholder="Trail conditions, hydration, feelings upon arrival..."
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 font-semibold text-white shadow-sm"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
