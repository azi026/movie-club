import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { MovieData, GatheringData } from "../types";
import {
  formatSessionDate,
  formatSessionDayOfWeek,
  formatSessionTime,
  toPersianDigits,
} from "../utils/dateFormatter";

export interface ActiveSessionInfo extends GatheringData {
  id?: string;
  movieId?: string;
  capacity?: number;
  rawDate: string;
  rawTime: string;
  locationNameFa: string;
  locationNameEn: string;
  locationAddressFa: string;
  locationAddressEn: string;
}

interface SessionContextType {
  hasActiveSession: boolean;
  session: ActiveSessionInfo | null;
  movie: MovieData | null;
  isLoading: boolean;
  error: string | null;
  isFull: boolean;
  isCapacityLoading: boolean;
  refetch: () => Promise<void>;
  refreshCapacity: () => Promise<void>;
  getDateDisplay: (lang: "fa" | "en") => string;
  getTimeDisplay: (lang: "fa" | "en") => string;
}

const SessionContext = createContext<SessionContextType>({
  hasActiveSession: false,
  session: null,
  movie: null,
  isLoading: true,
  error: null,
  isFull: false,
  isCapacityLoading: false,
  refetch: async () => {},
  refreshCapacity: async () => {},
  getDateDisplay: () => "",
  getTimeDisplay: () => "",
});

export const useSession = () => useContext(SessionContext);

