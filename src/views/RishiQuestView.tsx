import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle,
  XCircle,
  HelpCircle,
  ChevronRight,
  Flame,
  ArrowRight,
  Shield,
  RotateCcw
} from 'lucide-react';
import { QuizQuestion, LeaderboardUser, BadgeItem } from '../types';
import { QUIZ_QUESTIONS, LEADERBOARD_USERS, BADGES_LIST } from '../data/mockData';

interface RishiQuestViewProps {
  punya: number;
  paap: number;
  questLevel: number;
  onUpdateScore: (punyaGain: number, paapGain: number, nextLevel: number) => void;
  initialTab?: 'quest' | 'leaderboard' | 'badges';
}

export const RishiQuestView: React.FC<RishiQuestViewProps> = ({
  punya,
  paap,
  questLevel,
  onUpdateScore,
  initialTab = 'quest'
}) => {
  const [activeTab, setActiveTab] = useState<'quest' | 'leaderboard' | 'badges'>(initialTab);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(
    Math.min(questLevel - 1, QUIZ_QUESTIONS.length - 1)
  );

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | null>(null);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[selectedQuestionIndex] || QUIZ_QUESTIONS[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      setFeedbackType('correct');
      const nextLevel = Math.max(questLevel, currentQ.level + 1);
      onUpdateScore(currentQ.punyaReward, 0, nextLevel);
    } else {
      setFeedbackType('incorrect');
      onUpdateScore(0, 1, questLevel);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setFeedbackType(null);
    if (selectedQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setSelectedQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-lg mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Gamified Mountain Health
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Rishi's Mountain Quest
          </h2>
        </div>

        {/* Punya & Paap counters */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs" />
            <span className="text-xs font-mono font-bold text-amber-800">
              {punya}
            </span>
          </div>
          <div className="bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl flex items-center gap-1 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-700 shadow-xs" />
            <span className="text-xs font-mono font-bold text-rose-800">
              {paap}
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="flex p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('quest')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'quest'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Mountain Trail
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'badges'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Badges & Honors
        </button>
      </div>

      {/* TAB 1: MOUNTAIN TRAIL QUEST */}
      {activeTab === 'quest' && (
        <div className="space-y-4">
          {/* Mountain Map Trail Progression Ribbon */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">
                Himalayan Peak Journey
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">
                Level {questLevel} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Interactive mountain waypoint line */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-2 px-1">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isUnlocked = idx + 1 <= questLevel;
                const isCurrent = idx === selectedQuestionIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      if (isUnlocked) {
                        setSelectedQuestionIndex(idx);
                        setSelectedOption(null);
                        setIsAnswerSubmitted(false);
                        setFeedbackType(null);
                      }
                    }}
                    disabled={!isUnlocked}
                    className={`flex flex-col items-center flex-shrink-0 group transition-transform ${
                      isUnlocked ? 'cursor-pointer active:scale-95' : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-all ${
                        isCurrent
                          ? 'bg-emerald-700 text-white ring-2 ring-emerald-400 ring-offset-2'
                          : isUnlocked
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[9px] font-medium text-slate-500 mt-1 max-w-[50px] truncate text-center">
                      {q.mountainStation.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rishi Sage Guidance Card */}
          <div className="relative rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50/70 to-emerald-50 p-4 border border-amber-200/80 shadow-xs flex items-start gap-3.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-amber-300 shadow-sm flex-shrink-0 bg-white">
              <img
                src="/src/assets/images/rishi_sage_character_1790863286592.jpg"
                alt="Rishi Sage"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-amber-900">
                  Rishi's Wisdom
                </span>
                <span className="text-[10px] bg-amber-200/70 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                  Station {currentQ.level}
                </span>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{currentQ.rishiTip}"
              </p>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3.5">
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>{currentQ.mountainStation}</span>
                <span className="font-bold text-amber-600 font-mono">
                  +{currentQ.punyaReward} Punya
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-100 border-rose-500 text-rose-900 line-through';
                  } else {
                    optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit / Next Action */}
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-sm transition-all"
              >
                Submit Answer to Rishi
              </button>
            ) : (
              <div className="space-y-3 pt-2">
                {feedbackType === 'correct' ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Wonderful Wisdom! +{currentQ.punyaReward} Punya Earned!
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      {currentQ.explanation}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Paap Recorded! Learn from this mountain lesson:
                    </p>
                    <p className="text-[11px] text-rose-800">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Continue Mountain Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Himalayan Trailblazers Leaderboard</span>
              </h3>
              <span className="text-[10px] text-slate-400">Weekly Refresh</span>
            </div>

            <div className="space-y-2">
              {LEADERBOARD_USERS.map((user) => (
                <div
                  key={user.rank}
                  className={`p-3 rounded-xl flex items-center justify-between gap-3 text-xs ${
                    user.isCurrentUser
                      ? 'bg-emerald-50 border border-emerald-300 font-bold'
                      : 'bg-slate-50 border border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 text-center font-mono font-bold ${
                        user.rank === 1
                          ? 'text-amber-500'
                          : user.rank === 2
                          ? 'text-slate-400'
                          : user.rank === 3
                          ? 'text-amber-700'
                          : 'text-slate-600'
                      }`}
                    >
                      #{user.rank}
                    </span>
                    <span className="text-lg">{user.avatar}</span>
                    <div>
                      <h4 className="font-semibold text-slate-800">{user.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        {user.badgeTitle} · {user.highestAltitude}m
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-amber-700 font-mono block">
                      {user.punya} Punya
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {user.streakDays} day streak
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BADGES & HONORS */}
      {activeTab === 'badges' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Mountain Health Honors & Badges</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700">
                3 / 5 Unlocked
              </span>
            </div>

            <div className="space-y-2.5">
              {BADGES_LIST.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border flex items-start gap-3 text-xs transition-all ${
                    badge.unlocked
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-slate-50/50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {badge.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800">
                        {badge.title}
                      </h4>
                      {badge.unlocked ? (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[9px] font-medium text-slate-500">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {badge.description}
                    </p>

                    {!badge.unlocked && badge.progress && badge.maxProgress && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                          <span>Progress</span>
                          <span>{badge.progress} / {badge.maxProgress}</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{
                              width: `${(badge.progress / badge.maxProgress) * 100}%`
                            }}
                            className="bg-emerald-600 h-full rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
