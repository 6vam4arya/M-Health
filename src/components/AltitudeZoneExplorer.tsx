import React from 'react';
import { Wind, Mountain, Compass, Info } from 'lucide-react';
import { LocationData } from '../types';

interface AltitudeZoneExplorerProps {
  currentAltitude: number;
  oxygenPercentage: number;
  onExploreZoneDetails?: () => void;
}

export const AltitudeZoneExplorer: React.FC<AltitudeZoneExplorerProps> = ({
  currentAltitude,
  oxygenPercentage,
  onExploreZoneDetails
}) => {
  // Determine altitude zone
  let zoneName = 'Moderate';
  let zoneColor = 'bg-emerald-500';
  let impactText = 'Moderate impact on breath';

  if (currentAltitude < 2400) {
    zoneName = 'Low';
    zoneColor = 'bg-teal-500';
    impactText = 'Minimal impact on body';
  } else if (currentAltitude <= 3500) {
    zoneName = 'Moderate';
    zoneColor = 'bg-emerald-500';
    impactText = 'Moderate impact on breath';
  } else if (currentAltitude <= 5500) {
    zoneName = 'High';
    zoneColor = 'bg-amber-500';
    impactText = 'Noticeable breathlessness';
  } else {
    zoneName = 'Extreme';
    zoneColor = 'bg-rose-500';
    impactText = 'Severe hypoxia / Death Zone';
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          Altitude Zone Explorer
        </h3>
        <button
          onClick={onExploreZoneDetails}
          className="text-[10px] text-slate-400 hover:text-emerald-700 flex items-center gap-0.5"
        >
          <Info className="w-3 h-3" />
          <span>Zones info</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Mountain illustration with zones */}
        <div className="relative flex-1 h-24 bg-gradient-to-b from-sky-50 to-emerald-50/60 rounded-xl overflow-hidden p-2 border border-slate-100">
          {/* Vertical zone scale markers on left */}
          <div className="absolute left-2 top-2 bottom-2 flex flex-col justify-between text-[9px] font-bold text-slate-400 select-none z-10">
            <span className={zoneName === 'Extreme' || zoneName === 'High' ? 'text-amber-600 font-extrabold' : ''}>High</span>
            <span className={zoneName === 'Moderate' ? 'text-emerald-700 font-extrabold' : ''}>Zone</span>
            <span className={zoneName === 'Low' ? 'text-teal-700 font-extrabold' : ''}>Low</span>
          </div>

          {/* Artistic SVG Mountain peaks with snow caps and current elevation line */}
          <svg
            className="absolute bottom-0 right-0 left-8 h-20 w-[calc(100%-2rem)]"
            viewBox="0 0 160 80"
            preserveAspectRatio="none"
          >
            {/* Background Mountain */}
            <polygon
              points="10,80 50,22 95,80"
              fill="#94a3b8"
              opacity="0.4"
            />
            {/* Background Mountain Snowcap */}
            <polygon
              points="40,36 50,22 62,38 52,32 46,36"
              fill="#ffffff"
              opacity="0.9"
            />

            {/* Fore peak 1 */}
            <polygon
              points="35,80 85,12 135,80"
              fill="#0f766e"
              opacity="0.75"
            />
            {/* Fore peak 1 Snowcap */}
            <polygon
              points="73,28 85,12 98,30 90,24 82,28"
              fill="#ffffff"
            />

            {/* Fore peak 2 */}
            <polygon
              points="90,80 130,26 160,80"
              fill="#065f46"
              opacity="0.9"
            />
            <polygon
              points="120,40 130,26 142,42 134,36"
              fill="#ffffff"
            />

            {/* Horizontal elevation indicator line */}
            <line
              x1="0"
              y1="38"
              x2="160"
              y2="38"
              stroke="#059669"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <circle cx="85" cy="38" r="3" fill="#047857" />
          </svg>
        </div>

        {/* Right side oxygen readout matching mockup */}
        <div className="w-28 flex flex-col items-center text-center p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
          <div className="w-8 h-8 rounded-full bg-emerald-100/80 flex items-center justify-center text-emerald-700 mb-1">
            <Wind className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">
            Oxygen Level
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
            {oxygenPercentage}% O₂
          </span>
          <span className="text-[9px] text-slate-500 leading-tight mt-1">
            {impactText}
          </span>
        </div>
      </div>
    </div>
  );
};
