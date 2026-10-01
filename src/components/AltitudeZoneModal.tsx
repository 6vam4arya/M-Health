import React from 'react';
import { Mountain, Wind, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface AltitudeZoneModalProps {
  onClose: () => void;
}

export const AltitudeZoneModal: React.FC<AltitudeZoneModalProps> = ({ onClose }) => {
  const zones = [
    {
      name: 'Low Altitude',
      range: 'Sea level to 2,400 m (0 to 8,000 ft)',
      o2: '100% to 78%',
      impact: 'Minimal physiological impact. Arterial oxygen saturation (SaO2) > 96%. Altitude illness rarely occurs.',
      examples: 'Kathmandu (1,400m), Denver (1,600m), Manali (2,050m)',
      color: 'border-teal-200 bg-teal-50/70 text-teal-900'
    },
    {
      name: 'Moderate Altitude',
      range: '2,400 to 3,500 m (8,000 to 11,500 ft)',
      o2: '78% to 66%',
      impact: 'Decreased arterial oxygen saturation during sleep & exercise. Mild AMS possible if ascending too fast. Hyperventilation occurs.',
      examples: 'Namche Bazaar (3,440m), Leh (3,524m), Cusco (3,400m)',
      color: 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
    },
    {
      name: 'High Altitude',
      range: '3,500 to 5,500 m (11,500 to 18,000 ft)',
      o2: '66% to 50%',
      impact: 'Severe hypoxemia during exertion. AMS is common without planned rest days. Risk of HAPE and HACE significantly elevates.',
      examples: 'Tengboche (3,860m), Dingboche (4,410m), Everest Base Camp (5,364m)',
      color: 'border-amber-200 bg-amber-50/70 text-amber-900'
    },
    {
      name: 'Extreme Altitude (The Death Zone)',
      range: 'Above 5,500 m (Above 18,000 ft)',
      o2: '< 50%',
      impact: 'Human body cannot permanently acclimatize; progressive deterioration over time. Supplemental oxygen standardly required.',
      examples: 'Kala Patthar (5,644m), Thorong La (5,416m), Everest Summit (8,848m)',
      color: 'border-rose-200 bg-rose-50/70 text-rose-900'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Altitude Zones & Hypoxia Science
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 text-xs">
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border space-y-1.5 ${zone.color}`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs">{zone.name}</h4>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-current">
                  Effective O₂: {zone.o2}
                </span>
              </div>
              <p className="text-[10px] font-medium opacity-80">{zone.range}</p>
              <p className="text-[11px] leading-relaxed opacity-95">{zone.impact}</p>
              <p className="text-[10px] italic opacity-85">
                Key peaks/towns: {zone.examples}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
