import React from 'react';
import { ClipboardCheck, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { AMSAssessmentResult } from '../types';

interface AmsAssessmentCardProps {
  result: AMSAssessmentResult;
  onRetakeAssessment: () => void;
}

export const AmsAssessmentCard: React.FC<AmsAssessmentCardProps> = ({
  result,
  onRetakeAssessment
}) => {
  // Score percentage out of 15
  const percentage = Math.min(100, Math.round((result.score / 15) * 100));
  
  // Circumference for circular gauge
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (result.score >= 5) return 'text-rose-600 stroke-rose-500';
    if (result.score >= 3) return 'text-amber-600 stroke-amber-500';
    return 'text-emerald-600 stroke-emerald-500';
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-700 tracking-tight">
          AMS Assessment Card
        </h3>
        <span className="text-[10px] text-slate-400 font-medium">
          Lake Louise (2018)
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Circular progress ring */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-11 h-11 transform -rotate-90">
              <circle
                cx="22"
                cy="22"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                className={getScoreColor()}
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-slate-800 font-mono">
              {result.score}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500">Score:</span>
              <span className="text-sm font-bold text-slate-800 font-mono">
                {result.score}/15
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-slate-400">Status:</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onRetakeAssessment}
          className="text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 active:scale-95 px-3 py-1.5 rounded-xl border border-sky-100 transition-all shadow-xs"
        >
          Retake Assessment
        </button>
      </div>

      {result.score > 0 && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="truncate">
            {result.hasHeadache ? 'Mild headache noted' : 'No headache reported'}
          </span>
          <span className="font-medium text-slate-400">
            {result.locationAtTest}
          </span>
        </div>
      )}
    </div>
  );
};
