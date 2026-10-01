import React, { useState } from 'react';
import {
  Activity,
  Heart,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ShieldAlert,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react';
import {
  AMSAssessmentResult,
  LakeLouiseAnswers,
  LocationData,
  AltitudeRisk
} from '../types';

interface PhysiologyViewProps {
  currentLocation: LocationData;
  initialResult: AMSAssessmentResult;
  onSaveAssessment: (newResult: AMSAssessmentResult) => void;
  onTriggerSOS: () => void;
}

export const PhysiologyView: React.FC<PhysiologyViewProps> = ({
  currentLocation,
  initialResult,
  onSaveAssessment,
  onTriggerSOS
}) => {
  const [answers, setAnswers] = useState<LakeLouiseAnswers>({
    headache: initialResult.answers.headache,
    gastrointestinal: initialResult.answers.gastrointestinal,
    fatigue: initialResult.answers.fatigue,
    dizziness: initialResult.answers.dizziness,
    functionalImpairment: initialResult.answers.functionalImpairment
  });

  const [spO2, setSpO2] = useState<number>(91);
  const [heartRate, setHeartRate] = useState<number>(78);

  // Red flags for HAPE / HACE
  const [hasRestDyspnea, setHasRestDyspnea] = useState<boolean>(false);
  const [hasCoughPinkSputum, setHasCoughPinkSputum] = useState<boolean>(false);
  const [hasAtaxia, setHasAtaxia] = useState<boolean>(false);
  const [hasConfusion, setHasConfusion] = useState<boolean>(false);

  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  // Calculate Lake Louise Score (LL2018)
  const totalScore =
    answers.headache +
    answers.gastrointestinal +
    answers.fatigue +
    answers.dizziness +
    answers.functionalImpairment;

  const hasHeadache = answers.headache > 0;
  const isAMS = hasHeadache && totalScore >= 3;
  const hapeRisk = hasRestDyspnea || hasCoughPinkSputum;
  const haceRisk = hasAtaxia || hasConfusion;

  let riskLevel: AltitudeRisk = 'Normal';
  if (haceRisk || hapeRisk || totalScore >= 8) {
    riskLevel = 'Severe';
  } else if (isAMS || totalScore >= 4) {
    riskLevel = 'High';
  } else if (totalScore > 0 || answers.headache > 0) {
    riskLevel = 'Moderate';
  }

  const handleScoreChange = (category: keyof LakeLouiseAnswers, value: number) => {
    setAnswers((prev) => ({ ...prev, [category]: value }));
  };

  const handleSave = () => {
    const recommendations: string[] = [];

    if (haceRisk || hapeRisk) {
      recommendations.push('EMERGENCY: Immediate descent required (at least 500-1000m).');
      recommendations.push('Administer high-flow supplemental oxygen immediately.');
      if (haceRisk) recommendations.push('Dexamethasone 8mg PO/IM stat, then 4mg q6h.');
      if (hapeRisk) recommendations.push('Portable hyperbaric chamber (Gamow bag) & Nifedipine ER.');
    } else if (isAMS) {
      recommendations.push('Do NOT ascend any higher until all symptoms completely resolve.');
      recommendations.push('Rest day with aggressive oral hydration (3-4 Liters with electrolytes).');
      recommendations.push('Acetaminophen or Ibuprofen for headache relief.');
      recommendations.push('Consider Acetazolamide (Diamox) 125-250mg bid if ascent is planned.');
    } else if (answers.headache > 0) {
      recommendations.push('Hydrate with 500-750ml water immediately (dehydration is common).');
      recommendations.push('Rest for 2-3 hours and monitor symptoms.');
    } else {
      recommendations.push('Good acclimatization profile! Continue gradual ascent rate.');
      recommendations.push('Maintain 3-4 Liters of fluid daily and monitor morning resting pulse.');
    }

    const newResult: AMSAssessmentResult = {
      id: `ams-${Date.now()}`,
      date: 'Just now',
      score: totalScore,
      maxScore: 15,
      answers,
      riskLevel,
      hasHeadache,
      isAMS,
      hapeRisk,
      haceRisk,
      recommendations,
      altitudeAtTest: currentLocation.altitudeMeters,
      locationAtTest: currentLocation.name
    };

    onSaveAssessment(newResult);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            AMS Assessment & Physiology
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Lake Louise 2018 Scoring
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500 block">
            {currentLocation.name}
          </span>
          <span className="text-xs font-bold text-emerald-700 font-mono">
            {currentLocation.altitudeMeters} m
          </span>
        </div>
      </div>

      {/* Live Vitals Input Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Current Vitals & Pulse Oximetry</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>SpO2 Saturation</span>
              <span className="text-[10px] text-emerald-600 font-bold">Pulse Ox</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="60"
                max="100"
                value={spO2}
                onChange={(e) => setSpO2(Number(e.target.value))}
                className="w-16 bg-white font-mono text-lg font-bold text-slate-800 p-1.5 rounded-lg border border-slate-200 text-center"
              />
              <span className="text-sm font-semibold text-slate-500">%</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {spO2 >= 90 ? 'Healthy for altitude' : spO2 >= 80 ? 'Mild Hypoxia' : 'Significant Hypoxia'}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Resting Pulse</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="40"
                max="180"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="w-16 bg-white font-mono text-lg font-bold text-slate-800 p-1.5 rounded-lg border border-slate-200 text-center"
              />
              <span className="text-sm font-semibold text-slate-500">BPM</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {heartRate > 100 ? 'High-altitude tachycardia' : 'Normal resting'}
            </span>
          </div>
        </div>
      </div>

      {/* Lake Louise Questionnaire */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Symptom Severity Questionnaire
            </h3>
            <p className="text-[11px] text-slate-400">
              Rate your symptoms over the last 6-12 hours
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400">Total:</span>
            <span className="text-base font-extrabold text-emerald-700 ml-1 font-mono">
              {totalScore} / 15
            </span>
          </div>
        </div>

        {/* 1. Headache (Mandatory for AMS diagnosis) */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <span className="flex items-center gap-1">
              <span>1. Headache</span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1 rounded">
                Key Marker
              </span>
            </span>
            <span className="text-slate-500 font-mono">{answers.headache}/3</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 0, label: 'None' },
              { val: 1, label: 'Mild' },
              { val: 2, label: 'Moderate' },
              { val: 3, label: 'Severe' }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => handleScoreChange('headache', opt.val)}
                className={`py-1.5 px-1 rounded-xl text-xs font-medium border text-center transition-all ${
                  answers.headache === opt.val
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Gastrointestinal */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <span>2. Gastrointestinal (Appetite / Nausea)</span>
            <span className="text-slate-500 font-mono">{answers.gastrointestinal}/3</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 0, label: 'Normal' },
              { val: 1, label: 'Poor appetite' },
              { val: 2, label: 'Nausea' },
              { val: 3, label: 'Vomiting' }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => handleScoreChange('gastrointestinal', opt.val)}
                className={`py-1.5 px-1 rounded-xl text-xs font-medium border text-center transition-all ${
                  answers.gastrointestinal === opt.val
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Fatigue / Weakness */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <span>3. Fatigue and/or Weakness</span>
            <span className="text-slate-500 font-mono">{answers.fatigue}/3</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 0, label: 'Not tired' },
              { val: 1, label: 'Mild' },
              { val: 2, label: 'Moderate' },
              { val: 3, label: 'Exhausted' }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => handleScoreChange('fatigue', opt.val)}
                className={`py-1.5 px-1 rounded-xl text-xs font-medium border text-center transition-all ${
                  answers.fatigue === opt.val
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Dizziness / Lightheadedness */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <span>4. Dizziness / Lightheadedness</span>
            <span className="text-slate-500 font-mono">{answers.dizziness}/3</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 0, label: 'None' },
              { val: 1, label: 'Mild' },
              { val: 2, label: 'Moderate' },
              { val: 3, label: 'Severe' }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => handleScoreChange('dizziness', opt.val)}
                className={`py-1.5 px-1 rounded-xl text-xs font-medium border text-center transition-all ${
                  answers.dizziness === opt.val
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Functional Impairment */}
        <div className="space-y-1.5 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
            <span>5. Ability to Trek / Function</span>
            <span className="text-slate-500 font-mono">{answers.functionalImpairment}/3</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 0, label: 'Normal' },
              { val: 1, label: 'Mild pause' },
              { val: 2, label: 'Must rest' },
              { val: 3, label: 'Bedridden' }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => handleScoreChange('functionalImpairment', opt.val)}
                className={`py-1.5 px-1 rounded-xl text-xs font-medium border text-center transition-all ${
                  answers.functionalImpairment === opt.val
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Red Flags for HAPE / HACE (Critical Safety) */}
      <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide">
            Life-Threatening Warning Flags (HAPE & HACE)
          </h4>
        </div>
        <p className="text-[11px] text-rose-800">
          Check if any of these critical warning signs are observed right now:
        </p>

        <div className="space-y-2 pt-1 text-xs">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasRestDyspnea}
              onChange={(e) => setHasRestDyspnea(e.target.checked)}
              className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
            />
            <span className="text-rose-950">
              <strong>Breathlessness while resting quietly</strong> (HAPE indicator)
            </span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasCoughPinkSputum}
              onChange={(e) => setHasCoughPinkSputum(e.target.checked)}
              className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
            />
            <span className="text-rose-950">
              <strong>Persistent wet chest rattle / pink frothy sputum</strong> (HAPE indicator)
            </span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasAtaxia}
              onChange={(e) => setHasAtaxia(e.target.checked)}
              className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
            />
            <span className="text-rose-950">
              <strong>Loss of physical coordination / staggering gait</strong> (HACE indicator)
            </span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasConfusion}
              onChange={(e) => setHasConfusion(e.target.checked)}
              className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
            />
            <span className="text-rose-950">
              <strong>Severe drowsiness, confusion, irrational behavior</strong> (HACE indicator)
            </span>
          </label>
        </div>

        {(hasRestDyspnea || hasCoughPinkSputum || hasAtaxia || hasConfusion) && (
          <div className="pt-2">
            <button
              onClick={onTriggerSOS}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>TRIGGER EMERGENCY RESCUE PROTOCOL (SOS)</span>
            </button>
          </div>
        )}
      </div>

      {/* Calculated Diagnosis & Guidance Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">Diagnosis Assessment:</span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              riskLevel === 'Severe'
                ? 'bg-rose-100 text-rose-800'
                : riskLevel === 'High'
                ? 'bg-orange-100 text-orange-800'
                : riskLevel === 'Moderate'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {riskLevel} Risk
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
          <p className="font-semibold text-slate-800">
            {isAMS
              ? '⚠️ Acute Mountain Sickness (AMS) Confirmed'
              : hasHeadache
              ? 'ℹ️ Altitude Headache (Mild, Not AMS)'
              : '✅ No Acute Mountain Sickness Detected'}
          </p>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            {isAMS
              ? 'Your score is 3 or greater with an altitude headache present. In accordance with the 2018 Lake Louise Consensus, do not ascend further until symptoms abate.'
              : hasHeadache
              ? 'You have reported a headache, but overall score is below the threshold of 3. Hydrate aggressively and rest.'
              : 'Your vital signs and symptom scores are within the expected physiological range for this altitude.'}
          </p>
        </div>

        {/* Save Assessment button */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all"
        >
          <FileCheck className="w-4 h-4" />
          <span>Save & Update Dashboard Assessment</span>
        </button>

        {savedNotification && (
          <div className="p-2 text-center text-xs text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 animate-in fade-in">
            ✓ Assessment saved! Dashboard health cards updated.
          </div>
        )}
      </div>
    </div>
  );
};
