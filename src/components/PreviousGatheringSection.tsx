import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";
import { Play } from "lucide-react";
import { formatSessionDate, formatSessionTime } from "../utils/dateFormatter";
export const PreviousGatheringSection: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(false);
  const { lang } = useLanguage();
  const [previousSession, setPreviousSession] = useState<any>(null);
  const [previousMovie, setPreviousMovie] = useState<any>(null);
  useEffect(() => {
    const fetchPreviousGathering = async () => {
      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .select("*")
        .eq("is_active", false)
        .order("session_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (sessionError) {
        console.error("Previous session error:", sessionError);
        return;
      }

      if (sessionData) {
        setPreviousSession(sessionData);
        const { data: movieData, error: movieError } = await supabase
          .from("movies")
          .select("*")
          .eq("id", sessionData.movie_id)
          .maybeSingle();

        if (movieError) {
          console.error("Previous movie error:", movieError);
          return;
        }

        if (movieData) {
          setPreviousMovie(movieData);
        }
      }
    };

    fetchPreviousGathering();
  }, []);
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#c27847] text-sm font-bold tracking-wide">
          {lang === "fa"
            ? "یک گفت‌وگوی واقعی، نه یک کلاس زبان"
            : "A Real Conversation, Not a Classroom"}
        </p>

        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#f4efe8]">
          {lang === "fa"
            ? previousMovie?.title_fa || previousMovie?.title || ""
            : previousMovie?.title || previousMovie?.title_en || ""}
        </h2>
        <p className="mt-3 text-sm text-[#a99b8d] max-w-md">
          {lang === "fa"
            ? "یک گفت‌وگوی واقعی از اعضای Movie Club بعد از تماشای فیلم"
            : "A real conversation from Movie Club members after the film"}
        </p>
        {previousSession && (
          <p className="mt-2 text-sm text-[#a99b8d]">
            {formatSessionDate(previousSession.session_date, lang)}
          </p>
        )}
        {previousSession && (
          <p className="mt-1 text-sm text-[#a99b8d]">
            {lang === "fa" ? "ساعت " : "Time "}
            {formatSessionTime(previousSession.session_time, lang)}
          </p>
        )}
        {previousSession && (
          <p className="mt-1 text-sm text-[#a99b8d]">
            {lang === "fa"
              ? previousSession.location_name_fa
              : previousSession.location_name_en}
          </p>
        )}
        {previousSession?.image_url && (
          <div className="mt-10 relative overflow-hidden rounded-3xl aspect-video">
            <img
              src={previousSession.image_url}
              alt={lang === "fa" ? "دورهمی قبلی" : " Previous Gathering"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-6 right-6">
              <span className="bg-black/50 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-xs text-[#f4e8d7]">
                دورهمی قبلی
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white">
                جلسه واقعی 🎥
              </span>

              <span className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white">
                دقیقه 17⏱
              </span>
            </div>
            {previousSession?.video_url && (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-black/70 shadow-xl">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </button>
            )}
          </div>
        )}
      </div>
      {showVideo && previousSession?.video_url && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-[90%] max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✕
            </button>

            <video
              src={previousSession.video_url}
              controls
              autoPlay
              className="w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
