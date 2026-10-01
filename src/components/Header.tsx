import React from 'react';
import { Bell, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenSettings,
  unreadCount = 2
}) => {
  return (
    <div className="relative pt-3 pb-4 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-b-3xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center font-bold text-white shadow-inner">
              U
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-emerald-700" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                Hello, User <span>👋</span>
              </h1>
            </div>
            <p className="text-[11px] text-emerald-100 font-medium">
              October 27, 2023 <span className="opacity-70">|</span> 10:30 AM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all flex items-center justify-center text-white"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-emerald-900" />
            )}
          </button>

          <button
            onClick={onOpenSettings}
            aria-label="Settings"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all flex items-center justify-center text-white"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
