import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import elahePhoto from '../assets/images/support/elahe.jpg';
import haniehPhoto from '../assets/images/support/hanieh.jpg';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SupportMemberCardProps {
  photoSrc: string;
  nameFa: string;
  nameEn: string;
  telegramUrl: string;
  initial: string;
  lang: 'fa' | 'en';
}

const SupportMemberCard: React.FC<SupportMemberCardProps> = ({
  photoSrc,
  nameFa,
  nameEn,
  telegramUrl,
  initial,
  lang,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isRealPhotoLoaded, setIsRealPhotoLoaded] = useState(false);

  const displayName = lang === 'fa' ? nameFa : nameEn;
  const roleText = lang === 'fa' ? 'پشتیبانی' : 'Support';
  const ctaText = lang === 'fa' ? `پیام به ${nameFa}` : `Message ${nameEn}`;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#231f1c] border border-white/10 flex flex-col items-center text-center justify-between space-y-3.5 shadow-lg">
      {/* Profile info section */}
      <div className="flex flex-col items-center w-full">
        {/* Circular Profile Photo / Safe Visual Fallback */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#c27847]/50 bg-[#29221e] shadow-md flex items-center justify-center mx-auto mb-2.5">
          {!imgError && (
            <img
              src={photoSrc}
              alt={displayName}
              onError={() => setImgError(true)}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth > 10 && img.naturalHeight > 10) {
                  setIsRealPhotoLoaded(true);
                }
              }}
              className={`w-full h-full object-cover object-center transition-all duration-300 ${
                isRealPhotoLoaded ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            />
          )}

          {(!isRealPhotoLoaded || imgError) && (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#382c24] to-[#211a16] text-[#e59b67] select-none">
              <span className="text-xl sm:text-2xl font-bold font-serif">{initial}</span>
            </div>
          )}
        </div>

        {/* Member Name */}
        <h4 className="text-sm sm:text-base font-bold text-[#fdfbf7] leading-snug">{displayName}</h4>

        {/* Support Label */}
        <p className="text-xs text-[#c27847] font-medium mt-0.5">{roleText}</p>
      </div>

      {/* Direct Telegram CTA Button for this member */}
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#c27847] hover:bg-[#a86134] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#c27847]/20 hover:shadow-[#c27847]/35 transition-all duration-200 active:scale-95 cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span className="truncate">{ctaText}</span>
      </a>
    </div>
  );
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  // Support Telegram handles
  const elaheTelegramUrl = 'https://t.me/Ellizrr';
  const haniehTelegramUrl = 'https://t.me/Ellizrr';

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="contact-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#1a1715] text-[#fdfbf7] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#221e1b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#c27847]/20 text-[#e59b67] border border-[#c27847]/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#fdfbf7]">
                {lang === 'fa' ? 'تماس با ما' : 'Contact Us'}
              </h3>
              <p className="text-xs text-[#a39487]">
                {lang === 'fa'
                  ? 'سوالی درباره دورهمیها داری؟ با ما در ارتباط باش.'
                  : 'Have a question about the gatherings? Get in touch with us.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-[#a39487] hover:text-white transition-colors cursor-pointer"
            aria-label={lang === 'fa' ? 'بستن' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Two separate support cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Card 1: Elahe */}
            <SupportMemberCard
              photoSrc={elahePhoto}
              nameFa="الهه"
              nameEn="Elahe"
              telegramUrl={elaheTelegramUrl}
              initial={lang === 'fa' ? 'ا' : 'E'}
              lang={lang}
            />

            {/* Card 2: Hanieh */}
            <SupportMemberCard
              photoSrc={haniehPhoto}
              nameFa="هانیه"
              nameEn="Hanieh"
              telegramUrl={haniehTelegramUrl}
              initial={lang === 'fa' ? 'ه' : 'H'}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

