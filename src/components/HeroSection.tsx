import React from 'react';
import { Clapperboard, Coffee, MessageSquare, Play, Sparkles, Ticket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HERO_ASSET } from '../data/movieClubData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenFilmDetails: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onOpenFilmDetails,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero-section"
      className="scroll-mt-16 sm:scroll-mt-20 relative min-h-[460px] sm:min-h-[500px] lg:min-h-[580px] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Cinematic Image with warm cafe tones */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_ASSET}
          alt="Movie Club Cafe Conversation"
          className="w-full h-full object-cover object-[center_30%] sm:object-center"
        />
        {/* Cinematic atmospheric overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#141211]/85 to-[#121110]/75" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#121110]/50 to-[#121110]/95" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 text-center flex flex-col items-center w-full">
        {/* Top Concept Badge */}
        <div
          id="hero-concept-badge"
          className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#241f1c]/90 border border-[#e59b67]/30 text-[#f0dfd1] text-[11px] sm:text-xs font-medium mb-3 sm:mb-4 shadow-md backdrop-blur-sm"
        >
          <Clapperboard className="w-3.5 h-3.5 text-[#e59b67] shrink-0" />
          <span>{t('hero.badge')}</span>
        </div>

        {/* Main Headline */}
        <h1
          id="hero-main-title"
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#fdfbf7] leading-[1.22] sm:leading-[1.18] mb-3 sm:mb-4 max-w-3xl"
        >
          <span>{t('hero.title_line1')}</span>
          <br />
          <span className="text-[#e59b67] font-black">{t('hero.title_line2')}</span>
        </h1>

        {/* Subtitle / Description */}
        <p
          id="hero-description-text"
          className="text-xs sm:text-base lg:text-lg text-[#d4c8be] max-w-2xl mx-auto font-normal leading-relaxed mb-4 sm:mb-5 px-1 sm:px-0"
        >
          {t('hero.desc')}
        </p>

        {/* 3 Core Experience Pillars (Film • Café • Conversation) - quiet and compact on mobile */}
        <div
          id="hero-core-pillars"
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-3 sm:mb-4 w-full"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#1c1917]/70 sm:bg-[#1c1917]/85 border border-white/10 text-[11px] sm:text-sm text-[#ded3c5] sm:text-[#e8ded2] backdrop-blur-sm">
            <Clapperboard className="w-3 h-3 sm:w-4 sm:h-4 text-[#e59b67] shrink-0" />
            <span>{t('hero.pill_film')}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#1c1917]/70 sm:bg-[#1c1917]/85 border border-white/10 text-[11px] sm:text-sm text-[#ded3c5] sm:text-[#e8ded2] backdrop-blur-sm">
            <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-[#e59b67] shrink-0" />
            <span>{t('hero.pill_cafe')}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#1c1917]/70 sm:bg-[#1c1917]/85 border border-white/10 text-[11px] sm:text-sm text-[#ded3c5] sm:text-[#e8ded2] backdrop-blur-sm">
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-[#e59b67] shrink-0" />
            <span>{t('hero.pill_convo')}</span>
          </div>
        </div>

        {/* Single clear reassurance badge - secondary & warm */}
        <div
          id="hero-single-reassurance"
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-[#bdafa2] sm:text-[#d4c8be] mb-5 sm:mb-6 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 max-w-full text-center leading-relaxed"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e59b67] shrink-0" />
          <span>{t('hero.reassurance_badge')}</span>
        </div>

        {/* Action Buttons */}
        <div id="hero-cta-buttons" className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-none">
          <button
            id="hero-primary-cta"
            onClick={onOpenReservation}
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#c27847]/30 hover:shadow-[#c27847]/45 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t('hero.cta_primary')}</span>
          </button>

          <button
            id="hero-secondary-cta"
            onClick={onOpenFilmDetails}
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black/40 hover:bg-white/10 text-[#f5f1eb] hover:text-white text-sm sm:text-base font-medium border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#e59b67] fill-[#e59b67]" />
            <span>{t('hero.cta_secondary')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
