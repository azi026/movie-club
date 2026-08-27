import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Film,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CURRENT_GATHERING, CURRENT_MOVIE } from '../data/movieClubData';

interface FilmDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const FilmDetailsModal: React.FC<FilmDetailsModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'vocab'>('overview');

  if (!isOpen) return null;

  return (
    <div
      id="film-details-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="film-details-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#181614] text-[#fdfbf7] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Banner with Film Still */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden">
          <img
            src={CURRENT_MOVIE.image}
            alt={CURRENT_MOVIE.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-[#181614]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Film Title on Banner */}
          <div className="absolute bottom-4 right-6 left-6 flex justify-between items-end">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-[#c27847] text-white text-[11px] font-bold">
                {t('film.badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-widest mt-1">
                {CURRENT_MOVIE.title}
              </h2>
              <p className="text-sm font-medium text-[#e59b67]">
                {lang === 'fa' ? CURRENT_MOVIE.titleFa : CURRENT_MOVIE.title} ({CURRENT_MOVIE.year})
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#d1c8be] bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-[#e59b67]" />
              <span>{lang === 'fa' ? CURRENT_MOVIE.durationFa : CURRENT_MOVIE.duration}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-[#1f1b18]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#c27847] text-[#e59b67]'
                : 'border-transparent text-[#9c8e82] hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{lang === 'fa' ? 'درباره فیلم' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'questions'
                ? 'border-[#c27847] text-[#e59b67]'
                : 'border-transparent text-[#9c8e82] hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'fa' ? 'سوالات گفتگو' : 'Discussion Prompts'}</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'vocab'
                ? 'border-[#c27847] text-[#e59b67]'
                : 'border-transparent text-[#9c8e82] hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'fa' ? 'واژگان کلیدی' : 'Vocabulary'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-right">
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-[#e59b67] mb-2">
                  {lang === 'fa' ? 'خلاصه داستان' : 'Synopsis'}
                </h4>
                <p className="text-sm sm:text-base text-[#d9cebf] leading-relaxed">
                  {lang === 'fa' ? CURRENT_MOVIE.synopsisFa : CURRENT_MOVIE.synopsis}
                </p>
              </div>

              {/* Meta Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#231f1c] border border-white/5 text-center text-xs">
                <div>
                  <span className="text-[#8e7f72] block">{t('film.director')}</span>
                  <span className="font-semibold text-white mt-1 block">
                    {lang === 'fa' ? CURRENT_MOVIE.directorFa : CURRENT_MOVIE.director}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e7f72] block">{t('film.genre')}</span>
                  <span className="font-semibold text-white mt-1 block">
                    {lang === 'fa' ? CURRENT_MOVIE.genreFa : CURRENT_MOVIE.genre}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e7f72] block">{t('film.duration')}</span>
                  <span className="font-semibold text-white mt-1 block">
                    {lang === 'fa' ? CURRENT_MOVIE.durationFa : CURRENT_MOVIE.duration}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e7f72] block">{t('film.year')}</span>
                  <span className="font-semibold text-white mt-1 block">
                    {CURRENT_MOVIE.year}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#2b241f] border border-[#c27847]/30 text-xs sm:text-sm text-[#f0e3d5] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#e59b67] shrink-0" />
                <span>
                  {lang === 'fa'
                    ? 'این فیلم با ریتمی آرام، فضایی عالی برای گفتگو درباره سرنوشت، هویت و تصمیم‌های زندگی فراهم می‌کند.'
                    : 'A beautifully paced film offering wonderful touchpoints to discuss fate, identity, and pivotal life decisions.'}
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Discussion Prompts */}
          {activeTab === 'questions' && (
            <div className="space-y-3">
              <p className="text-xs text-[#a8998c] mb-2">
                {lang === 'fa'
                  ? 'این‌ها چند نمونه از سوالاتی هستند که در کافه درباره‌شان صحبت خواهیم کرد:'
                  : 'Here are sample prompts we will explore together at the café:'}
              </p>

              {CURRENT_MOVIE.discussionQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#221e1a] border border-white/5 space-y-2 hover:border-[#c27847]/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#c27847]/20 text-[#e59b67] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h5 className="text-sm font-semibold text-white">
                      {lang === 'fa' ? q.fa : q.en}
                    </h5>
                  </div>
                  <p className="text-xs text-[#9e8f81] italic pr-8" dir="ltr">
                    "{q.en}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Vocabulary */}
          {activeTab === 'vocab' && (
            <div className="space-y-3">
              <p className="text-xs text-[#a8998c] mb-2">
                {lang === 'fa'
                  ? 'واژه‌ها و اصطلاحات کاربردی برای تسلط بیشتر در مکالمه:'
                  : 'Key terms and idioms to enrich your speaking:'}
              </p>

              {CURRENT_MOVIE.vocabulary.map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#221e1a] border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#e59b67] text-sm sm:text-base font-cinzel">
                      {v.term}
                    </span>
                    {v.phonetic && (
                      <span className="text-xs font-mono text-[#8a7b6f]">
                        {v.phonetic}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#ded3c5]">
                    {lang === 'fa' ? v.definitionFa : v.definitionEn}
                  </p>
                  <p className="text-xs text-[#9e8f81] italic pt-1 border-t border-white/5" dir="ltr">
                    "{v.example}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#1f1b18] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#a39487]">
            <Calendar className="w-4 h-4 text-[#e59b67]" />
            <span>
              {lang === 'fa' ? CURRENT_GATHERING.dateFa : CURRENT_GATHERING.dateEn} • {CURRENT_GATHERING.time}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenReservation();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <Ticket className="w-4 h-4" />
            <span>{t('hero.cta_primary')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
