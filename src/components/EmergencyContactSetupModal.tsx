import React, { useState } from 'react';
import { PhoneCall, UserCheck, X } from 'lucide-react';
import { HealthSnapshot } from '../types';

interface EmergencyContactSetupModalProps {
  snapshot: HealthSnapshot;
  onSaveContacts: (name: string, phone: string) => void;
  onClose: () => void;
}

export const EmergencyContactSetupModal: React.FC<EmergencyContactSetupModalProps> = ({
  snapshot,
  onSaveContacts,
  onClose
}) => {
  const [name, setName] = useState(snapshot.emergencyContactName);
  const [phone, setPhone] = useState(snapshot.emergencyContactPhone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveContacts(name, phone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-4 shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Configure Emergency Contact
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-600 font-semibold block mb-1">
              Contact / Doctor Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-xl"
              placeholder="e.g. Dr. Tsering Sherpa / Next of Kin"
            />
          </div>

          <div>
            <label className="text-slate-600 font-semibold block mb-1">
              Emergency Phone Number (with Country Code)
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-xl font-mono"
              placeholder="+977-9801234567"
            />
          </div>

          <p className="text-[11px] text-slate-500 bg-sky-50 p-2.5 rounded-xl border border-sky-100">
            This contact is immediately dialable via the 1-touch Emergency SOS screen even without cellular data.
          </p>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-xs"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
