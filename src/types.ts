export type AltitudeRisk = 'Normal' | 'Moderate' | 'High' | 'Severe';

export interface LocationData {
  id: string;
  name: string;
  region: string;
  country: string;
  altitudeMeters: number;
  altitudeFeet: number;
  temperatureC: number;
  weatherCondition: string;
  weatherIcon: 'sun' | 'cloud' | 'snow' | 'cloud-rain';
  oxygenPercentage: number; // percentage of sea level oxygen
  riskLevel: AltitudeRisk;
  acclimatizationAdvice: string;
  nearestClinic: string;
  clinicDistanceKm: number;
}

export interface LakeLouiseAnswers {
  headache: number; // 0 - 3
  gastrointestinal: number; // 0 - 3
  fatigue: number; // 0 - 3
  dizziness: number; // 0 - 3
  functionalImpairment: number; // 0 - 3
}

export interface AMSAssessmentResult {
  id: string;
  date: string;
  score: number;
  maxScore: number;
  answers: LakeLouiseAnswers;
  riskLevel: AltitudeRisk;
  hasHeadache: boolean;
  isAMS: boolean;
  hapeRisk: boolean;
  haceRisk: boolean;
  recommendations: string[];
  altitudeAtTest: number;
  locationAtTest: string;
}

export interface HealthSnapshot {
  bloodGroup: string;
  profileCompletion: number;
  fitnessLevel: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  lastUpdated: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  currentSpO2: number;
  restingHeartRate: number;
  hydrationLiters: number;
  hydrationGoalLiters: number;
  dailySteps: number;
  stepsGoal: number;
  sleepHours: number;
}

export interface TravelLogEntry {
  id: string;
  locationName: string;
  altitudeMeters: number;
  date: string;
  amsScore: number;
  spO2: number;
  heartRate: number;
  notes: string;
  symptoms: string[];
  acclimatizationState: 'Good' | 'Mild Discomfort' | 'Needed Rest Day';
}

export interface QuizQuestion {
  id: number;
  level: number;
  mountainStation: string;
  question: string;
  options: string[];
  correctIndex: number;
  punyaReward: number;
  rishiTip: string;
  explanation: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  punya: number;
  streakDays: number;
  highestAltitude: number;
  badgeTitle: string;
  isCurrentUser?: boolean;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  category: 'badges' | 'trekking' | 'health';
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
  progress?: number;
  maxProgress?: number;
}

export interface YogaPose {
  id: string;
  sanskritName: string;
  englishName: string;
  category: 'Pranayama' | 'Restorative' | 'Oxygenation' | 'Circulation';
  recommendedAltitude: string;
  durationMinutes: number;
  breathingRatio?: string; // e.g., "4-4-4-4" or "Inhale 4s, Exhale 6s"
  description: string;
  steps: string[];
  precautions: string[];
  altitudeBenefits: string[];
  illustrationType: 'pranayama' | 'child' | 'cobra' | 'wall-legs' | 'mountain';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Weather Alert' | 'Health Tips' | 'Trek News' | 'Safety';
  summary: string;
  content: string;
  readTime: string;
  date: string;
  source: string;
}
