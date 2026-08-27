import React from 'react';
import { ArrowLeft, ArrowRight, Clapperboard, Coffee, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HOW_IT_WORKS_STEPS } from '../data/movieClubData';

export const HowItWorksSection: React.FC = () => {
  const { isRtl, lang, t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'film':
        return <Clapperboard className="w-5 h-5 text-[#2a2420]" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-[#2a2420]" />;
      case 'message-circle':
      default:
        return <MessageSquare className="w-5 h-5 text-[#2a2420]" />;
    }
  };

  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 sm:scroll-mt-20 relative w-full bg-[#f4ede4] text-[#241f1c] py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-y border-[#e2d5c5]"
    >
      {/* Subtle warm ambient bridge at top & bottom edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c27847]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c27847]/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Centered Heading with subtle warm rule */}
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="flex items-center justify-center gap-3 mb-1.5">
            <div className="w-8 sm:w-10 h-[1.5px] bg-[#c27847]/35" />
            <h2
              id="how-it-works-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#1a1715] tracking-tight"
            >
              {t('how.title')}
            </h2>
            <div className="w-8 sm:w-10 h-[1.5px] bg-[#c27847]/35" />
          </div>
          <p
            id="how-it-works-subtitle"
            className="text-xs sm:text-sm text-[#6b5e52] font-medium"
          >
            {t('how.subtitle')}
          </p>
        </div>

        {/* 3-Step Horizontal Connected Cards (Watch -> Meet -> Talk) */}
        <div
          id="how-it-works-steps-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 relative items-stretch"
        >
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;
            const title = lang === 'fa' ? step.titleFa : step.titleEn;
            const desc = lang === 'fa' ? step.descFa : step.descEn;

            return (
              <div key={step.stepNumber} className="relative flex flex-col items-center w-full">
                {/* Step Card */}
                <div
                  id={`how-it-works-step-${step.stepNumber}`}
                  className="w-full h-full bg-[#fdfcfb] rounded-2xl p-4 sm:p-5 border border-[#e6ded3] shadow-sm hover:shadow-md hover:border-[#c27847]/30 transition-all duration-200 flex flex-col items-center text-center relative group"
                >
                  {/* Step Number Badge */}
                  <div
                    className={`absolute top-3.5 ${isRtl ? 'right-3.5' : 'left-3.5'} w-6 h-6 rounded-full bg-[#241f1c] text-[#f7f3ed] font-bold text-xs flex items-center justify-center shadow-sm`}
                  >
                    {step.stepNumber}
                  </div>

                  {/* Icon Container */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ede3d5] border border-[#e0d4c3] flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-105 transition-transform duration-200">
                    {getIcon(step.icon)}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#1a1715] mb-1">
                    {title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-xs text-[#665a4e] leading-relaxed max-w-xs px-1">
                    {desc}
                  </p>
                </div>

                {/* Connector Arrow for Desktop */}
                {!isLast && (
                  <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-3 lg:-left-3.5 z-10 text-[#c27847]/60 pointer-events-none">
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
