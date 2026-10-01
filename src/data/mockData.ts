import {
  LocationData,
  HealthSnapshot,
  AMSAssessmentResult,
  TravelLogEntry,
  QuizQuestion,
  LeaderboardUser,
  BadgeItem,
  YogaPose,
  NewsArticle
} from '../types';

export const HIMALAYAN_LOCATIONS: LocationData[] = [
  {
    id: 'namche-bazaar',
    name: 'Namche Bazaar',
    region: 'Khumbu, Sagarmatha',
    country: 'Nepal',
    altitudeMeters: 3440,
    altitudeFeet: 11286,
    temperatureC: 12,
    weatherCondition: 'Clear & Crisp Alpine',
    weatherIcon: 'sun',
    oxygenPercentage: 67,
    riskLevel: 'Moderate',
    acclimatizationAdvice: 'Stay hydrated (3-4L daily). Spend at least 2 nights here before ascending further.',
    nearestClinic: 'Namche Dental & Medical Post',
    clinicDistanceKm: 0.4
  },
  {
    id: 'dingboche',
    name: 'Dingboche',
    region: 'Chukhung Valley',
    country: 'Nepal',
    altitudeMeters: 4410,
    altitudeFeet: 14468,
    temperatureC: 4,
    weatherCondition: 'Chilly Mist & Mountain Wind',
    weatherIcon: 'cloud',
    oxygenPercentage: 58,
    riskLevel: 'High',
    acclimatizationAdvice: 'Mandatory acclimatization rest day. Climb high to Nagarjun Peak and sleep low.',
    nearestClinic: 'Pheriche HRA Medical Clinic',
    clinicDistanceKm: 3.2
  },
  {
    id: 'gorakshep',
    name: 'Gorak Shep',
    region: 'Khumbu Glacier',
    country: 'Nepal',
    altitudeMeters: 5164,
    altitudeFeet: 16942,
    temperatureC: -3,
    weatherCondition: 'Freezing Glacier Gale',
    weatherIcon: 'snow',
    oxygenPercentage: 53,
    riskLevel: 'Severe',
    acclimatizationAdvice: 'Extremely thin air. Limit sleep duration to 1-2 nights. Watch for ataxia or persistent cough.',
    nearestClinic: 'Everest ER (Spring Season) / Pheriche HRA',
    clinicDistanceKm: 6.8
  },
  {
    id: 'leh-ladakh',
    name: 'Leh Ladakh',
    region: 'Indus Valley',
    country: 'India',
    altitudeMeters: 3524,
    altitudeFeet: 11562,
    temperatureC: 14,
    weatherCondition: 'Dry High-Desert Sun',
    weatherIcon: 'sun',
    oxygenPercentage: 66,
    riskLevel: 'Moderate',
    acclimatizationAdvice: 'Strict 48-hour rest after flying in directly. Drink butter tea and avoid exertion on Day 1.',
    nearestClinic: 'SNM District Hospital Leh',
    clinicDistanceKm: 1.2
  },
  {
    id: 'kathmandu',
    name: 'Kathmandu Valley',
    region: 'Bagmati',
    country: 'Nepal',
    altitudeMeters: 1400,
    altitudeFeet: 4593,
    temperatureC: 22,
    weatherCondition: 'Warm Valley Breeze',
    weatherIcon: 'sun',
    oxygenPercentage: 86,
    riskLevel: 'Normal',
    acclimatizationAdvice: 'Safe base altitude. Great for physical prep and cardiovascular warm-up.',
    nearestClinic: 'CIWEC Hospital & Travel Clinic',
    clinicDistanceKm: 2.1
  }
];

export const INITIAL_HEALTH_SNAPSHOT: HealthSnapshot = {
  bloodGroup: 'A+',
  profileCompletion: 85,
  fitnessLevel: 'Good',
  lastUpdated: '1 hour ago',
  emergencyContactName: 'Dr. Tsering Sherpa',
  emergencyContactPhone: '+977-9801234567',
  currentSpO2: 91,
  restingHeartRate: 78,
  hydrationLiters: 2.8,
  hydrationGoalLiters: 4.0,
  dailySteps: 8420,
  stepsGoal: 10000,
  sleepHours: 7.2
};

