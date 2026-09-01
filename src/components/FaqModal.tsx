import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  const { lang, t } = useLanguage();
  const { isFull } = useSession();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      qFa: 'آیا برای شرکت در دورهمی باید سطح زبانم پیشرفته باشد؟',
      qEn: 'Do I need advanced English to attend?',
      aFa: 'اصلاً! همه سطح‌ها (حتی اگر فقط بخواهید گوش بدهید یا جملات کوتاه بگویید) با آغوش باز پذیرفته می‌شوند. هیچ آزمون، نمره یا قضاوتی وجود ندارد.',
      aEn: 'Not at all! All levels—even if you just want to listen or speak in simple phrases—are warmly welcome. There are no exams, grades, or judgment.',
    },
    {
      qFa: 'آیا فیلم در کافه پخش می‌شود یا باید قبلاً آن را ببینم؟',
      qEn: 'Is the movie screened at the café or do I watch it beforehand?',
      aFa: 'فیلم در کافه پخش نمی‌شود؛ شما فیلم را در طول هفته در خانه تماشا می‌کنید و در کافه فقط دور هم جمع می‌شویم تا با هم درباره‌اش چت کنیم و قهوه بنوشیم.',
      aEn: 'The film is watched at home prior to Sunday. At the café, we focus entirely on connecting, having coffee, and discussing the movie.',
    },
    {
      qFa: 'هزینه شرکت در دورهمی چگونه است؟',
      qEn: 'How does the event fee work?',
      aFa: 'حضور در بحث و گفتگو رایگان است و هر شرکت‌کننده صرفاً هزینه سفارش شخصی نوشیدنی یا دسر خود را به کافه پرداخت می‌کند.',
      aEn: 'Joining the discussion circle is free; each person simply covers their personal drink/food order with the café.',
    },
    {
      qFa: 'اگر وسط صحبت کلمه‌ای را فراموش کنم چه می‌شود؟',
      qEn: 'What if I forget a word while speaking?',
      aFa: 'تسهیل‌گرهای جمع و دوستان حاضر بسیار صبور هستند و در صورت نیاز با لبخند به پیدا کردن کلمات کمک می‌کنند.',
      aEn: 'Our friendly facilitators and fellow members are patient and gladly help you find the right words with a warm smile.',
    },
  ];

  return (
    <div
      id="faq-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="faq-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#1a1715] text-[#fdfbf7] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#221e1b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#c27847]/20 text-[#e59b67] border border-[#c27847]/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#fdfbf7]">
                {lang === 'fa' ? 'سوالات متداول' : 'Frequently Asked Questions'}
              </h3>
              <p className="text-xs text-[#a39487]">
                {lang === 'fa' ? 'پاسخ به سوالات پر تکرار شرکت‌کنندگان' : 'Common questions about our gatherings'}
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
        <div className="p-6 overflow-y-auto space-y-3 text-right">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#231f1c] border border-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-right hover:bg-white/5 transition-colors gap-3"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {lang === 'fa' ? item.qFa : item.qEn}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#e59b67] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8e7f72] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-[#cfc1b2] leading-relaxed border-t border-white/5 pt-3">
                    {lang === 'fa' ? item.aFa : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
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
