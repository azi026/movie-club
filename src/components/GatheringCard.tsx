import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Ticket, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';
import { toPersianDigits } from '../utils/dateFormatter';

interface GatheringCardProps {
  onOpenReservation: () => void;
}

export const GatheringCard: React.FC<GatheringCardProps> = ({ onOpenReservation }) => {
  const { lang, isRtl, t } = useLanguage();
  const { hasActiveSession, session, isFull, getDateDisplay, getTimeDisplay } = useSession();

  if (!hasActiveSession || !session) {
    return (
      <section id="this-week-gathering" className="w-full py-8 sm:py-11 px-4 sm:px-6 lg:px-8 bg-[#121110]">
        <div className="max-w-6xl mx-auto">
          <div
            id="gathering-card-empty"
            className="rounded-2xl sm:rounded-3xl bg-[#181614] border border-white/10 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[200px] sm:min-h-[240px] shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#27221e] border border-[#e59b67]/20 flex items-center justify-center text-[#e59b67] mb-3.5 shadow-inner">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-base sm:text-xl font-bold text-[#f5f1eb] tracking-wide">
              {lang === 'fa' ? 'جلسه بعدی به‌زودی اعلام می‌شود' : 'Next gathering will be announced soon'}
            </h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="this-week-gathering" className="w-full py-8 sm:py-11 px-4 sm:px-6 lg:px-8 bg-[#121110]">
      <div className="max-w-6xl mx-auto">
        <div
          id="gathering-event-container"
          className="relative rounded-2xl overflow-hidden bg-[#181614] border border-white/10 shadow-xl transition-all duration-300 hover:border-[#c27847]/40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[280px]">
            {/* Left Col: Atmospheric Candle & Coffee image */}
            <div className="lg:col-span-4 relative h-[140px] xs:h-[160px] sm:min-h-[220px] lg:min-h-full">
              <img
                src={session.image}
                alt="Movie Club Cafe Atmosphere"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#181614] via-[#181614]/40 to-transparent opacity-90 lg:opacity-80" />
            </div>

            {/* Middle Col: Date, Time, Venue, Community-focused Capacity */}
            <div
              className={`lg:col-span-5 p-4 sm:p-7 flex flex-col justify-center space-y-2.5 sm:space-y-3.5 ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            >
              <h3
                id="gathering-card-heading"
                className="text-lg sm:text-2xl font-bold text-[#fdfbf7] mb-0.5 sm:mb-1.5"
              >
                {t('gathering.title')}
              </h3>

              <div className="space-y-2 sm:space-y-3">
                {/* Date */}
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-base text-[#ded5cb]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#27221e] text-[#e59b67] shrink-0 border border-white/5 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="font-semibold text-xs sm:text-base">
                    {getDateDisplay(lang)}
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-base text-[#ded5cb]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#27221e] text-[#e59b67] shrink-0 border border-white/5 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-base">
                    {lang === 'fa' ? `ساعت ${getTimeDisplay('fa')}` : `${t('gathering.time_label')} ${getTimeDisplay('en')}`}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-base text-[#ded5cb]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#27221e] text-[#e59b67] shrink-0 border border-white/5 flex items-center justify-center mt-0.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-xs sm:text-base text-[#f5f1eb]">
                      {lang === 'fa' ? session.locationNameFa : session.locationNameEn}
                    </span>
                    <span className="block text-[11px] sm:text-xs text-[#a19284] mt-0.5">
                      ({lang === 'fa' ? session.locationAddressFa : session.locationAddressEn})
                    </span>
                  </div>
                </div>

                {/* Community-focused copy (explaining WHY it's small) */}
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#e59b67] pt-0.5 sm:pt-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#27221e] text-[#e59b67] shrink-0 border border-[#e59b67]/20 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="font-medium text-[11px] sm:text-sm leading-relaxed">
                    {t('gathering.small_community')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Quote, Primary Reservation CTA */}
            <div
              className={`lg:col-span-3 p-4 sm:p-7 bg-[#1f1c19]/80 border-t lg:border-t-0 ${
                isRtl ? 'lg:border-r' : 'lg:border-l'
              } border-white/10 flex flex-col justify-center items-center text-center`}
            >
              <p className="text-xs sm:text-sm text-[#cfc2b4] leading-relaxed mb-3 sm:mb-5 font-normal">
                {t('gathering.quote')}
              </p>

              {/* Primary Reservation CTA - prominent & thumb-friendly */}
              <button
                id="gathering-reserve-btn"
                onClick={isFull ? undefined : onOpenReservation}
                disabled={isFull}
                className={`w-full min-h-[46px] sm:min-h-[48px] flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 ${
                  isFull
                    ? 'bg-[#332b26] text-[#a39487] border border-white/10 cursor-not-allowed opacity-85 shadow-none'
                    : 'bg-[#c27847] hover:bg-[#a86134] text-white shadow-lg shadow-[#c27847]/25 hover:shadow-[#c27847]/45 active:scale-95 cursor-pointer'
                }`}
              >
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{isFull ? (lang === 'fa' ? 'ظرفیت این دورهمی تکمیل شده' : 'This gathering is fully booked') : t('gathering.reserve_btn')}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#a39487] mt-2 sm:mt-3">
                <Sparkles className="w-3 h-3 text-[#e59b67]" />
                <span>{lang === 'fa' ? 'حضور با رزرو قبلی جهت هماهنگی فضا' : 'Prior reservation helps us prepare the space'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
