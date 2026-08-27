import heroCafeImg from '../assets/images/hero_cafe_conversation_1787730971108.jpg';
import filmPastLivesImg from '../assets/images/film_past_lives_1787730991888.jpg';
import gatheringCandleImg from '../assets/images/gathering_candle_coffee_1787731009463.jpg';
import { GatheringData, MovieData } from '../types';

export const CURRENT_MOVIE: MovieData = {
  id: 'past-lives-2023',
  title: 'PAST LIVES',
  titleFa: 'زندگی‌های گذشته',
  director: 'Celine Song',
  directorFa: 'سلین سونگ',
  year: 2023,
  duration: '105 min',
  durationFa: '۱۰۵ دقیقه',
  genre: 'Drama, Romance',
  genreFa: 'درام، عاشقانه',
  image: filmPastLivesImg,
  synopsis:
    'Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora’s family emigrates from South Korea. Two decades later, they are reunited in New York for one fateful week as they confront notions of destiny, love, and the choices that make a life.',
  synopsisFa:
    'نورا و هه‌سونگ، دو دوست دوران کودکی که پیوند عمیقی با هم دارند، پس از مهاجرت خانواده نورا از کره جنوبی از یکدیگر جدا می‌شوند. دو دهه بعد، آنها برای یک هفته سرنوشت‌ساز در نیویورک دوباره یکدیگر را می‌بینند و با مفاهیمی چون تقدیر، عشق و انتخاب‌هایی که زندگی ما را می‌سازند روبرو می‌شوند.',
  discussionQuestions: [
    {
      en: 'What does the concept of "In-Yun" (fate / past connections) mean to you personally?',
      fa: 'مفهوم «این-یون» (سرنوشت و پیوندهای زندگی‌های گذشته) برای شما شخصاً چه معنایی دارد؟',
    },
    {
      en: 'How does Nora’s journey reflect the identity shift experienced after immigration?',
      fa: 'سفر نورا چگونه دگرگونی هویت پس از مهاجرت را به تصویر می‌کشد؟',
    },
    {
      en: 'Was Arthur (Nora’s husband) understanding, or would you react differently?',
      fa: 'آیا آرتور (همسر نورا) درک‌کننده بود یا شما واکنش متفاوتی نشان می‌دادید؟',
    },
    {
      en: 'If you met a close friend from your childhood after 20 years, what would you say first?',
      fa: 'اگر بعد از ۲۰ سال یکی از نزدیک‌ترین دوستان کودکی‌تان را ببینید، اولین جمله‌ای که می‌گویید چیست؟',
    },
  ],
  vocabulary: [
    {
      term: 'In-Yun (인연)',
      phonetic: '/in-yʌn/',
      definitionFa: 'سرنوشت یا اتصال معنوی بین دو نفر از زندگی‌های گذشته',
      definitionEn: 'A Korean concept of fate and providence connecting souls through past incarnations',
      example: 'Even strangers brushing shoulders in the street might have 8,000 layers of In-Yun.',
    },
    {
      term: 'Bittersweet',
      phonetic: '/ˈbɪt.əˌswiːt/',
      definitionFa: 'حس آمیخته از غم و شادی، نوستالژیک و دلنشین',
      definitionEn: 'Pleasant with an element of suffering or regret',
      example: 'Their final goodbye at the taxi was a truly bittersweet moment.',
    },
    {
      term: 'Reconnection',
      phonetic: '/ˌriː.kəˈnek.ʃən/',
      definitionFa: 'برقراری مجدد ارتباط بعد از مدتی دوری',
      definitionEn: 'The act of coming together again after being separated',
      example: 'The film captures the tender awkwardness of reconnecting after 24 years.',
    },
    {
      term: 'Destiny vs Choice',
      phonetic: '/ˈdes.tɪ.ni/',
      definitionFa: 'تقابل سرنوشت و انتخاب‌های ارادی انسان',
      definitionEn: 'The tension between what is fated to happen and what we actively decide',
      example: 'Did they choose to drift apart, or was it simply destiny taking over?',
    },
  ],
};

