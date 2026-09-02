import React, { useState } from 'react';
import { Globe, Menu, Ticket, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSession } from '../context/SessionContext';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenFilmDetails: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenAbout,
  onOpenContact,
  onScrollTo,
}) => {
  const { lang, toggleLang, isRtl, t } = useLanguage();
  const { isFull } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollTo(sectionId);
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#121110]/90 backdrop-blur-md border-b border-white/8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Area */}
          <div
            id="navbar-brand-logo"
            onClick={() => handleNavClick('hero-section')}
            className={`flex flex-col cursor-pointer group select-none ${isRtl ? 'text-right' : 'text-left'}`}
          >
            <span className="font-cinzel text-lg sm:text-2xl font-bold tracking-wider text-[#f5f1eb] group-hover:text-[#e59b67] transition-colors">
              MOVIE CLUB
            </span>
            <span className="text-[8px] sm:text-[10px] tracking-[0.2em] font-medium text-[#a8988a] uppercase -mt-1">
              ENGLISH CONVERSATION CLUB
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden md:flex items-center space-x-1 lg:space-x-6">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('hero-section')}
              className="relative px-3 py-2 text-sm font-medium text-[#e59b67] transition-colors cursor-pointer"
            >
              {t('nav.home')}
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#c27847] rounded-full" />
            </button>

            <button
              id="nav-link-film"
              onClick={() => handleNavClick('this-week-film')}
              className="px-3 py-2 text-sm font-medium text-[#d1c8be] hover:text-[#f5f1eb] transition-colors cursor-pointer"
            >
              {t('nav.this_week_film')}
            </button>

            <button
              id="nav-link-how-it-works"
              onClick={() => handleNavClick('how-it-works')}
              className="px-3 py-2 text-sm font-medium text-[#d1c8be] hover:text-[#f5f1eb] transition-colors cursor-pointer"
            >
              {t('nav.how_it_works')}
            </button>

            <button
              id="nav-link-about"
              onClick={onOpenAbout}
              className="px-3 py-2 text-sm font-medium text-[#d1c8be] hover:text-[#f5f1eb] transition-colors cursor-pointer"
            >
              {t('nav.about')}
            </button>

            <button
              id="nav-link-contact"
              onClick={onOpenContact}
              className="px-3 py-2 text-sm font-medium text-[#d1c8be] hover:text-[#f5f1eb] transition-colors cursor-pointer"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Controls & Primary CTA */}
          <div id="navbar-actions-group" className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Switcher */}
            <button
              id="language-switcher-btn"
              onClick={toggleLang}
              className="flex items-center justify-center gap-1 min-w-[40px] min-h-[40px] px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#d9cebf] border border-white/10 transition-all active:scale-95 cursor-pointer"
              title={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
            >
              <Globe className="w-3.5 h-3.5 text-[#e59b67]" />
              <span className="font-semibold tracking-wider">{lang === 'fa' ? 'EN' : 'FA'}</span>
            </button>

            {/* Primary CTA Button (Desktop) */}
            <button
              id="navbar-reserve-primary-btn"
              onClick={isFull ? undefined : onOpenReservation}
              disabled={isFull}
              className={`hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isFull
                  ? 'bg-[#332b26] text-[#a39487] border border-white/10 cursor-not-allowed opacity-85 shadow-none'
                  : 'bg-[#c27847] hover:bg-[#a86134] text-white shadow-lg shadow-[#c27847]/20 hover:shadow-[#c27847]/40 active:scale-95 cursor-pointer'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>{isFull ? (lang === 'fa' ? 'ظرفیت این دورهمی تکمیل شده' : 'This gathering is fully booked') : t('nav.reserve')}</span>
            </button>

            {/* Mobile Menu Button (min 44px tap target) */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-lg bg-white/5 text-[#f5f1eb] hover:bg-white/10 border border-white/10 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#e59b67]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#181615] border-b border-white/10 px-4 pt-2 pb-3.5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-0.5">
            <button
              onClick={() => handleNavClick('hero-section')}
              className={`w-full min-h-[38px] flex items-center px-3.5 py-2 rounded-lg bg-white/5 text-[#e59b67] text-sm font-semibold cursor-pointer ${isRtl ? 'text-right justify-start' : 'text-left justify-start'}`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => handleNavClick('this-week-film')}
              className={`w-full min-h-[38px] flex items-center px-3.5 py-2 rounded-lg text-[#d1c8be] hover:bg-white/5 text-sm font-medium cursor-pointer ${isRtl ? 'text-right justify-start' : 'text-left justify-start'}`}
            >
              {t('nav.this_week_film')}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`w-full min-h-[38px] flex items-center px-3.5 py-2 rounded-lg text-[#d1c8be] hover:bg-white/5 text-sm font-medium cursor-pointer ${isRtl ? 'text-right justify-start' : 'text-left justify-start'}`}
            >
              {t('nav.how_it_works')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className={`w-full min-h-[38px] flex items-center px-3.5 py-2 rounded-lg text-[#d1c8be] hover:bg-white/5 text-sm font-medium cursor-pointer ${isRtl ? 'text-right justify-start' : 'text-left justify-start'}`}
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className={`w-full min-h-[38px] flex items-center px-3.5 py-2 rounded-lg text-[#d1c8be] hover:bg-white/5 text-sm font-medium cursor-pointer ${isRtl ? 'text-right justify-start' : 'text-left justify-start'}`}
            >
              {t('nav.contact')}
            </button>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                if (isFull) return;
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              disabled={isFull}
              className={`w-full min-h-[42px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                isFull
                  ? 'bg-[#332b26] text-[#a39487] border border-white/10 cursor-not-allowed opacity-85 shadow-none'
                  : 'bg-[#c27847] hover:bg-[#a86134] text-white cursor-pointer active:scale-98'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>{isFull ? (lang === 'fa' ? 'ظرفیت این دورهمی تکمیل شده' : 'This gathering is fully booked') : t('nav.reserve')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