export const INITIAL_AMS_RESULT: AMSAssessmentResult = {
  id: 'ams-001',
  date: 'Today, 08:30 AM',
  score: 1,
  maxScore: 15,
  answers: {
    headache: 1, // Mild
    gastrointestinal: 0,
    fatigue: 0,
    dizziness: 0,
    functionalImpairment: 0
  },
  riskLevel: 'Moderate',
  hasHeadache: true,
  isAMS: false, // In Lake Louise 2018, AMS requires headache + total score >= 3
  hapeRisk: false,
  haceRisk: false,
  recommendations: [
    'Drink 500ml water with electrolytes',
    'Rest at current elevation before gaining further altitude',
    'Monitor headache after 2 hours'
  ],
  altitudeAtTest: 3440,
  locationAtTest: 'Namche Bazaar'
};

export const INITIAL_TRAVEL_LOGS: TravelLogEntry[] = [
  {
    id: 'log-1',
    locationName: 'Namche Bazaar',
    altitudeMeters: 3440,
    date: 'Oct 27, 2023',
    amsScore: 1,
    spO2: 91,
    heartRate: 78,
    notes: 'Arrived after steep climb up Hillary Bridge. Mild temple headache resolved with warm ginger lemon tea.',
    symptoms: ['Mild Headache'],
    acclimatizationState: 'Good'
  },
  {
    id: 'log-2',
    locationName: 'Phakding',
    altitudeMeters: 2610,
    date: 'Oct 25, 2023',
    amsScore: 0,
    spO2: 96,
    heartRate: 72,
    notes: 'Pleasant downhill and riverside trail from Lukla. Breathing effortless and sleep was restful.',
    symptoms: [],
    acclimatizationState: 'Good'
  },
  {
    id: 'log-3',
    locationName: 'Lukla Tenzing-Hillary',
    altitudeMeters: 2846,
    date: 'Oct 24, 2023',
    amsScore: 0,
    spO2: 95,
    heartRate: 74,
    notes: 'Smooth flight from Kathmandu. Started hydration protocol immediately upon landing.',
    symptoms: [],
    acclimatizationState: 'Good'
  },
  {
    id: 'log-prev-trip',
    locationName: 'Rohtang Pass (Past Expedition)',
    altitudeMeters: 3978,
    date: 'Aug 14, 2023',
    amsScore: 4,
    spO2: 86,
    heartRate: 98,
    notes: 'Ascended too quickly by road. Developed pulsating headache and mild nausea.',
    symptoms: ['Headache', 'Mild Nausea', 'Fatigue'],
    acclimatizationState: 'Needed Rest Day'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    level: 1,
    mountainStation: 'Lukla Trailhead (2,846 m)',
    question: 'What is the golden rule of mountain ascent to prevent Acute Mountain Sickness?',
    options: [
      'Climb as fast as you can to minimize time exposed to thin air',
      'Climb high, sleep low, and ascend gradually',
      'Drink less fluids so your body dries out excess lung fluid',
      'Take sleeping pills to force continuous deep sleep'
    ],
    correctIndex: 1,
    punyaReward: 20,
    rishiTip: 'A true mountain wanderer treats the peaks like an old friend—never rush their sanctuary, climb high during the day but sleep in the lower meadow!',
    explanation: '"Climb High, Sleep Low" gives your body oxygen stimulation during exertion while allowing recovery in denser air at night. Never ascend more than 300-500m per day sleeping altitude above 3000m.'
  },
  {
    id: 2,
    level: 2,
    mountainStation: 'Phakding Pine Groves (2,610 m)',
    question: 'According to the official Lake Louise Scoring System (2018), what symptom is mandatory to diagnose AMS?',
    options: [
      'Severe dry cough with pink frothy sputum',
      'Headache combined with at least one other symptom',
      'Loss of appetite only',
      'Blisters on both feet'
    ],
    correctIndex: 1,
    punyaReward: 20,
    rishiTip: 'The head carries the burden of pressure first! Without a headache, mountain medicine considers it mere fatigue or stomach upset.',
    explanation: 'AMS diagnosis requires the presence of a headache plus a total Lake Louise score of 3 or higher with symptoms like nausea, fatigue, or dizziness.'
  },
  {
    id: 3,
    level: 3,
    mountainStation: 'Namche Bazaar (3,440 m)',
    question: 'How much water should a trekker ideally consume daily at high altitudes?',
    options: [
      '1 to 1.5 Liters',
      '3 to 4.5 Liters with electrolytes',
      'Only warm tea when feeling thirsty',
      'Over 8 Liters to flush out all minerals'
    ],
    correctIndex: 1,
    punyaReward: 20,
    rishiTip: 'In thin dry alpine air, every breath carries away moisture like morning mist. Sip often, keep your water liquid and clear!',
    explanation: 'Rapid breathing in cold dry mountain air causes significant insensible fluid loss. 3 to 4.5 Liters prevents dehydration, which mimics and exacerbates altitude sickness.'
  },
  {
    id: 4,
    level: 4,
    mountainStation: 'Tengboche Monastery (3,860 m)',
    question: 'You notice a trekker staggering like they are intoxicated, unable to walk heel-to-toe. What life-threatening condition is this?',
    options: [
      'Dehydration cramping',
      'High Altitude Cerebral Edema (HACE)',
      'Normal muscle soreness from rocks',
      'Sugar rush from energy bars'
    ],
    correctIndex: 1,
    punyaReward: 25,
    rishiTip: 'When the brain swells from altitude, balance is lost. Hear this warning: Ataxia is an immediate signal to descend down the mountain without delay!',
    explanation: 'Truncal ataxia (loss of balance) is the hallmark warning sign of High Altitude Cerebral Edema (HACE). Immediate descent, dexamethasone, and oxygen are required.'
  },
  {
    id: 5,
    level: 5,
    mountainStation: 'Dingboche Plateau (4,410 m)',
    question: 'Which ancient yogic breathing practice gently balances the nervous system and optimizes alveolar gas exchange?',
    options: [
      'Heavy mouth panting while running',
      'Nadi Shodhana (Alternate Nostril Pranayama)',
      'Holding breath until dizzy',
      'Fast hyperventilation with shoulders tense'
    ],
    correctIndex: 1,
    punyaReward: 25,
    rishiTip: 'Breathe through the sacred channels! When Left (Ida) and Right (Pingala) harmonize, prana flows deeply into the lowest air sacs of your lungs.',
    explanation: 'Nadi Shodhana stimulates the parasympathetic nervous system, lowers resting pulse rate, and promotes deep diaphragmatic oxygenation.'
  },
  {
    id: 6,
    level: 6,
    mountainStation: 'Lobuche Ridge (4,940 m)',
    question: 'What is the most effective and definitive treatment for any severe altitude sickness (HAPE or HACE)?',
    options: [
      'Taking 3 cups of hot black coffee and staying in bed',
      'Immediate descent of at least 500 to 1,000 meters',
      'Taking painkiller pills and continuing up to the summit',
      'Covering yourself in heavy wool blankets without moving'
    ],
    correctIndex: 1,
    punyaReward: 30,
    rishiTip: 'The mountain forgives the wise who step down; it does not forgive pride! When the body fails, turn your boots downhill!',
    explanation: 'Descent is the ultimate cure for severe altitude illness. Even a descent of 300-500 meters can dramatically reverse symptoms and save lives.'
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Pemba Dorje',
    avatar: '🏔️',
    punya: 480,
    streakDays: 28,
    highestAltitude: 5545,
    badgeTitle: 'Himalayan Sherpa Guide'
  },
  {
    rank: 2,
    name: 'Maya Lin',
    avatar: '🦅',
    punya: 420,
    streakDays: 21,
    highestAltitude: 5364,
    badgeTitle: 'Alpine Glider'
  },
  {
    rank: 3,
    name: 'Arjun Sen',
    avatar: '🧘',
    punya: 370,
    streakDays: 16,
    highestAltitude: 4940,
    badgeTitle: 'Prana Master'
  },
  {
    rank: 14,
    name: 'You (Explorer)',
    avatar: '🧭',
    punya: 120,
    streakDays: 12,
    highestAltitude: 4130,
    badgeTitle: 'Khumbu Pioneer',
    isCurrentUser: true
  },
  {
    rank: 15,
    name: 'Elena Rostova',
    avatar: '❄️',
    punya: 110,
    streakDays: 9,
    highestAltitude: 3860,
    badgeTitle: 'Snow Leopard'
  }
];

