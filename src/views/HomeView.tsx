import React from 'react';
import { Header } from '../components/Header';
import { LocationCard } from '../components/LocationCard';
import { AltitudeAlertCard } from '../components/AltitudeAlertCard';
import { NewsCarousel } from '../components/NewsCarousel';
import { HealthSnapshotCard } from '../components/HealthSnapshotCard';
import { AmsAssessmentCard } from '../components/AmsAssessmentCard';
import { AltitudeZoneExplorer } from '../components/AltitudeZoneExplorer';
import { ExerciseWellnessCard } from '../components/ExerciseWellnessCard';
import { TravelDiarySummaryCard } from '../components/TravelDiarySummaryCard';
import { RishiMountainQuestCard } from '../components/RishiMountainQuestCard';
import { AchievementsCard } from '../components/AchievementsCard';
import {
  LocationData,
  HealthSnapshot,
  AMSAssessmentResult,
  TravelLogEntry,
  NewsArticle
} from '../types';

interface HomeViewProps {
  location: LocationData;
  availableLocations: LocationData[];
  onSelectLocation: (loc: LocationData) => void;
  onRefreshLocation: () => void;
  isUpdatingLocation: boolean;
  healthSnapshot: HealthSnapshot;
  amsResult: AMSAssessmentResult;
  newsArticles: NewsArticle[];
  travelLogs: TravelLogEntry[];
  punyaPoints: number;
  paapPoints: number;
  questLevel: number;
  leaderboardRank: number;
  badgesCount: number;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenHapeHaceInfo: () => void;
  onRetakeAssessment: () => void;
  onOpenEmergencyContacts: () => void;
  onOpenVitalsLog: () => void;
  onAddHydration: () => void;
  onOpenYoga: () => void;
  onOpenBreathingPacer: () => void;
  onOpenTravelDiary: () => void;
  onOpenQuest: () => void;
  onOpenAchievements: (category: 'badges' | 'trekking' | 'health') => void;
  onExploreZoneDetails: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  location,
  availableLocations,
  onSelectLocation,
  onRefreshLocation,
  isUpdatingLocation,
  healthSnapshot,
  amsResult,
  newsArticles,
  travelLogs,
  punyaPoints,
  paapPoints,
  questLevel,
  leaderboardRank,
  badgesCount,
  onOpenNotifications,
  onOpenSettings,
  onOpenHapeHaceInfo,
  onRetakeAssessment,
  onOpenEmergencyContacts,
  onOpenVitalsLog,
  onAddHydration,
  onOpenYoga,
  onOpenBreathingPacer,
  onOpenTravelDiary,
  onOpenQuest,
  onOpenAchievements,
  onExploreZoneDetails
}) => {
  // Highest altitude in travel logs
  const highestAltitude = Math.max(
    ...travelLogs.map((l) => l.altitudeMeters),
    location.altitudeMeters
  );

  return (
    <div className="space-y-3.5 pb-20">
      {/* Top Header matching user mockup */}
      <Header
        onOpenNotifications={onOpenNotifications}
        onOpenSettings={onOpenSettings}
        unreadCount={2}
      />

      <div className="px-3.5 space-y-3.5">
        {/* 1. Location Card with Altitude and Weather */}
        <LocationCard
          location={location}
          availableLocations={availableLocations}
          onSelectLocation={onSelectLocation}
          onRefreshLocation={onRefreshLocation}
          isUpdating={isUpdatingLocation}
        />

        {/* 2. Altitude Health Alert Card */}
        <AltitudeAlertCard
          location={location}
          amsResult={amsResult}
          onOpenHapeHaceInfo={onOpenHapeHaceInfo}
        />

        {/* 3. Latest News Carousel */}
        <NewsCarousel articles={newsArticles} />

        {/* 4. Health Snapshot */}
        <HealthSnapshotCard
          snapshot={healthSnapshot}
          onOpenEmergencyContacts={onOpenEmergencyContacts}
          onOpenVitalsLog={onOpenVitalsLog}
          onAddHydration={onAddHydration}
        />

        {/* 5. AMS Assessment Card */}
        <AmsAssessmentCard
          result={amsResult}
          onRetakeAssessment={onRetakeAssessment}
        />

        {/* 6. Altitude Zone Explorer */}
        <AltitudeZoneExplorer
          currentAltitude={location.altitudeMeters}
          oxygenPercentage={location.oxygenPercentage}
          onExploreZoneDetails={onExploreZoneDetails}
        />

        {/* 7. Exercise & Wellness Card */}
        <ExerciseWellnessCard
          onOpenYoga={onOpenYoga}
          onOpenBreathingPacer={onOpenBreathingPacer}
          streakDays={12}
          wellnessScore={88}
        />

        {/* 8. Travel Diary Summary */}
        <TravelDiarySummaryCard
          placesCount={travelLogs.length}
          highestAltitude={highestAltitude}
          healthLogsCount={15}
          badgesCount={badgesCount}
          onOpenTravelDiary={onOpenTravelDiary}
        />

        {/* 9. Rishi's Mountain Quest */}
        <RishiMountainQuestCard
          punya={punyaPoints}
          paap={paapPoints}
          level={questLevel}
          rank={leaderboardRank}
          onOpenQuest={onOpenQuest}
        />

        {/* 10. Achievements */}
        <AchievementsCard onOpenCategory={onOpenAchievements} />
      </div>
    </div>
  );
};
