import React, { useState } from 'react';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { FaqModal } from './components/FaqModal';
import { FilmDetailsModal } from './components/FilmDetailsModal';
import { Footer } from './components/Footer';
import { GatheringCard } from './components/GatheringCard';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { MidRowCards } from './components/MidRowCards';
import { Navbar } from './components/Navbar';
import { ReservationModal } from './components/ReservationModal';
import { LanguageProvider } from './context/LanguageContext';

export function MovieClubApp() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isFilmDetailsOpen, setIsFilmDetailsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const scrollToSection = (id: string) => {
    // Timeout allows mobile drawer unmount / layout shifts to settle before measuring position
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#121110] text-[#f5f1eb] flex flex-col antialiased selection:bg-[#c27847] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenFilmDetails={() => setIsFilmDetailsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 2. Cinematic Hero */}
        <HeroSection
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenFilmDetails={() => setIsFilmDetailsOpen(true)}
        />

        {/* 3. How It Works */}
        <HowItWorksSection />

        {/* 4. This Week's Film + 5. Beginner Reassurance + 6. Benefits */}
        <MidRowCards
          onOpenFilmDetails={() => setIsFilmDetailsOpen(true)}
        />

        {/* 7. This Week's Gathering */}
        <GatheringCard
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenFaq={() => setIsFaqOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* Interactive Modals */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <FilmDetailsModal
        isOpen={isFilmDetailsOpen}
        onClose={() => setIsFilmDetailsOpen(false)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MovieClubApp />
    </LanguageProvider>
  );
}
