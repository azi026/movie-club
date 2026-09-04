import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isRtl: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fa: {
    // Nav
    'nav.home': 'صفحه اصلی',
    'nav.this_week_film': 'فیلم این هفته',
    'nav.how_it_works': 'روند دورهمی',
    'nav.about': 'درباره ما',
    'nav.contact': 'تماس با ما',
    'nav.reserve': 'رزرو جای من',
    'brand.title': 'MOVIE CLUB',
    'brand.subtitle': 'ENGLISH CONVERSATION CLUB',

    // Hero
    'hero.badge': 'تماشای فیلم • کافه دنج • گفتگوی انگلیسی',
    'hero.title_line1': 'فیلم ببین،',
    'hero.title_line2': 'انگلیسی حرف بزن.',
    'hero.desc':
      'هر هفته یک فیلم می‌بینیم، در کافه دور هم جمع می‌شویم و در فضایی دوستانه و صمیمی درباره‌اش به انگلیسی گفتگو می‌کنیم.',
    'hero.pill_film': 'فیلم سینمایی',
    'hero.pill_cafe': 'دورهمی در کافه',
    'hero.pill_convo': 'گفتگوی انگلیسی',
    'hero.reassurance_badge': 'لازم نیست انگلیسی‌ات عالی باشه؛ فقط کافیه بخوای حرف بزنی.',
    'hero.cta_primary': 'رزرو جای من',
    'hero.cta_secondary': 'درباره این فیلم',

    // How it works
    'how.title': 'روند دورهمی',
    'how.subtitle': '۳ گام ساده برای یک تجربه دوستانه',

    // Mid cards
    'film.badge': 'فیلم این هفته',
    'film.genre': 'ژانر:',
    'film.duration': 'مدت زمان:',
    'film.year': 'سال ساخت:',
    'film.director': 'کارگردان:',
    'film.view_prompts': 'مشاهده سوالات گفتگو و واژگان',

    // Beginner Reassurance
    'reassurance.q': 'انگلیسی‌ام خیلی خوب نیست؛ می‌تونم بیام؟',
    'reassurance.answer': 'حتماً!',
    'reassurance.body':
      'اینجا کلاس درس یا آزمون زبان نیست و قرار نیست بی‌نقص صحبت کنی. فیلم فقط یک بهانه برای شروع گفتگوست؛ هر چقدر که راحتی گوش بده، ایده بده و کم‌کم صحبت کن.',
    'reassurance.footer': 'یک جمع دوستانه و بدون قضاوت؛ فقط کافیست بخواهی تجربه کنی.',

    // Gathering Card
    'gathering.title': 'دورهمی این هفته',
    'gathering.quote': 'یک عصر صمیمی با فیلم، گفتگو و قهوه؛ جایی برای ارتباط، شنیدن دیدگاه‌های تازه و دوستان جدید.',
    'gathering.small_community': 'جمعمون کوچیکه تا فرصت گفتگو برای همه باشه.',
    'gathering.reserve_btn': 'رزرو جای من',
    'gathering.fully_booked': 'ظرفیت این دورهمی تکمیل شده',
    'gathering.time_label': 'ساعت',

    // Footer
    'footer.tagline': 'فیلم، بهانه‌ای دلنشین برای گفتگوی انگلیسی در کافه.',
    'footer.quick_links': 'دسترسی سریع',
    'footer.about_links': 'درباره ما',
    'footer.our_story': 'داستان ما',
    'footer.hosts': 'میزبان‌ها',
    'footer.privacy': 'حریم خصوصی',
    'footer.faq': 'سوالات متداول',
    'footer.stay_connected': 'ارتباط با ما',
    'footer.rights': '© 2024 Movie Club. تمامی حقوق محفوظ است.',

    // Modal
    'modal.reserve_title': 'رزرو حضور در دورهمی این هفته',
    'modal.step1': 'انتخاب سطح و حس‌و‌حال',
    'modal.step2': 'اطلاعات تماس',
    // Cost/fee commented out for free reservation:
    // 'modal.step3': 'پرداخت و تکمیل رزرو',
    'modal.step3': 'تکمیل رزرو',
    // 'modal.step4': 'درخواست رزرو ثبت شد',
    'modal.step4': 'رزرو تأیید شد',
    'modal.close': 'بستن',
    'modal.level_newbie': 'تازه‌کار — بیشتر دوست دارم گوش بدم و کم‌کم وارد گفتگو بشم',
    'modal.level_newbie_desc': 'اگر صحبت کردن برات سخته، هیچ اشکالی نداره؛ می‌تونی بیشتر گوش بدی و هر وقت راحت بودی صحبت کنی.',
    'modal.level_beginner': 'مبتدی — با جمله‌های کوتاه و ساده صحبت می‌کنم',
    'modal.level_beginner_desc': 'می‌تونم درباره موضوعات ساده با جمله‌های کوتاه صحبت کنم.',
    'modal.level_intermediate': 'متوسط — می‌تونم نظرم رو بیان کنم',
    'modal.level_intermediate_desc': 'می‌تونم درباره فیلم، شخصیت‌ها و احساساتم توضیح بدم و وارد گفتگو بشم.',
    'modal.level_advanced': 'پیشرفته — از گفت‌وگوی عمیق لذت می‌برم',
    'modal.level_advanced_desc': 'می‌تونم درباره موضوعات پیچیده‌تر، فلسفی و سینمایی راحت گفتگو کنم.',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.this_week_film': "This Week's Film",
    'nav.how_it_works': 'The Experience',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.reserve': 'Reserve My Seat',
    'brand.title': 'MOVIE CLUB',
    'brand.subtitle': 'ENGLISH CONVERSATION CLUB',

    // Hero
    'hero.badge': 'Watch a film • Meet at a café • Speak English',
    'hero.title_line1': 'Watch a film,',
    'hero.title_line2': 'speak English.',
    'hero.desc':
      'Every week we watch a film, meet at a cozy café, and talk about its stories, characters, and themes in a warm, friendly atmosphere.',
    'hero.pill_film': 'Cinema & Stories',
    'hero.pill_cafe': 'Cozy Café Gathering',
    'hero.pill_convo': 'English Conversation',
    'hero.reassurance_badge': "You don't need perfect English; just the willingness to speak.",
    'hero.cta_primary': 'Reserve My Seat',
    'hero.cta_secondary': 'About This Film',

    // How it works
    'how.title': 'How It Works',
    'how.subtitle': 'Simple & stress-free: 3 steps to a relaxed social gathering',

    // Mid cards
    'film.badge': "This Week's Film",
    'film.genre': 'Genre:',
    'film.duration': 'Duration:',
    'film.year': 'Year:',
    'film.director': 'Director:',
    'film.view_prompts': 'View Discussion Prompts & Vocab',

    // Beginner Reassurance
    'reassurance.q': "My English isn't great; can I still join?",
    'reassurance.answer': 'Absolutely!',
    'reassurance.body':
      "This is not a language school or an exam. The film is simply a natural conversation starter. Listen, share thoughts, or speak at whatever pace feels comfortable.",
    'reassurance.footer': 'A welcoming, judgment-free circle where everyone participates at their own pace.',

    // Gathering Card
    'gathering.title': "This Week's Gathering",
    'gathering.quote':
      'An intimate evening with film, conversation, and coffee. A place for genuine connection and fresh perspectives.',
    'gathering.small_community': 'Our circle is kept small so everyone has a chance to speak.',
    'gathering.reserve_btn': 'Reserve My Seat',
    'gathering.fully_booked': 'This gathering is fully booked',
    'gathering.time_label': 'Time',

    // Footer
    'footer.tagline': 'Cinema, a delightful excuse to speak English over coffee.',
    'footer.quick_links': 'Quick Links',
    'footer.about_links': 'About Us',
    'footer.our_story': 'Our Story',
    'footer.hosts': 'Hosts & Facilitators',
    'footer.privacy': 'Privacy Policy',
    'footer.faq': 'FAQ',
    'footer.stay_connected': 'Connect With Us',
    'footer.rights': '© 2024 Movie Club. All rights reserved.',

    // Modal
    'modal.reserve_title': "Reserve Your Seat for This Week's Gathering",
    'modal.step1': 'Level & Comfort',
    'modal.step2': 'Contact Details',
    // Cost/fee commented out for free reservation:
    // 'modal.step3': 'Payment & Complete',
    'modal.step3': 'Confirm Reservation',
    // 'modal.step4': 'Request Submitted',
    'modal.step4': 'Reservation Confirmed',
    'modal.close': 'Close',
    'modal.level_newbie': 'Newcomer — I prefer to mostly listen and ease into conversation',
    'modal.level_newbie_desc': 'If speaking feels tough right now, no worries; feel free to listen and jump in whenever comfortable.',
    'modal.level_beginner': 'Beginner — I speak using short and simple sentences',
    'modal.level_beginner_desc': 'I can talk about simple topics using short phrases and sentences.',
    'modal.level_intermediate': 'Intermediate — I can express my opinions',
    'modal.level_intermediate_desc': 'I can describe the film, characters, and emotions and join conversations easily.',
    'modal.level_advanced': 'Advanced — I enjoy deep conversations',
    'modal.level_advanced_desc': 'I feel comfortable discussing complex, philosophical, and cinematic themes.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('fa');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const isRtl = lang === 'fa';

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