export const BADGES_LIST: BadgeItem[] = [
  {
    id: 'badge-1',
    title: 'Himalayan Initiate',
    description: 'Completed your first high-altitude health log above 3,000 meters.',
    category: 'badges',
    icon: '🏅',
    unlocked: true,
    dateUnlocked: 'Oct 24, 2023'
  },
  {
    id: 'badge-2',
    title: 'Pranayama Adept',
    description: 'Practiced 5 consecutive guided high-altitude breathing sessions.',
    category: 'health',
    icon: '🧘',
    unlocked: true,
    dateUnlocked: 'Oct 26, 2023'
  },
  {
    id: 'badge-3',
    title: 'Namche Sentinel',
    description: 'Successfully acclimated at 3,440 m with healthy SpO2 and rest.',
    category: 'trekking',
    icon: '🏔️',
    unlocked: true,
    dateUnlocked: 'Oct 27, 2023'
  },
  {
    id: 'badge-4',
    title: 'High Pass Master',
    description: 'Cross 5,000 meters elevation while maintaining stable Lake Louise score.',
    category: 'trekking',
    icon: '⚔️',
    unlocked: false,
    progress: 4130,
    maxProgress: 5000
  },
  {
    id: 'badge-5',
    title: 'Rishi Disciple',
    description: 'Answer 10 Mountain Quest questions correctly and earn 200 Punya.',
    category: 'badges',
    icon: '📿',
    unlocked: false,
    progress: 120,
    maxProgress: 200
  }
];

