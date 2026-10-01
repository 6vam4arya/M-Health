import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ShieldAlert,
  ArrowDownCircle,
  X,
  Compass,
  MapPin
} from 'lucide-react';
import { LocationData, HealthSnapshot } from '../types';

interface EmergencySOSModalProps {
  location: LocationData;
  healthSnapshot: HealthSnapshot;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  location,
  healthSnapshot,
  onClose
}) => {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  // Simulated high altitude mountain GPS coordinates for current station
  const coordinates =
    location.id === 'namche-bazaar'
      ? '27°48\'16.2"N 86°42\'39.6"E (Elev: 3,440m)'
      : location.id === 'dingboche'
      ? '27°53\'30.0"N 86°49\'50.0"E (Elev: 4,410m)'
      : location.id === 'gorakshep'
      ? '27°58\'50.0"N 86°49\'48.0"E (Elev: 5,164m)'
      : '34°09\'47.0"N 77°35\'05.0"E (Elev: 3,524m)';

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText(coordinates);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  // Emergency Siren audio generator using Web Audio API
  const toggleSiren = () => {
    if (isSirenActive) {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {
          // ignore
        }
      }
      setIsSirenActive(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.5);

        // Modulate siren pitch
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 1.5; // 1.5 Hz modulation
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 300;
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setAudioContext(ctx);
        setOscillator(osc);
        setIsSirenActive(true);
      } catch (err) {
        console.error('Audio siren error', err);
        setIsSirenActive(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {
          // cleanup
        }
      }
      if (audioContext && audioContext.state !== 'closed') {
        try {
          audioContext.close();
        } catch (e) {
          // cleanup
        }
      }
    };
  }, [oscillator, audioContext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl border border-rose-300">
        {/* Urgent Red Emergency Header */}
        <div className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-800 p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
            <span className="text-[11px] font-bold tracking-widest uppercase">
              Emergency SOS Response
            </span>
          </div>
          <h2 className="text-xl font-black tracking-tight">
            High-Altitude Rescue Alert
          </h2>
          <p className="text-xs text-rose-100 mt-1">
            Immediate assistance for severe AMS, HAPE, or HACE.
          </p>
        </div>

        <div className="p-4 space-y-4 text-xs">
          {/* Audio Siren Toggle & GPS Coordinates */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-900 flex items-center gap-1.5 text-xs">
                <MapPin className="w-4 h-4 text-rose-600" />
                Current Mountain Coordinates:
              </span>
              <button
                onClick={toggleSiren}
                className={`py-1 px-2.5 rounded-xl font-bold text-[11px] flex items-center gap-1 transition-all ${
                  isSirenActive
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-white text-rose-700 border border-rose-300 hover:bg-rose-50'
                }`}
              >
                {isSirenActive ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSirenActive ? 'Stop Siren' : 'Play Siren'}</span>
              </button>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-rose-100 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-800 truncate pr-2">
                {coordinates}
              </span>
              <button
                onClick={handleCopyCoords}
                className="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1 flex-shrink-0"
              >
                {copiedCoords ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCoords ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              Provide these coordinates to helicopter dispatch or satellite communicator (Garmin/ZOLEO).
            </p>
          </div>

          {/* Quick Contact Buttons */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
              Direct Emergency Contacts:
            </h4>

            {/* 1. Himalayan Rescue Association Clinic */}
            <a
              href="tel:+9779801234567"
              className="w-full py-3 px-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold flex items-center justify-between shadow-md transition-all"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs">Himalayan Rescue Association</span>
                  <span className="text-[10px] text-rose-100 font-mono">
                    {location.nearestClinic} ({location.clinicDistanceKm} km)
                  </span>
                </div>
              </div>
              <span className="text-xs bg-white text-rose-700 px-2 py-1 rounded-lg">
                Call Now
              </span>
            </a>

            {/* 2. Personal Emergency Contact */}
            <a
              href={`tel:${healthSnapshot.emergencyContactPhone}`}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-semibold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold">
                  👤
                </div>
                <div>
                  <span className="block text-xs">{healthSnapshot.emergencyContactName}</span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    Personal Emergency Contact
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-slate-300">
                {healthSnapshot.emergencyContactPhone}
              </span>
            </a>
          </div>

          {/* Golden Medical Protocol for HAPE / HACE */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <ArrowDownCircle className="w-4 h-4 text-emerald-600" />
              <span>Offline Wilderness Medical Protocol</span>
            </h4>

            <ol className="space-y-1.5 text-[11px] text-slate-700 list-decimal list-inside">
              <li>
                <strong>IMMEDIATE DESCENT:</strong> Descend at least 500-1000 meters down the mountain immediately. Never descend alone.
              </li>
              <li>
                <strong>HIGH-FLOW OXYGEN:</strong> Administer 2-4 L/min via nasal cannula or 6-8 L/min via mask.
              </li>
              <li>
                <strong>HYPERBARIC CHAMBER:</strong> If descent is blocked by storm, place patient in Gamow bag (2 PSI over ambient).
              </li>
              <li>
                <strong>MEDICATIONS (Under doctor guidance):</strong>
                <ul className="pl-4 list-disc space-y-0.5 mt-0.5 text-slate-600">
                  <li><strong>HACE:</strong> Dexamethasone 8mg PO/IM stat, then 4mg every 6 hours.</li>
                  <li><strong>HAPE:</strong> Nifedipine 30mg extended-release every 12 hours.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
