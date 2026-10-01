import React from 'react';
import { ArrowRight, MapPin, Award, FileText, Mountain } from 'lucide-react';

interface TravelDiarySummaryCardProps {
  placesCount: number;
  highestAltitude: number;
  healthLogsCount: number;
  badgesCount: number;
  onOpenTravelDiary: () => void;
}

export const TravelDiarySummaryCard: React.FC<TravelDiarySummaryCardProps> = ({
  placesCount,
  highestAltitude,
  healthLogsCount,
  badgesCount,
  onOpenTravelDiary
}) => {
  return (
    <div
      onClick={onOpenTravelDiary}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          Travel Diary Summary
        </h3>
        <span className="text-[10px] text-emerald-600 font-semibold group-hover:underline flex items-center gap-0.5">
          <span>Full Log</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Places:</span>
          <span className="text-base font-bold text-slate-800 font-mono">{placesCount}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Highest:</span>
          <span className="text-sm font-bold text-slate-800 font-mono">
            {highestAltitude.toLocaleString()} m
          </span>
        </div>

        {/* Scenic mountain picture thumbnail matching mockup */}
        <div className="w-11 h-11 rounded-xl overflow-hidden shadow-xs border border-slate-200 flex-shrink-0">
          <img
            src="/src/assets/images/namche_bazaar_mountain_1790863299271.jpg"
            alt="Himalayan Peak"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="text-right">
          <div className="text-xs">
            <span className="text-slate-400 font-medium">Health Logs: </span>
            <span className="font-bold text-slate-800 font-mono">{healthLogsCount}</span>
          </div>
          <div className="text-xs mt-0.5">
            <span className="text-slate-400 font-medium">Badges: </span>
            <span className="font-bold text-amber-600 font-mono">{badgesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