export const YOGA_POSES: YogaPose[] = [
  {
    id: 'nadi-shodhana',
    sanskritName: 'Nadi Shodhana',
    englishName: 'Alternate Nostril Pranayama',
    category: 'Pranayama',
    recommendedAltitude: 'All Altitudes (up to 5,500m)',
    durationMinutes: 8,
    breathingRatio: '4s Inhale - 4s Retain - 4s Exhale - 4s Empty',
    description: 'A deeply harmonizing breathing technique that balances left and right brain hemispheres, calms tachycardia, and optimizes air distribution in high-altitude conditions.',
    steps: [
      'Sit comfortably in Sukhasana with spine erect and shoulders dropped.',
      'Place your left hand on your knee in Chin Mudra (thumb and index touching).',
      'Bring right hand to your nose in Vishnu Mudra; close right nostril with right thumb.',
      'Inhale slowly and smoothly through the left nostril for 4 counts.',
      'Close left nostril with ring finger and release thumb; exhale smoothly through right nostril for 4 counts.',
      'Inhale through right nostril for 4 counts; switch and exhale through left for 4 counts. This completes 1 round.',
      'Continue for 8-10 soothing cycles without forcing.'
    ],
    precautions: [
      'Never force long breath retentions if dizzy or breathless.',
      'Keep posture upright without slumping your chest.'
    ],
    altitudeBenefits: [
      'Slows resting tachycardia caused by hypoxia',
      'Calms anxiety and mental agitation in thin air',
      'Warms dry, freezing mountain air inside nasal passages'
    ],
    illustrationType: 'pranayama'
  },
  {
    id: 'viparita-karani',
    sanskritName: 'Viparita Karani',
    englishName: 'Legs-Up-The-Wall Restorative Pose',
    category: 'Restorative',
    recommendedAltitude: 'Tea Houses & Camps (2,500m - 4,800m)',
    durationMinutes: 10,
    description: 'A gentle inverted posture that reverses venous blood pooling in tired trekking legs, restores cardiac output, and drains lymphatic congestion after long ascents.',
    steps: [
      'Find a solid wall or bed board in your mountain lodge.',
      'Sit sideways close to the wall, then gently pivot your torso down and swing legs vertically up against the wall.',
      'Rest your arms open by your sides, palms facing up to open chest.',
      'Close your eyes and breathe gently down into your belly for 5 to 10 minutes.'
    ],
    precautions: [
      'Keep a light blanket or sleeping bag over your chest to prevent chill.',
      'Avoid if you have active severe glaucoma or untreated high blood pressure.'
    ],
    altitudeBenefits: [
      'Relieves altitude edema and ankle swelling from trekking boots',
      'Enhances venous return to heart without muscular strain',
      'Promotes deep sleep in cold mountain evenings'
    ],
    illustrationType: 'wall-legs'
  },
  {
    id: 'balasana',
    sanskritName: 'Balasana',
    englishName: 'Child’s Resting Pose with Bolster',
    category: 'Restorative',
    recommendedAltitude: 'All Altitudes',
    durationMinutes: 5,
    description: 'Grounding restorative pose that stretches the lumbar spine, relieves pack strain, and expands the posterior lung fields where oxygen exchange is strongest.',
    steps: [
      'Kneel on your sleeping pad with big toes touching and knees wide apart.',
      'Fold forward slowly, extending your arms forward or resting forehead on a rolled down jacket.',
      'Allow your back ribs to expand with every soft breath.'
    ],
    precautions: [
      'If knees ache in cold weather, tuck a fleece jacket behind your knee creases.'
    ],
    altitudeBenefits: [
      'Mobilizes posterior lung lobes for better ventilation',
      'Releases lower back compression from heavy rucksack'
    ],
    illustrationType: 'child'
  },
  {
    id: 'bhujangasana',
    sanskritName: 'Bhujangasana',
    englishName: 'Gentle Cobra Heart Opener',
    category: 'Oxygenation',
    recommendedAltitude: 'Acclimatization lodges (up to 4,500m)',
    durationMinutes: 4,
    description: 'A mild spinal extension that expands the rib cage, counters the forward slump of uphill trekking, and enhances thoracic capacity.',
    steps: [
      'Lie face down with palms placed under your shoulders.',
      'Press gently through your palms to peel your chest forward and up.',
      'Keep your elbows slightly bent and shoulders away from your ears.',
      'Take 3-5 slow diaphragmatic breaths, then gently lower down.'
    ],
    precautions: [
      'Do not hyperextend your lower back; keep glutes and legs engaged.'
    ],
    altitudeBenefits: [
      'Opens chest wall contracted by cold mountain air',
      'Stimulates abdominal circulation and digestion sluggish at altitude'
    ],
    illustrationType: 'cobra'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Khumbu Alpine Weather: Clear Morning Skies & Early Frost',
    category: 'Weather Alert',
    summary: 'High pressure ridge over Everest region delivers crisp sun, but night temperatures at Namche drop to 2°C.',
    content: 'Trekker weather bulletin: Exceptional visibility across Kongde Ri, Thamserku, and Ama Dablam. Afternoon thermal clouds expected after 2 PM with brisk winds. Maintain layering, windproof shells, and cover water bottles at night to prevent freezing.',
    readTime: '3 min read',
    date: 'Oct 27, 2023',
    source: 'Himalayan Meteorological Center'
  },
  {
    id: 'news-2',
    title: 'Hydration at Altitude: Why Plain Water Is Not Enough',
    category: 'Health Tips',
    summary: 'Recent high-altitude research emphasizes electrolyte balance to prevent hyponatremia during rigorous ascent.',
    content: 'When ascending above 3,000 meters, increased ventilation blows off massive amounts of water vapor and carbon dioxide. Drinking massive amounts of pure water without replenishing sodium, potassium, and magnesium can dilute blood sodium, creating symptoms easily confused with AMS. Carry oral rehydration salts (ORS) or electrolyte tablets on the trail.',
    readTime: '4 min read',
    date: 'Oct 26, 2023',
    source: 'Wilderness Medical Society'
  },
  {
    id: 'news-3',
    title: 'Himalayan Rescue Association: Pheriche Post Fully Staffed',
    category: 'Safety',
    summary: 'Volunteer altitude physicians at 4,240 m offer daily 3 PM acclimatization seminars and hyperbaric chamber care.',
    content: 'The Himalayan Rescue Association (HRA) clinic at Pheriche is active for the autumn climbing season. The clinic features a portable hyperbaric Gamow bag, pulse oximetry diagnostics, and oxygen concentrators. Trekkers experiencing worsening headache, shortness of breath at rest, or ataxia are encouraged to visit or call emergency dispatch.',
    readTime: '2 min read',
    date: 'Oct 25, 2023',
    source: 'HRA Nepal'
  }
];