function mapMovieData(
  raw: any,
  questionsRaw?: any[],
  vocabRaw?: any[],
): MovieData {
  const durationMin =
    raw.duration_minutes ||
    raw.durationMinutes ||
    (typeof raw.duration === "number" ? raw.duration : null);
  const durationStr = durationMin
    ? `${durationMin} min`
    : raw.duration || "90 min";
  const durationFaStr = durationMin
    ? `${toPersianDigits(durationMin)} دقیقه`
    : raw.duration_fa || raw.durationFa || "۹۰ دقیقه";

  const rawGenreEn = raw.genre || raw.genre_en || raw.genres;
  const genreEnStr = Array.isArray(rawGenreEn)
    ? rawGenreEn.join(", ")
    : rawGenreEn || "Cinema";

  const rawGenreFa = raw.genre_fa || raw.genreFa;
  const genreFaStr = Array.isArray(rawGenreFa)
    ? rawGenreFa.join("، ")
    : rawGenreFa || "سینما";

  let discussionQuestions: { en: string; fa: string }[] = [];
  if (Array.isArray(questionsRaw) && questionsRaw.length > 0) {
    discussionQuestions = questionsRaw.map((q) => ({
      en: q.question_en || "",
      fa: q.question_fa || "",
    }));
  }

  let vocabulary: {
    term: string;
    definitionFa: string;
    definitionEn: string;
    example: string;
  }[] = [];
  if (Array.isArray(vocabRaw) && vocabRaw.length > 0) {
    vocabulary = vocabRaw.map((v) => ({
      term: v.word_en || "",
      definitionFa: v.meaning_fa || "",
      definitionEn: v.meaning_en || v.meaning_fa || "",
      example: v.example_en || "",
    }));
  }

  return {
    id: String(raw.id || "film-active"),
    title: raw.title || raw.title_en || raw.titleEn || "Movie Club Film",
    titleFa: raw.title_fa || raw.titleFa || raw.title_fa_ir || "فیلم کلاب",
    director: raw.director_en || raw.director || "Director",
    directorFa: raw.director_fa || raw.directorFa || "کارگردان",
    year: Number(raw.year || raw.release_year || new Date().getFullYear()),
    duration: durationStr,
    durationFa: durationFaStr,
    genre: genreEnStr,
    genreFa: genreFaStr,
    synopsis: raw.synopsis || raw.synopsis_en || raw.description_en || "",
    synopsisFa: raw.synopsis_fa || raw.synopsisFa || raw.description_fa || "",
    image: raw.image || raw.poster_url || raw.backdrop_url || "",
    discussionQuestions,
    vocabulary,
  };
}

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<ActiveSessionInfo | null>(null);
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [hasActiveSession, setHasActiveSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCapacityLoading, setIsCapacityLoading] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCapacityStatus = useCallback(
    async (sessionId: string | number) => {
      try {
        setIsCapacityLoading(true);
        const { data, error: capErr } = await supabase.rpc(
          "get_session_capacity_status",
          {
            p_session_id: Number(sessionId),
          },
        );

        if (capErr) {
          console.warn("Supabase capacity status query note:", capErr.message);
        } else if (data && typeof data === "object") {
          setIsFull(Boolean(data.is_full));
        }
      } catch (err: any) {
        console.warn("Error querying capacity status:", err);
      } finally {
        setIsCapacityLoading(false);
      }
    },
    [],
  );

  const fetchActiveSessionAndMovie = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch active session where is_active = true
      const { data: sessionData, error: sessionErr } = await supabase
        .from("sessions")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sessionErr) {
        console.warn("Supabase sessions query note:", sessionErr.message);
        setError(sessionErr.message);
        setSession(null);
        setMovie(null);
        setHasActiveSession(false);
        setIsFull(false);
        setIsLoading(false);
        return;
      }

      if (sessionData) {
        const rawDate =
          sessionData.session_date ||
          sessionData.sessionDate ||
          sessionData.date ||
          "";
        const rawTime =
          sessionData.session_time ||
          sessionData.sessionTime ||
          sessionData.time ||
          "17:00";

        const locationNameFa =
          sessionData.location_name_fa || sessionData.locationNameFa || "کافه";
        const locationNameEn =
          sessionData.location_name_en || sessionData.locationNameEn || "Cafe";
        const locationAddressFa =
          sessionData.location_address_fa ||
          sessionData.locationAddressFa ||
          "تهران";
        const locationAddressEn =
          sessionData.location_address_en ||
          sessionData.locationAddressEn ||
          "Tehran";

        const formattedDateFa = formatSessionDate(rawDate, "fa");
        const formattedDateEn = formatSessionDate(rawDate, "en");
        const dayOfWeekFa = formatSessionDayOfWeek(rawDate, "fa");
        const dayOfWeekEn = formatSessionDayOfWeek(rawDate, "en");

        const activeSession: ActiveSessionInfo = {
          id: String(sessionData.id),
          movieId: sessionData.movie_id || sessionData.movieId,
          capacity:
            sessionData.capacity !== undefined && sessionData.capacity !== null
              ? Number(sessionData.capacity)
              : 8,
          rawDate,
          rawTime,
          locationNameFa,
          locationNameEn,
          locationAddressFa,
          locationAddressEn,
          dateFa: formattedDateFa,
          dateEn: formattedDateEn,
          dayOfWeekFa,
          dayOfWeekEn,
          time: rawTime,
          cafeNameFa: locationNameFa,
          cafeNameEn: locationNameEn,
          locationFa: locationAddressFa,
          locationEn: locationAddressEn,
          addressFa: locationAddressFa,
          addressEn: locationAddressEn,
          hostFa:
            sessionData.host_fa ||
            sessionData.hostFa ||
            "برگزارکننده مووی کلاب",
          hostEn:
            sessionData.host_en || sessionData.hostEn || "Movie Club Host",
          priceNoteFa:
            sessionData.price_note_fa ||
            "هزینه سفارش شخصی در کافه به عهده هر شرکت‌کننده است",
          priceNoteEn:
            sessionData.price_note_en ||
            "Personal cafe orders are covered individually",
          image:
            sessionData.image_url ||
            sessionData.image ||
            "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80",
        };

        setSession(activeSession);
        setHasActiveSession(true);

        // Fetch capacity status for active session via RPC
        await fetchCapacityStatus(sessionData.id);

        // 2. Fetch related movie from public.movies
        const movieId = sessionData.movie_id || sessionData.movieId;
        if (movieId) {
          const { data: movieData, error: movieErr } = await supabase
            .from("movies")
            .select("*")
            .eq("id", movieId)
            .maybeSingle();

          if (movieErr) {
            console.warn("Supabase movie query note:", movieErr.message);
            setMovie(null);
          } else if (movieData) {
            // 3. Fetch discussion questions from movie_discussion_questions
            const { data: questionsData, error: questionsErr } = await supabase
              .from("movie_discussion_questions")
              .select("*")
              .eq("movie_id", movieId)
              .order("display_order", { ascending: true });

            if (questionsErr) {
              console.warn(
                "Supabase discussion questions query note:",
                questionsErr.message,
              );
            }

            // 4. Fetch vocabulary from movie_vocabulary
            const { data: vocabData, error: vocabErr } = await supabase
              .from("movie_vocabulary")
              .select("*")
              .eq("movie_id", movieId)
              .order("display_order", { ascending: true });

            if (vocabErr) {
              console.warn("Supabase vocabulary query note:", vocabErr.message);
            }

            setMovie(
              mapMovieData(movieData, questionsData || [], vocabData || []),
            );
          } else {
            setMovie(null);
          }
        } else {
          setMovie(null);
        }
      } else {
        // No active session found (is_active = true)
        setSession(null);
        setMovie(null);
        setHasActiveSession(false);
        setIsFull(false);
      }
    } catch (err: any) {
      console.warn("Error querying active session from Supabase:", err);
      setError(err?.message || "Connection error");
      setSession(null);
      setMovie(null);
      setHasActiveSession(false);
      setIsFull(false);
    } finally {
      setIsLoading(false);
    }
  }, [fetchCapacityStatus]);

  const refreshCapacity = useCallback(async () => {
    if (session?.id) {
      await fetchCapacityStatus(session.id);
    }
  }, [session?.id, fetchCapacityStatus]);

  useEffect(() => {
    fetchActiveSessionAndMovie();
  }, [fetchActiveSessionAndMovie]);

  const getDateDisplay = useCallback(
    (lang: "fa" | "en") => {
      if (!session || !session.rawDate) {
        return lang === "fa"
          ? "جلسه بعدی به‌زودی اعلام می‌شود"
          : "Next gathering will be announced soon";
      }
      return formatSessionDate(session.rawDate, lang);
    },
    [session],
  );

  const getTimeDisplay = useCallback(
    (lang: "fa" | "en") => {
      if (!session || !session.rawTime) {
        return "";
      }
      return formatSessionTime(session.rawTime, lang);
    },
    [session],
  );

  return (
    <SessionContext.Provider
      value={{
        hasActiveSession,
        session,
        movie,
        isLoading,
        error,
        isFull,
        isCapacityLoading,
        refetch: fetchActiveSessionAndMovie,
        refreshCapacity,
        getDateDisplay,
        getTimeDisplay,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
