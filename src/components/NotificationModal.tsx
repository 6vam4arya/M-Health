import React from 'react';
import { Bell, ShieldAlert, CloudSun, Award, X, Check } from 'lucide-react';

interface NotificationModalProps {
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      icon: ShieldAlert,
      iconColor: 'text-amber-600 bg-amber-100',
      title: 'Acclimatization Check-in Required',
      time: '10 min ago',
      desc: 'You have been at 3,440m for 18 hours. Complete your morning Lake Louise check to verify healthy adaptation.'
    },
    {
      id: 2,
      icon: CloudSun,
      iconColor: 'text-sky-600 bg-sky-100',
      title: 'Namche Weather Alert: Afternoon Wind',
      time: '1 hour ago',
      desc: 'Brisk wind chills expected around 2:00 PM. Put on windproof outer shell before descending towards the river.'
    },
    {
      id: 3,
      icon: Award,
      iconColor: 'text-emerald-600 bg-emerald-100',
      title: '12-Day Streak Maintained!',
      time: 'Today, 8:00 AM',
      desc: 'Congratulations! Your consistent morning pranayama practice has unlocked +20 Punya bonus.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Notifications & Altitude Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${n.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-bold text-slate-800 truncate pr-2">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {n.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};
