import React from 'react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { LocationData, AMSAssessmentResult } from '../types';

interface AltitudeAlertCardProps {
  location: LocationData;
  amsResult: AMSAssessmentResult;
  onOpenHapeHaceInfo: () => void;
}

export const AltitudeAlertCard: React.FC<AltitudeAlertCardProps> = ({
  location,
  amsResult,
  onOpenHapeHaceInfo
}) => {
  // Determine risk level based on altitude and current Lake Louise AMS score
  let currentRisk = location.riskLevel;
  if (amsResult.score >= 5 || amsResult.hapeRisk) {
    currentRisk = 'Severe';
  } else if (amsResult.score >= 3 || amsResult.isAMS) {
    currentRisk = 'High';
  }

  const getRiskDetails = (risk: string) => {
    switch (risk) {
      case 'Normal':
        return {
          textColor: 'text-emerald-700',
          barWidth: 'w-1/4',
          barColor: 'bg-emerald-500',
          recommendation: 'Good acclimatization baseline. Hydrate normally.'
        };
      case 'Moderate':
        return {
          textColor: 'text-amber-700',
          barWidth: 'w-1/2',
          barColor: 'bg-amber-500',
          recommendation: 'Stay hydrated (3-4L) and acclimate. Avoid alcohol.'
        };
      case 'High':
        return {
          textColor: 'text-orange-700',
          barWidth: 'w-3/4',
          barColor: 'bg-orange-500',
          recommendation: 'Rest day advised. Do not ascend if headache persists.'
        };
      case 'Severe':
        return {
          textColor: 'text-rose-700',
          barWidth: 'w-full',
          barColor: 'bg-rose-500',
          recommendation: 'Immediate rest or descent. Assess for cough or loss of balance.'
        };
      default:
        return {
          textColor: 'text-amber-700',
          barWidth: 'w-1/2',
          barColor: 'bg-amber-500',
          recommendation: 'Stay hydrated and acclimate.'
        };
    }
  };

  const details = getRiskDetails(currentRisk);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          Altitude Health Alert Card
        </h3>
        <button
          onClick={onOpenHapeHaceInfo}
          className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 px-2 py-0.5 rounded-full transition-all"
        >
          <ShieldAlert className="w-3 h-3 text-rose-500" />
          <span>HAPE/HACE warning</span>
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium">Risk:</span>
          <span className={`font-bold ${details.textColor}`}>
            {currentRisk}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            AMS risk
          </span>
        </div>

        <p className="text-xs text-slate-600">
          <span className="font-semibold text-slate-700">Health rec:</span>{' '}
          {details.recommendation}
        </p>

        {/* Progress bar matching the user mockup */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${details.barColor} ${details.barWidth}`}
          />
        </div>
      </div>
    </div>
  );
};
