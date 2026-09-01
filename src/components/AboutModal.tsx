import React from 'react';
import { Coffee, Film, Heart, Sparkles, Users, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  const { lang, t } = useLanguage();
  const { isFull } = useSession();

  if (!isOpen) return null;

  return (
    <div
      id="about-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="about-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#1a1715] text-[#fdfbf7] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#221e1b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#c27847]/20 text-[#e59b67] border border-[#c27847]/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#fdfbf7]">
                {lang === 'fa' ? 'درباره مووی کلاب' : 'About Movie Club'}
              </h3>
              <p className="text-xs text-[#a39487]">
                {lang === 'fa' ? 'فیلم، بهانه‌ای برای انگلیسی حرف زدن' : 'Cinema, an excuse to speak English'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-[#a39487] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-right">
          {/* Philosophy */}
          <div className="p-5 rounded-2xl bg-[#231f1c] border border-white/5 space-y-3">
            <h4 className="text-base font-bold text-[#e59b67] flex items-center gap-2">
              <Film className="w-4 h-4" />
              <span>{lang === 'fa' ? 'فلسفه ما' : 'Our Philosophy'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#ded3c5] leading-relaxed">
              {lang === 'fa'
                ? 'مووی کلاب یک کلاس زبان نیست؛ یک جامعه صمیمی و امن است. ما متوجه شدیم که خیلی از ما سال‌ها انگلیسی خوانده‌ایم اما موقع صحبت کردن احساس خجالت یا اضطراب داریم. سینما بهترین بهانه است چون به جای حرف‌های تکراری، درباره احساسات، ایده‌ها، کاراکترها و دنیاهای تازه گفتگو می‌کنیم.'
                : 'Movie Club is not a lecture or exam; it is a cozy, judgment-free community. Cinema is our catalyst for heartfelt conversations about humanity, choices, and ideas in authentic spoken English.'}
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-[#221e1a] border border-white/5 space-y-1.5">
              <div className="p-2 rounded-lg bg-rose-950/60 text-rose-400 w-fit mb-2">
                <Heart className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-white">
                {lang === 'fa' ? 'بدون ترس از قضاوت' : 'Zero Fear'}
              </h5>
              <p className="text-[#9e8f81] leading-relaxed">
                {lang === 'fa'
                  ? 'اشتباه گرامری جزئی از یادگیری است و همه کنار هم رشد می‌کنیم.'
                  : 'Grammar mistakes are a natural part of growth.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#221e1a] border border-white/5 space-y-1.5">
              <div className="p-2 rounded-lg bg-amber-950/60 text-[#e59b67] w-fit mb-2">
                <Coffee className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-white">
                {lang === 'fa' ? 'حال خوب کافه' : 'Cozy Café Vibe'}
              </h5>
              <p className="text-[#9e8f81] leading-relaxed">
                {lang === 'fa'
                  ? 'محیطی آرام با عطر قهوه و جمع‌های کوچک و دوستانه.'
                  : 'Warm coffee aroma, cozy ambiance, small circles.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#221e1a] border border-white/5 space-y-1.5">
              <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 w-fit mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-white">
                {lang === 'fa' ? 'تسهیل‌گران همراه' : 'Friendly Hosts'}
              </h5>
              <p className="text-[#9e8f81] leading-relaxed">
                {lang === 'fa'
                  ? 'میزبانان جلسه کمک می‌کنند تا همه در مکالمه شرکت کنند.'
                  : 'Empathetic facilitators guiding inclusive conversation.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#1f1b18] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-[#a39487] hover:text-white"
          >
            {t('modal.close')}
          </button>
          <button
            onClick={() => {
              if (isFull) return;
              onClose();
              onOpenReservation();
            }}
            disabled={isFull}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
              isFull
                ? 'bg-[#332b26] text-[#a39487] border border-white/10 cursor-not-allowed opacity-85 shadow-none'
                : 'bg-[#c27847] hover:bg-[#a86134] text-white cursor-pointer'
            }`}
          >
            {isFull ? (lang === 'fa' ? 'ظرفیت این دورهمی تکمیل شده' : 'This gathering is fully booked') : t('nav.reserve')}
          </button>
        </div>
      </div>
    </div>
  );
};
