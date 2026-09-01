import React from 'react';
import {
  CheckCircle2,
  Coffee,
  Heart,
  HelpCircle,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';
import { BENEFITS } from '../data/movieClubData';

interface MidRowCardsProps {
  onOpenFilmDetails: () => void;
}

export const MidRowCards: React.FC<MidRowCardsProps> = ({ onOpenFilmDetails }) => {
  const { lang, t } = useLanguage();
  const { hasActiveSession, movie } = useSession();

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-4 h-4 text-[#c27847]" />;
      case 'star':
        return <Star className="w-4 h-4 text-[#c27847]" />;
      case 'check-circle-2':
        return <CheckCircle2 className="w-4 h-4 text-[#c27847]" />;
      case 'coffee':
      default:
        return <Coffee className="w-4 h-4 text-[#c27847]" />;
    }
  };

  return (
    <section id="this-week-film" className="scroll-mt-16 sm:scroll-mt-20 w-full py-8 sm:py-11 px-4 sm:px-6 lg:px-8 bg-[#121110]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Card 1: This Week's Film (Col 1-5 on desktop) */}
          {hasActiveSession && movie ? (
            <div
              id="mid-card-this-week-film"
              onClick={onOpenFilmDetails}
              className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#1a1715] border border-white/10 shadow-lg group cursor-pointer flex flex-col justify-between min-h-[340px] sm:min-h-[360px] hover:border-[#c27847]/50 transition-all duration-300"
            >
              {/* Film Image with Film Club Styling */}
              <div className="absolute inset-0 z-0">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/60 to-[#141211]/30" />
              </div>

              {/* Top Badge */}
              <div className="relative z-10 p-3.5 sm:p-5 flex justify-start">
                <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-md bg-[#c27847] text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-sm">
                  {t('film.badge')}
                </span>
              </div>

              {/* Center / Bottom Movie Details */}
              <div className="relative z-10 p-3.5 sm:p-5 mt-auto">
                <h3 className="text-xl sm:text-3xl font-cinzel font-bold tracking-wider sm:tracking-widest text-[#fbf8f5] mb-0.5 sm:mb-1">
                  {movie.title}
                </h3>
                <p className="text-sm sm:text-lg font-medium text-[#e59b67] mb-3 sm:mb-4">
                  {lang === 'fa' ? movie.titleFa : movie.title}
                </p>

                {/* Movie Meta Grid: 2x2 on mobile, 4-col on sm/desktop for crystal clear legibility */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2 pt-3 border-t border-white/15 text-center text-xs">
                  <div className="flex flex-col bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none py-1 sm:py-0 px-1">
                    <span className="text-[#a8988a] sm:text-[#998b7e] text-[11px] mb-0.5">{t('film.genre')}</span>
                    <span className="text-[#f5f1eb] font-medium text-xs truncate">
                      {lang === 'fa' ? movie.genreFa : movie.genre}
                    </span>
                  </div>
                  <div className="flex flex-col bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none py-1 sm:py-0 sm:border-r sm:border-l sm:border-white/10 px-1">
                    <span className="text-[#a8988a] sm:text-[#998b7e] text-[11px] mb-0.5">{t('film.duration')}</span>
                    <span className="text-[#f5f1eb] font-medium text-xs truncate">
                      {lang === 'fa' ? movie.durationFa : movie.duration}
                    </span>
                  </div>
                  <div className="flex flex-col bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none py-1 sm:py-0 sm:border-r sm:border-l sm:border-white/10 px-1">
                    <span className="text-[#a8988a] sm:text-[#998b7e] text-[11px] mb-0.5">{t('film.year')}</span>
                    <span className="text-[#f5f1eb] font-medium text-xs">{movie.year}</span>
                  </div>
                  <div className="flex flex-col bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none py-1 sm:py-0 px-1">
                    <span className="text-[#a8988a] sm:text-[#998b7e] text-[11px] mb-0.5">{t('film.director')}</span>
                    <span className="text-[#f5f1eb] font-medium text-xs truncate">
                      {lang === 'fa' ? movie.directorFa : movie.director}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="mid-card-this-week-film-empty"
              className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#1a1715] border border-white/10 shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[340px] sm:min-h-[360px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#27221e] border border-[#e59b67]/20 flex items-center justify-center text-[#e59b67] mb-3.5 shadow-inner">
                <Sparkles className="w-6 h-6 text-[#e59b67]" />
              </div>
              <p className="text-base sm:text-lg font-bold text-[#f5f1eb] leading-relaxed">
                {lang === 'fa' ? 'جلسه بعدی به‌زودی اعلام می‌شود' : 'Next gathering will be announced soon'}
              </p>
            </div>
          )}

          {/* Card 2: Confidence / All Levels Reassurance (Col 6-8 on desktop) */}
          <div
            id="mid-card-beginner-reassurance"
            className="lg:col-span-4 rounded-2xl bg-[#f7f3eb] text-[#241f1c] p-5 sm:p-7 border border-[#e8ded2] shadow-lg flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Question */}
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#1a1715] leading-snug mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#c27847] shrink-0 mt-0.5" />
                <span>{t('reassurance.q')}</span>
              </h3>

              {/* Bold Script Reassurance */}
              <div className="flex items-center gap-2 my-2 sm:my-2.5">
                <span className="text-2xl sm:text-3xl font-black text-[#c27847] tracking-tight font-serif-display">
                  {t('reassurance.answer')}
                </span>
                <Heart className="w-4 h-4 text-[#c27847] fill-[#c27847]/20" />
              </div>

              {/* Friendly, Adult Explanation */}
              <p className="text-xs sm:text-sm text-[#574b40] leading-relaxed mb-3 sm:mb-4">
                {t('reassurance.body')}
              </p>
            </div>

            {/* Bottom Warm Note */}
            <div className="pt-2.5 sm:pt-3 border-t border-[#dfd2c1] text-[11px] sm:text-xs text-[#827263] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c27847] shrink-0" />
              <span>{t('reassurance.footer')}</span>
            </div>
          </div>

          {/* Card 3: Experience Benefits (Col 9-12 on desktop) */}
          <div
            id="mid-card-benefits"
            className="lg:col-span-3 rounded-2xl bg-[#1a1816] border border-white/10 p-5 sm:p-6 shadow-lg flex flex-col justify-between space-y-4 sm:space-y-3.5"
          >
            {BENEFITS.map((benefit, i) => {
              const title = lang === 'fa' ? benefit.titleFa : benefit.titleEn;
              const desc = lang === 'fa' ? benefit.descFa : benefit.descEn;

              return (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#27211c] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#c27847]/40 transition-colors">
                    {getBenefitIcon(benefit.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#f5f1eb] mb-0.5 leading-snug">
                      {title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#a39487] leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
