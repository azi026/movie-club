import React from 'react';
import { Instagram, Mail, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenFaq: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenContact,
  onOpenFaq,
  onScrollTo,
}) => {
  const { t } = useLanguage();

  return (
    <footer id="main-footer" className="w-full bg-[#0c0b0a] border-t border-white/10 text-[#d1c8be] py-7 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b border-white/10 text-center md:text-right">
          {/* Brand Info */}
          <div className="max-w-sm flex flex-col items-center md:items-start">
            <div className="flex flex-col mb-1.5 items-center md:items-start">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-[#f5f1eb]">
                MOVIE CLUB
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-medium text-[#a8988a] uppercase -mt-0.5">
                ENGLISH CONVERSATION CLUB
              </span>
            </div>
            <p className="text-xs text-[#9c8d80] leading-relaxed max-w-xs sm:max-w-none">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#a8998c]">
            <button
              onClick={() => onScrollTo('this-week-film')}
              className="py-1.5 hover:text-[#e59b67] transition-colors cursor-pointer"
            >
              {t('nav.this_week_film')}
            </button>
            <button
              onClick={() => onScrollTo('how-it-works')}
              className="py-1.5 hover:text-[#e59b67] transition-colors cursor-pointer"
            >
              {t('nav.how_it_works')}
            </button>
            <button
              onClick={onOpenFaq}
              className="py-1.5 hover:text-[#e59b67] transition-colors cursor-pointer"
            >
              {t('footer.faq')}
            </button>
            <button
              onClick={onOpenAbout}
              className="py-1.5 hover:text-[#e59b67] transition-colors cursor-pointer"
            >
              {t('footer.our_story')}
            </button>
            <button
              onClick={onOpenContact}
              className="py-1.5 hover:text-[#e59b67] transition-colors cursor-pointer"
            >
              {t('footer.privacy')}
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 text-[#d1c8be]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] p-2 rounded-lg bg-white/5 hover:bg-[#c27847] hover:text-white border border-white/10 transition-all active:scale-95"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] p-2 rounded-lg bg-white/5 hover:bg-[#c27847] hover:text-white border border-white/10 transition-all active:scale-95"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenContact}
              className="flex items-center justify-center min-w-[40px] min-h-[40px] p-2 rounded-lg bg-white/5 hover:bg-[#c27847] hover:text-white border border-white/10 transition-all active:scale-95 cursor-pointer"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-5 text-center text-[11px] text-[#70645a]">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};
