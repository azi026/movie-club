import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  Clock,
  Coffee,
  Copy,
  CreditCard,
  ExternalLink,
  Heart,
  Hourglass,
  Loader2,
  MapPin,
  Send,
  Sparkles,
  Ticket,
  Users,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';
import { PAYMENT_CONFIG } from '../data/movieClubData';
import { supabase } from '../lib/supabase';
import { ReservationPayload } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { lang, isRtl, t } = useLanguage();
  const { hasActiveSession, session, movie, isFull, refreshCapacity, getDateDisplay, getTimeDisplay } = useSession();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<ReservationPayload>({
    fullName: '',
    contact: '',
    email: '',
    englishLevel: 'intermediate',
    notes: '',
    drinkPreference: 'لاته / قهوه دمی',
  });
  const [reservationCode, setReservationCode] = useState<string>('');
  const [hasTransferred, setHasTransferred] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  if (!hasActiveSession || !session || !movie) {
    return (
      <div
        id="reservation-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      >
        <div
          id="reservation-modal-container"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[#181614] text-[#fdfbf7] rounded-3xl border border-white/15 shadow-2xl p-8 text-center flex flex-col items-center justify-center space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#27221e] border border-[#e59b67]/20 flex items-center justify-center text-[#e59b67] shadow-inner">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#f5f1eb]">
            {lang === 'fa' ? 'جلسه بعدی به‌زودی اعلام می‌شود' : 'Next gathering will be announced soon'}
          </h3>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {lang === 'fa' ? 'متوجه شدم' : 'Got it'}
          </button>
        </div>
      </div>
    );
  }

  const handleCopyCardNumber = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(PAYMENT_CONFIG.cardNumber);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (isSubmitting) return;

      if (isFull) {
        setSubmitError(
          lang === 'fa'
            ? 'متأسفانه ظرفیت این جلسه تکمیل شده است.'
            : 'Sorry, this session is now fully booked.'
        );
        return;
      }

      if (!session?.id) {
        setSubmitError(
          lang === 'fa'
            ? 'جلسه فعالی برای ثبت رزرو یافت نشد.'
            : 'No active session found for reservation.'
        );
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const { data, error } = await supabase.rpc('create_session_reservation', {
          p_session_id: Number(session.id),
          p_full_name: formData.fullName.trim(),
          p_phone: formData.contact.trim(),
          p_email: formData.email.trim() || null,
          p_english_level: formData.englishLevel,
          p_drink: formData.drinkPreference?.trim() || null,
        });

        if (error) {
          console.error('Supabase error calling create_session_reservation RPC:', error);
          setSubmitError(
            lang === 'fa'
              ? 'خطا در ثبت اطلاعات در پایگاه داده. لطفاً دوباره تلاش کنید.'
              : 'Error saving reservation to the database. Please try again.'
          );
          setIsSubmitting(false);
          return;
        }

        if (data && typeof data === 'object') {
          if (data.success === false) {
            if (data.error === 'SESSION_FULL') {
              setSubmitError(
                lang === 'fa'
                  ? 'متأسفانه ظرفیت این جلسه تکمیل شده است.'
                  : 'Sorry, this session is now fully booked.'
              );
            } else if (data.error === 'SESSION_NOT_FOUND') {
              setSubmitError(
                lang === 'fa'
                  ? 'این جلسه دیگر برای رزرو فعال نیست.'
                  : 'This session is no longer available for reservation.'
              );
            } else {
              setSubmitError(
                lang === 'fa'
                  ? 'خطا در ثبت رزرو. لطفاً دوباره تلاش کنید.'
                  : 'Error saving reservation. Please try again.'
              );
            }
            setIsSubmitting(false);
            return;
          }
        }

        const code = `MC-${Math.floor(100000 + Math.random() * 900000)}`;
        setReservationCode(code);
        setStep(4);
        refreshCapacity();
      } catch (err: any) {
        console.error('Unexpected reservation error:', err);
        setSubmitError(
          lang === 'fa'
            ? 'خطای غیرمنتظره در ارتباط با سرور. لطفاً دوباره تلاش کنید.'
            : 'An unexpected connection error occurred. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResetAndClose = () => {
    if (isSubmitting) return;
    setStep(1);
    setHasTransferred(false);
    setCopied(false);
    setSubmitError(null);
    setFormData({
      fullName: '',
      contact: '',
      email: '',
      englishLevel: 'intermediate',
      notes: '',
      drinkPreference: 'لاته / قهوه دمی',
    });
    onClose();
  };

  return (
    <div
      id="reservation-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={handleResetAndClose}
    >
      <div
        id="reservation-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#1a1715] text-[#fdfbf7] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-white/10 bg-[#221e1b] shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-[#c27847]/20 text-[#e59b67] border border-[#c27847]/30">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-lg font-bold text-[#fdfbf7]">
                {t('modal.reserve_title')}
              </h3>
              <p className="text-[10px] sm:text-xs text-[#a39487]">
                {lang === 'fa' ? movie.titleFa : movie.title} • {getDateDisplay(lang)}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 sm:p-2 rounded-lg sm:rounded-xl hover:bg-white/10 text-[#a39487] hover:text-white transition-colors cursor-pointer"
            aria-label={t('modal.close')}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-2.5 sm:space-y-4 flex-1">
          {/* Step Indicators */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-[#8a7b6f]">
              <div
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all ${
                  step === 1
                    ? 'bg-[#c27847] text-white shadow-sm'
                    : step > 1
                    ? 'bg-white/10 text-[#e59b67]'
                    : 'bg-white/5 text-[#8a7b6f]'
                }`}
              >
                <span>{lang === 'fa' ? '۱' : '1'}</span>
                <span className="hidden xs:inline">{t('modal.step1')}</span>
              </div>
              <span className="text-white/20 text-[10px]">——</span>
              <div
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all ${
                  step === 2
                    ? 'bg-[#c27847] text-white shadow-sm'
                    : step > 2
                    ? 'bg-white/10 text-[#e59b67]'
                    : 'bg-white/5 text-[#8a7b6f]'
                }`}
              >
                <span>{lang === 'fa' ? '۲' : '2'}</span>
                <span className="hidden xs:inline">{t('modal.step2')}</span>
              </div>
              <span className="text-white/20 text-[10px]">——</span>
              <div
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all ${
                  step === 3
                    ? 'bg-[#c27847] text-white shadow-sm'
                    : 'bg-white/5 text-[#8a7b6f]'
                }`}
              >
                <span>{lang === 'fa' ? '۳' : '3'}</span>
                <span className="hidden xs:inline">{t('modal.step3')}</span>
              </div>
            </div>
          )}

          {/* Step 1: English Level & Comfort */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-2.5 sm:space-y-4">
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#231f1c] border border-white/5">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-[#e59b67] mb-2 sm:mb-3">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="leading-snug">
                    {lang === 'fa'
                      ? 'هدف ما راحتی و آرامش شماست؛ سطحتان را بدون نگرانی انتخاب کنید:'
                      : 'Our priority is your comfort. Choose whatever fits best:'}
                  </span>
                </div>

                <div className="space-y-1.5 sm:space-y-2.5">
                  {[
                    {
                      id: 'newbie',
                      title:
                        lang === 'fa'
                          ? 'تازه‌کار — بیشتر دوست دارم گوش بدم و کم‌کم وارد گفتگو بشم'
                          : t('modal.level_newbie'),
                      desc:
                        lang === 'fa'
                          ? 'اگر صحبت کردن برات سخته، هیچ اشکالی نداره؛ می‌تونی بیشتر گوش بدی و هر وقت راحت بودی صحبت کنی.'
                          : t('modal.level_newbie_desc'),
                    },
                    {
                      id: 'beginner',
                      title:
                        lang === 'fa'
                          ? 'مبتدی — با جمله‌های کوتاه و ساده صحبت می‌کنم'
                          : t('modal.level_beginner'),
                      desc:
                        lang === 'fa'
                          ? 'می‌تونم درباره موضوعات ساده با جمله‌های کوتاه صحبت کنم.'
                          : t('modal.level_beginner_desc'),
                    },
                    {
                      id: 'intermediate',
                      title:
                        lang === 'fa'
                          ? 'متوسط — می‌تونم نظرم رو بیان کنم'
                          : t('modal.level_intermediate'),
                      desc:
                        lang === 'fa'
                          ? 'می‌تونم درباره فیلم، شخصیت‌ها و احساساتم توضیح بدم و وارد گفتگو بشم.'
                          : t('modal.level_intermediate_desc'),
                    },
                    {
                      id: 'advanced',
                      title:
                        lang === 'fa'
                          ? 'پیشرفته — از گفت‌وگوی عمیق لذت می‌برم'
                          : t('modal.level_advanced'),
                      desc:
                        lang === 'fa'
                          ? 'می‌تونم درباره موضوعات پیچیده‌تر، فلسفی و سینمایی راحت گفتگو کنم.'
                          : t('modal.level_advanced_desc'),
                    },
                  ].map((lvl) => (
                    <label
                      key={lvl.id}
                      className={`flex items-start gap-2.5 sm:gap-3 px-3 py-2 sm:p-3.5 rounded-lg sm:rounded-xl border cursor-pointer transition-all ${
                        formData.englishLevel === lvl.id
                          ? 'bg-[#c27847]/15 border-[#c27847] text-white shadow-sm'
                          : 'bg-[#1a1715] border-white/10 hover:border-white/20 text-[#b5a799]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="englishLevel"
                        value={lvl.id}
                        checked={formData.englishLevel === lvl.id}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            englishLevel: lvl.id as any,
                          })
                        }
                        className="mt-0.5 sm:mt-1 accent-[#c27847] shrink-0 cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
                      <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <p className="text-xs sm:text-sm font-bold text-[#f5f1eb] leading-snug">
                          {lvl.title}
                        </p>
                        <p className="text-[11px] sm:text-xs text-[#9e8f82] mt-0.5 sm:mt-1 leading-normal sm:leading-relaxed">
                          {lvl.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[42px] sm:min-h-[44px] py-2.5 sm:py-3.5 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#c27847]/30 transition-all cursor-pointer mt-0.5 sm:mt-0"
              >
                {lang === 'fa' ? 'مرحله بعد: اطلاعات تماس' : 'Next: Contact Information'}
              </button>
            </form>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-2.5 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#d4c7ba] mb-1 sm:mb-1.5">
                    {lang === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder={lang === 'fa' ? 'مثال: سارا رضایی' : 'e.g. Alex Morgan'}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#241f1c] border border-white/15 text-xs sm:text-sm text-white placeholder-[#786c61] focus:outline-none focus:border-[#c27847]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d4c7ba] mb-1 sm:mb-1.5">
                    {lang === 'fa' ? 'شماره تماس یا آیدی تلگرام' : 'Phone or Telegram ID'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    placeholder={lang === 'fa' ? '۰۹۱۲۰۰۰۰۰۰۰ یا @username' : '+1... or @telegram'}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#241f1c] border border-white/15 text-xs sm:text-sm text-white placeholder-[#786c61] focus:outline-none focus:border-[#c27847]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d4c7ba] mb-1 sm:mb-1.5">
                    {lang === 'fa' ? 'ایمیل (جهت ارسال یادآوری و سوالات)' : 'Email'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="youremail@example.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#241f1c] border border-white/15 text-xs sm:text-sm text-white placeholder-[#786c61] focus:outline-none focus:border-[#c27847]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d4c7ba] mb-1 sm:mb-1.5">
                    {lang === 'fa' ? 'نوشیدنی مورد علاقه در کافه (اختیاری)' : 'Preferred Drink (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={formData.drinkPreference}
                    onChange={(e) =>
                      setFormData({ ...formData, drinkPreference: e.target.value })
                    }
                    placeholder={lang === 'fa' ? 'لاته، آمریکانو، چای ماسالا...' : 'Latte, Filter Coffee, Tea...'}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#241f1c] border border-white/15 text-xs sm:text-sm text-white placeholder-[#786c61] focus:outline-none focus:border-[#c27847]"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 min-h-[40px] sm:min-h-[44px] py-2 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#d1c8be] transition-colors cursor-pointer"
                >
                  {lang === 'fa' ? 'بازگشت' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="w-2/3 min-h-[40px] sm:min-h-[44px] py-2 sm:py-3 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#c27847]/30 transition-all cursor-pointer"
                >
                  {lang === 'fa' ? 'مرحله بعد: پرداخت و تکمیل رزرو' : 'Next: Payment'}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Card-to-Card Payment Step */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-2.5 sm:space-y-3.5 animate-fade-in">
              {/* Compact Reservation Summary */}
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#231f1c] border border-white/10 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <h4 className="text-[11.5px] sm:text-sm font-bold text-[#fdfbf7]">
                    {lang === 'fa' ? 'تکمیل رزرو' : 'Reservation Summary'}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md bg-[#c27847]/20 text-[#e59b67] font-medium">
                    {lang === 'fa' ? session.dayOfWeekFa : session.dayOfWeekEn}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-2.5 gap-y-1 sm:gap-y-1.5 text-[10.5px] sm:text-xs">
                  <div>
                    <span className="text-[#8e8073] block text-[9.5px] sm:text-[10px] leading-tight">
                      {lang === 'fa' ? 'نام فیلم:' : 'Movie:'}
                    </span>
                    <span className="font-semibold text-[#f5f1eb] leading-tight block truncate">
                      {lang === 'fa' ? movie.titleFa : movie.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8e8073] block text-[9.5px] sm:text-[10px] leading-tight">
                      {lang === 'fa' ? 'تاریخ و ساعت:' : 'Date & Time:'}
                    </span>
                    <span className="font-semibold text-[#f5f1eb] leading-tight block truncate">
                      {getDateDisplay(lang)} • {getTimeDisplay(lang)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8e8073] block text-[9.5px] sm:text-[10px] leading-tight">
                      {lang === 'fa' ? 'محل برگزاری:' : 'Location:'}
                    </span>
                    <span className="font-semibold text-[#f5f1eb] leading-tight block truncate">
                      {lang === 'fa' ? session.locationNameFa : session.locationNameEn}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8e8073] block text-[9.5px] sm:text-[10px] leading-tight">
                      {lang === 'fa' ? 'هزینه حضور:' : 'Entry Fee:'}
                    </span>
                    <span className="font-bold text-[#e59b67] leading-tight block">
                      {lang === 'fa' ? `${PAYMENT_CONFIG.priceFormattedFa} تومان` : PAYMENT_CONFIG.priceFormattedEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card to Card Box - Strong Visual Focus */}
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#251f1a] to-[#1e1916] border border-[#c27847]/35 space-y-2 sm:space-y-3 shadow-lg">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-[#f5f1eb]">
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e59b67] shrink-0" />
                  <span>{lang === 'fa' ? 'پرداخت کارت‌به‌کارت' : 'Card-to-Card Transfer'}</span>
                </div>

                <p className="text-[10.5px] sm:text-xs text-[#d1c8be] leading-tight sm:leading-relaxed">
                  {lang === 'fa'
                    ? 'برای تکمیل رزرو، مبلغ زیر را به شماره کارت زیر واریز کنید.'
                    : 'To complete your reservation, please transfer the amount to the following card number.'}
                </p>

                {/* Amount and Card Display */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#141211] border border-[#c27847]/25 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10.5px] sm:text-xs text-[#9e8f82]">
                      {lang === 'fa' ? 'هزینه حضور:' : 'Amount:'}
                    </span>
                    <span className="text-xs sm:text-base font-extrabold text-[#e59b67]">
                      {lang === 'fa' ? `${PAYMENT_CONFIG.priceFormattedFa} تومان` : PAYMENT_CONFIG.priceFormattedEn}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-white/10">
                    <span className="text-[9.5px] sm:text-[11px] text-[#9e8f82] block mb-1">
                      {lang === 'fa' ? 'شماره کارت:' : 'Card Number:'}
                    </span>
                    <div className="flex items-center justify-between gap-1.5 p-1.5 sm:p-2.5 rounded-lg bg-[#221e1a] border border-[#c27847]/40">
                      <span className="font-mono text-[11px] xs:text-xs sm:text-sm font-bold text-[#fdfbf7] tracking-wider dir-ltr select-all whitespace-nowrap overflow-hidden">
                        {lang === 'fa' ? PAYMENT_CONFIG.cardNumberFormatted : PAYMENT_CONFIG.cardNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCardNumber}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#c27847] hover:bg-[#a86134] text-white text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>{lang === 'fa' ? 'کپی شد ✓' : 'Copied ✓'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>{lang === 'fa' ? 'کپی' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#b8ab9f] pt-0.5">
                    <span>{lang === 'fa' ? 'به نام:' : 'Account Holder:'}</span>
                    <span className="font-semibold text-white">
                      {lang === 'fa' ? PAYMENT_CONFIG.cardHolderNameFa : PAYMENT_CONFIG.cardHolderNameEn}
                    </span>
                  </div>
                </div>

                {/* Instructions & Support CTA */}
                <div className="space-y-1.5 pt-0.5">
                  <p className="text-[10.5px] sm:text-xs text-[#b8ab9f] leading-snug sm:leading-relaxed">
                    {lang === 'fa'
                      ? 'پس از واریز، تصویر رسید پرداخت را برای پشتیبانی Movie Club ارسال کنید. لطفاً هنگام ارسال رسید، نام و نام خانوادگی خود را نیز بنویسید.'
                      : 'After transfer, please send your payment receipt to Movie Club Support along with your full name.'}
                  </p>

                  <a
                    href={PAYMENT_CONFIG.supportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[36px] sm:min-h-[40px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-[#2b2520] hover:bg-[#362e28] border border-[#c27847]/40 text-[#e59b67] hover:text-[#f5be98] text-[11.5px] sm:text-sm font-bold transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{lang === 'fa' ? 'ارسال رسید به پشتیبانی' : 'Send Receipt to Support'}</span>
                    <ExternalLink className="w-3 h-3 text-[#a39487]" />
                  </a>
                </div>

                {/* Submission Error Banner */}
                {submitError && (
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="leading-snug">{submitError}</span>
                  </div>
                )}

                {/* Verification Checkbox */}
                <label className="flex items-start gap-2 pt-1.5 border-t border-white/10 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasTransferred}
                    onChange={(e) => setHasTransferred(e.target.checked)}
                    disabled={isSubmitting}
                    className="mt-0.5 accent-[#c27847] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded cursor-pointer shrink-0"
                  />
                  <span className="text-[10.5px] sm:text-xs text-[#e8ded3] leading-snug font-medium">
                    {lang === 'fa'
                      ? 'مبلغ را واریز کرده‌ام و رسید را برای پشتیبانی ارسال می‌کنم.'
                      : 'I have transferred the fee and will send the receipt to support.'}
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 pt-0.5 sm:pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={isSubmitting}
                  className="w-1/3 min-h-[38px] sm:min-h-[44px] py-1.5 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#d1c8be] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {lang === 'fa' ? 'بازگشت' : 'Back'}
                </button>
                <button
                  type="submit"
                  disabled={!hasTransferred || isSubmitting || isFull}
                  className={`w-2/3 min-h-[38px] sm:min-h-[44px] py-1.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                    hasTransferred && !isSubmitting && !isFull
                      ? 'bg-[#c27847] hover:bg-[#a86134] text-white shadow-[#c27847]/30 cursor-pointer active:scale-98'
                      : 'bg-white/10 text-[#73675c] border border-white/5 cursor-not-allowed opacity-70'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{lang === 'fa' ? 'در حال ثبت اطلاعات...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    isFull
                      ? (lang === 'fa' ? 'ظرفیت تکمیل شده است' : 'Fully Booked')
                      : (lang === 'fa' ? 'ثبت درخواست رزرو' : 'Submit Reservation Request')
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Pending Confirmation Pass */}
          {step === 4 && (
            <div className="space-y-4 sm:space-y-5 text-center animate-fade-in py-1">
              <div className="inline-flex p-3 rounded-full bg-[#382618]/90 border border-[#c27847]/50 text-[#e59b67] shadow-lg">
                <Hourglass className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base sm:text-xl font-bold text-white">
                  {lang === 'fa' ? 'درخواست رزرو شما ثبت شد ✓' : 'Reservation Request Submitted ✓'}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#c2b4a5] max-w-md mx-auto leading-relaxed">
                  {lang === 'fa'
                    ? 'رسید پرداخت شما توسط پشتیبانی بررسی می‌شود. پس از تأیید پرداخت، رزرو شما نهایی خواهد شد.'
                    : 'Your payment receipt is being reviewed by support. Once verified, your reservation will be finalized.'}
                </p>
              </div>

              {/* Reservation Pass with Pending Amber/Copper Status */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#221e1a] border border-[#c27847]/40 text-right space-y-3 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                  <span className="text-[11px] sm:text-xs font-bold text-[#e59b67] tracking-widest font-cinzel">
                    MOVIE CLUB RESERVATION
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c27847]/30 text-[11px] sm:text-xs font-mono text-[#f5f1eb]">
                    {reservationCode}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-center py-1.5 px-3 rounded-xl bg-[#362519] border border-[#e59b67]/40 text-[#f5be98] text-xs font-bold gap-2">
                  <Hourglass className="w-3.5 h-3.5 text-[#e59b67]" />
                  <span>{lang === 'fa' ? 'در انتظار تأیید پرداخت' : 'Pending Payment Verification'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
                  <div>
                    <span className="text-[#87786b] block text-[10px] sm:text-[11px]">
                      {lang === 'fa' ? 'فیلم:' : 'Film:'}
                    </span>
                    <span className="font-semibold text-white">
                      {lang === 'fa' ? movie.titleFa : movie.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#87786b] block text-[10px] sm:text-[11px]">
                      {lang === 'fa' ? 'زمان:' : 'Time:'}
                    </span>
                    <span className="font-semibold text-white">
                      {getDateDisplay(lang)} • {getTimeDisplay(lang)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#87786b] block text-[10px] sm:text-[11px]">
                      {lang === 'fa' ? 'محل برگزاری:' : 'Location:'}
                    </span>
                    <span className="font-semibold text-white">
                      {lang === 'fa' ? session.locationNameFa : session.locationNameEn} ({lang === 'fa' ? session.locationAddressFa : session.locationAddressEn})
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 text-[11px] text-[#b8ab9f] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#e59b67] shrink-0" />
                  <span>
                    {lang === 'fa'
                      ? 'نام ثبت شده: ' + (formData.fullName || 'شرکت‌کننده عزیز')
                      : 'Registered Name: ' + (formData.fullName || 'Valued Participant')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full min-h-[42px] sm:min-h-[44px] py-2.5 sm:py-3.5 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#c27847]/30 transition-all cursor-pointer"
              >
                {lang === 'fa' ? 'متوجه شدم' : 'Got it'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

