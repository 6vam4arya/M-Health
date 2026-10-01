import React from 'react';
import { Home, Activity, Dumbbell, BookOpen, Trophy, AlertTriangle } from 'lucide-react';

export type NavTab = 'home' | 'physiology' | 'exercise' | 'travel-diary' | 'rishi-quest';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onTriggerSOS: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onTriggerSOS
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'physiology' as NavTab, label: 'Physiology', icon: Activity },
    { id: 'exercise' as NavTab, label: 'Exercise', icon: Dumbbell },
    { id: 'travel-diary' as NavTab, label: 'Travel Diary', icon: BookOpen },
    { id: 'rishi-quest' as NavTab, label: 'Rishi Quest', icon: Trophy }
  ];

  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-2 py-1">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[48px] rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[62px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
