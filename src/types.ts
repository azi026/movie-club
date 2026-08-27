export type Language = 'fa' | 'en';

export interface MovieData {
  id: string;
  title: string;
  titleFa: string;
  director: string;
  directorFa: string;
  year: number;
  duration: string;
  durationFa: string;
  genre: string;
  genreFa: string;
  synopsis: string;
  synopsisFa: string;
  image: string;
  discussionQuestions: {
    en: string;
    fa: string;
  }[];
  vocabulary: {
    term: string;
    phonetic?: string;
    definitionFa: string;
    definitionEn: string;
    example: string;
  }[];
}

export interface GatheringData {
  dateFa: string;
  dateEn: string;
  dayOfWeekFa: string;
  dayOfWeekEn: string;
  time: string;
  cafeNameFa: string;
  cafeNameEn: string;
  locationFa: string;
  locationEn: string;
  addressFa: string;
  addressEn: string;
  hostFa: string;
  hostEn: string;
  priceNoteFa: string;
  priceNoteEn: string;
  image: string;
}

export interface ReservationPayload {
  fullName: string;
  contact: string;
  email: string;
  englishLevel: 'newbie' | 'beginner' | 'intermediate' | 'advanced' | 'listen_first';
  notes?: string;
  drinkPreference?: string;
}