export const PAYMENT_CONFIG = {
  priceToman: 280000,
  priceFormattedFa: '۲۸۰,۰۰۰',
  priceFormattedEn: '280,000 Toman',
  cardNumber: '6037998123456789',
  cardNumberFormatted: '۶۰۳۷ - ۹۹۸۱ - ۲۳۴۵ - ۶۷۸۹',
  cardHolderNameFa: 'هانیه میرابوالقاسمی',
  cardHolderNameEn: 'Hanieh Mirabolghasemi',
  supportLink: 'https://t.me/movieclub_support',
};

export const CURRENT_GATHERING: GatheringData = {
  dateFa: 'یکشنبه، ۲۸ مهر',
  dateEn: 'Sunday, Oct 20',
  dayOfWeekFa: 'یکشنبه',
  dayOfWeekEn: 'Sunday',
  time: '17:00',
  cafeNameFa: 'کافه هاستیک',
  cafeNameEn: 'Cafe Hasmik',
  locationFa: 'خیابان الغدیر، غدیر 10',
  locationEn: 'Al-Ghadir Street, Ghadir 10',
  addressFa: 'خیابان الغدیر، غدیر 10',
  addressEn: 'Al-Ghadir Street, Ghadir 10',
  hostFa: 'الهه و هانیه (برگزارکننده)',
  hostEn: 'Arash & Niloofar (Friendly Facilitators)',
  priceNoteFa: 'هزینه نوشیدنی/سفارش شخصی در کافه به عهده هر شرکت‌کننده است',
  priceNoteEn: 'Each attendee covers their own beverage/order at the café',
  image: gatheringCandleImg,
};

export const HERO_ASSET = heroCafeImg;

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: 1,
    titleFa: 'فیلم را ببین',
    titleEn: 'Watch the Film',
    descFa: 'فیلم منتخب هفته را قبل از دورهمی تماشا کن.',
    descEn: 'Watch the selected film at home before our gathering.',
    icon: 'film',
  },
  {
    stepNumber: 2,
    titleFa: 'به دورهمی بیا',
    titleEn: 'Join the Gathering',
    descFa: 'یکشنبه ساعت 17:00 در کافه دور هم جمع می‌شویم.',
    descEn: 'Meet us at the cozy café on Sunday at 17:00.',
    icon: 'coffee',
  },
  {
    stepNumber: 3,
    titleFa: 'به اندازه‌ای که راحتی، صحبت کن',
    titleEn: 'Speak at Your Own Pace',
    descFa: 'گوش بده، نظر بده، سوال بپرس و از گفتگو لذت ببر. فشار هیچ‌جایی نیست!',
    descEn: 'Listen, share thoughts, ask questions, or just enjoy the vibe. No pressure at all!',
    icon: 'message-circle',
  },
];

export const BENEFITS = [
  {
    titleFa: 'فضای دوستانه و صمیمی',
    titleEn: 'Warm & Friendly Vibe',
    descFa: 'جمع‌های کوچک برای گفتگوهای راحت‌تر.',
    descEn: 'Intimate small circles designed for relaxed chatting.',
    icon: 'users',
  },
  {
    titleFa: 'بدون نگرانی از اشتباه',
    titleEn: 'No Pressure or Judgment',
    descFa: 'لازم نیست بی‌نقص حرف بزنی؛ اینجا همه برای گفتگو و تجربه کردن آمده‌اند.',
    descEn: "You don't need to speak perfectly; we are all here to converse and share experiences.",
    icon: 'star',
  },
  {
    titleFa: 'تمرکز روی مکالمه واقعی',
    titleEn: 'Focus on Real Conversation',
    descFa: 'به جای گرامر و امتحان، روی صحبت کردن تمرکز داریم.',
    descEn: 'Real thoughts and ideas instead of rigid grammar drills.',
    icon: 'check-circle-2',
  },
  {
    titleFa: 'کافه و حال خوب',
    titleEn: 'Café & Good Energy',
    descFa: 'محیطی آرام، نوشیدنی دلخواه و گفتگوی لذت‌بخش.',
    descEn: 'Cozy setting, your favorite brew, and inspiring conversations.',
    icon: 'coffee',
  },
];
