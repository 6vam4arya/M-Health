/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HomeView } from './views/HomeView';
import { PhysiologyView } from './views/PhysiologyView';
import { ExerciseView } from './views/ExerciseView';
import { TravelDiaryView } from './views/TravelDiaryView';
import { RishiQuestView } from './views/RishiQuestView';
import { BottomNav, NavTab } from './components/BottomNav';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { BreathingPacerModal } from './components/BreathingPacerModal';
import { HapeHaceModal } from './components/HapeHaceModal';
import { NotificationModal } from './components/NotificationModal';
import { SettingsModal } from './components/SettingsModal';
import { VitalsQuickLogModal } from './components/VitalsQuickLogModal';
import { EmergencyContactSetupModal } from './components/EmergencyContactSetupModal';
import { AltitudeZoneModal } from './components/AltitudeZoneModal';
import {
  HIMALAYAN_LOCATIONS,
  INITIAL_HEALTH_SNAPSHOT,
  INITIAL_AMS_RESULT,
  INITIAL_TRAVEL_LOGS,
  NEWS_ARTICLES
} from './data/mockData';
import {
  LocationData,
  HealthSnapshot,
  AMSAssessmentResult,
  TravelLogEntry
} from './types';
import { Smartphone, Maximize2, AlertTriangle, Wind } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [initialQuestTab, setInitialQuestTab] = useState<'quest' | 'leaderboard' | 'badges'>('quest');

  // Device Frame Toggle (Framed picturesque smartphone view vs edge-to-edge view)
  const [isFramedView, setIsFramedView] = useState<boolean>(true);

  // App Data State (with local storage fallback)
  const [currentLocation, setCurrentLocation] = useState<LocationData>(HIMALAYAN_LOCATIONS[0]);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState<boolean>(false);
  const [healthSnapshot, setHealthSnapshot] = useState<HealthSnapshot>(() => {
    const saved = localStorage.getItem('altitudecare_health');
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_SNAPSHOT;
  });
  const [amsResult, setAmsResult] = useState<AMSAssessmentResult>(() => {
    const saved = localStorage.getItem('altitudecare_ams');
    return saved ? JSON.parse(saved) : INITIAL_AMS_RESULT;
  });
  const [travelLogs, setTravelLogs] = useState<TravelLogEntry[]>(() => {
    const saved = localStorage.getItem('altitudecare_treks');
    return saved ? JSON.parse(saved) : INITIAL_TRAVEL_LOGS;
  });

  // Gamification State
  const [punyaPoints, setPunyaPoints] = useState<number>(() => {
    const saved = localStorage.getItem('altitudecare_punya');
    return saved ? Number(saved) : 120;
  });
  const [paapPoints, setPaapPoints] = useState<number>(() => {
    const saved = localStorage.getItem('altitudecare_paap');
    return saved ? Number(saved) : 5;
  });
  const [questLevel, setQuestLevel] = useState<number>(() => {
    const saved = localStorage.getItem('altitudecare_level');
    return saved ? Number(saved) : 4;
  });
  const [streakDays, setStreakDays] = useState<number>(12);
  const [wellnessScore, setWellnessScore] = useState<number>(88);
  const [altitudeUnit, setAltitudeUnit] = useState<'meters' | 'feet'>('meters');

  // Modals state
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [isBreathingPacerOpen, setIsBreathingPacerOpen] = useState<boolean>(false);
  const [isHapeHaceOpen, setIsHapeHaceOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isVitalsLogOpen, setIsVitalsLogOpen] = useState<boolean>(false);
  const [isContactSetupOpen, setIsContactSetupOpen] = useState<boolean>(false);
  const [isZoneDetailsOpen, setIsZoneDetailsOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('altitudecare_health', JSON.stringify(healthSnapshot));
  }, [healthSnapshot]);

  useEffect(() => {
    localStorage.setItem('altitudecare_ams', JSON.stringify(amsResult));
  }, [amsResult]);

  useEffect(() => {
    localStorage.setItem('altitudecare_treks', JSON.stringify(travelLogs));
  }, [travelLogs]);

  useEffect(() => {
    localStorage.setItem('altitudecare_punya', String(punyaPoints));
    localStorage.setItem('altitudecare_paap', String(paapPoints));
    localStorage.setItem('altitudecare_level', String(questLevel));
  }, [punyaPoints, paapPoints, questLevel]);

  // Handlers
  const handleSelectLocation = (loc: LocationData) => {
    setCurrentLocation(loc);
  };

  const handleRefreshLocation = () => {
    setIsUpdatingLocation(true);
    setTimeout(() => {
      setIsUpdatingLocation(false);
    }, 900);
  };

  const handleSaveAssessment = (newResult: AMSAssessmentResult) => {
    setAmsResult(newResult);
    // Also append an entry to travel logs if appropriate
    const newEntry: TravelLogEntry = {
      id: `log-${Date.now()}`,
      locationName: newResult.locationAtTest,
      altitudeMeters: newResult.altitudeAtTest,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amsScore: newResult.score,
      spO2: healthSnapshot.currentSpO2,
      heartRate: healthSnapshot.restingHeartRate,
      notes: newResult.isAMS
        ? 'Assessed with Lake Louise AMS symptoms.'
        : 'Assessed with healthy Lake Louise response.',
      symptoms: newResult.hasHeadache ? ['Altitude Headache'] : [],
      acclimatizationState: newResult.score >= 5 ? 'Needed Rest Day' : newResult.score >= 3 ? 'Mild Discomfort' : 'Good'
    };
    setTravelLogs((prev) => [newEntry, ...prev.filter((p) => p.locationName !== newResult.locationAtTest)]);
  };

  const handleAddHydration = () => {
    setHealthSnapshot((prev) => ({
      ...prev,
      hydrationLiters: Math.min(prev.hydrationGoalLiters + 2, +(prev.hydrationLiters + 0.25).toFixed(2))
    }));
  };

  const handleSaveVitals = (updated: Partial<HealthSnapshot>) => {
    setHealthSnapshot((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveEmergencyContact = (name: string, phone: string) => {
    setHealthSnapshot((prev) => ({
      ...prev,
      emergencyContactName: name,
      emergencyContactPhone: phone
    }));
  };

  const handleAddTravelLog = (entry: TravelLogEntry) => {
    setTravelLogs((prev) => [entry, ...prev]);
  };

  const handleUpdateQuestScore = (punyaGain: number, paapGain: number, nextLevel: number) => {
    setPunyaPoints((prev) => prev + punyaGain);
    setPaapPoints((prev) => prev + paapGain);
    setQuestLevel(nextLevel);
  };

  const handleOpenAchievementsCategory = (category: 'badges' | 'trekking' | 'health') => {
    setInitialQuestTab('badges');
    setCurrentTab('rishi-quest');
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center selection:bg-emerald-500 selection:text-white">
      {/* Picturesque Alpine Forest Backdrop (Matching image.png!) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/src/assets/images/himalayan_forest_backdrop_1790863272005.jpg"
          alt="Himalayan Pine Forest Backdrop"
          className="w-full h-full object-cover opacity-75 filter blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-950/60" />
      </div>

      {/* Top Floating Controls Bar */}
      <div className="fixed top-2.5 z-40 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg text-xs text-white">
        <span className="font-display font-bold tracking-tight text-emerald-400 flex items-center gap-1.5">
          <span>🏔️</span> AltitudeCare
        </span>
        <span className="opacity-40">|</span>
        <button
          onClick={() => setIsFramedView(!isFramedView)}
          className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
          title="Toggle Mobile Phone Mockup Frame"
        >
          {isFramedView ? (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
        <span className="opacity-40">|</span>
        <button
          onClick={() => setIsSOSOpen(true)}
          className="flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 transition-colors animate-pulse"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SOS</span>
        </button>
      </div>

      {/* Main Container: Mobile Frame or Full View */}
      <main
        className={`relative z-10 w-full transition-all duration-300 my-auto ${
          isFramedView
            ? 'max-w-[410px] my-10 h-[844px] rounded-[48px] ring-[12px] ring-slate-900/90 shadow-2xl shadow-black/80 overflow-hidden flex flex-col bg-slate-50'
            : 'max-w-md min-h-screen bg-slate-50 shadow-2xl flex flex-col'
        }`}
      >
        {/* Smartphone Speaker Ear Notch (Only when framed) */}
        {isFramedView && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-700 rounded-full" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-2" />
          </div>
        )}

        {/* Scrollable View Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          {currentTab === 'home' && (
            <HomeView
              location={currentLocation}
              availableLocations={HIMALAYAN_LOCATIONS}
              onSelectLocation={handleSelectLocation}
              onRefreshLocation={handleRefreshLocation}
              isUpdatingLocation={isUpdatingLocation}
              healthSnapshot={healthSnapshot}
              amsResult={amsResult}
              newsArticles={NEWS_ARTICLES}
              travelLogs={travelLogs}
              punyaPoints={punyaPoints}
              paapPoints={paapPoints}
              questLevel={questLevel}
              leaderboardRank={14}
              badgesCount={3}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenHapeHaceInfo={() => setIsHapeHaceOpen(true)}
              onRetakeAssessment={() => setCurrentTab('physiology')}
              onOpenEmergencyContacts={() => setIsContactSetupOpen(true)}
              onOpenVitalsLog={() => setIsVitalsLogOpen(true)}
              onAddHydration={handleAddHydration}
              onOpenYoga={() => setCurrentTab('exercise')}
              onOpenBreathingPacer={() => setIsBreathingPacerOpen(true)}
              onOpenTravelDiary={() => setCurrentTab('travel-diary')}
              onOpenQuest={() => {
                setInitialQuestTab('quest');
                setCurrentTab('rishi-quest');
              }}
              onOpenAchievements={handleOpenAchievementsCategory}
              onExploreZoneDetails={() => setIsZoneDetailsOpen(true)}
            />
          )}

          {currentTab === 'physiology' && (
            <PhysiologyView
              currentLocation={currentLocation}
              initialResult={amsResult}
              onSaveAssessment={handleSaveAssessment}
              onTriggerSOS={() => setIsSOSOpen(true)}
            />
          )}

          {currentTab === 'exercise' && (
            <ExerciseView
              onStartBreathingPacer={() => setIsBreathingPacerOpen(true)}
              streakDays={streakDays}
              wellnessScore={wellnessScore}
            />
          )}

          {currentTab === 'travel-diary' && (
            <TravelDiaryView
              currentLocation={currentLocation}
              travelLogs={travelLogs}
              onAddTravelLog={handleAddTravelLog}
            />
          )}

          {currentTab === 'rishi-quest' && (
            <RishiQuestView
              punya={punyaPoints}
              paap={paapPoints}
              questLevel={questLevel}
              onUpdateScore={handleUpdateQuestScore}
              initialTab={initialQuestTab}
            />
          )}
        </div>

        {/* Persistent Bottom Tab Bar */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onTriggerSOS={() => setIsSOSOpen(true)}
        />
      </main>

      {/* MODALS */}
      {isSOSOpen && (
        <EmergencySOSModal
          location={currentLocation}
          healthSnapshot={healthSnapshot}
          onClose={() => setIsSOSOpen(false)}
        />
      )}

      {isBreathingPacerOpen && (
        <BreathingPacerModal
          onClose={() => setIsBreathingPacerOpen(false)}
          onFinishSession={() => {
            setStreakDays((s) => s + 1);
            setWellnessScore((w) => Math.min(100, w + 2));
            setPunyaPoints((p) => p + 10);
          }}
        />
      )}

      {isHapeHaceOpen && (
        <HapeHaceModal
          onClose={() => setIsHapeHaceOpen(false)}
          onTriggerSOS={() => setIsSOSOpen(true)}
        />
      )}

      {isNotificationsOpen && (
        <NotificationModal onClose={() => setIsNotificationsOpen(false)} />
      )}

      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          altitudeUnit={altitudeUnit}
          onToggleAltitudeUnit={() =>
            setAltitudeUnit((u) => (u === 'meters' ? 'feet' : 'meters'))
          }
        />
      )}

      {isVitalsLogOpen && (
        <VitalsQuickLogModal
          snapshot={healthSnapshot}
          onSaveVitals={handleSaveVitals}
          onClose={() => setIsVitalsLogOpen(false)}
        />
      )}

      {isContactSetupOpen && (
        <EmergencyContactSetupModal
          snapshot={healthSnapshot}
          onSaveContacts={handleSaveEmergencyContact}
          onClose={() => setIsContactSetupOpen(false)}
        />
      )}

      {isZoneDetailsOpen && (
        <AltitudeZoneModal onClose={() => setIsZoneDetailsOpen(false)} />
      )}
    </div>
  );
}
