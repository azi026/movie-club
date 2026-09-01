# Supabase Session Integration Report

This report outlines the complete integration of the active session and movie data from Supabase into the Movie Club web application.

---

## 1. Summary of Changes

The application now connects dynamically to Supabase using the existing Supabase client, fetches the active session (`is_active = true`), queries the related movie from `public.movies` using `movie_id`, and delivers the data across all UI components via a centralized `SessionContext`.

- **Visual Design & Styling**: Kept 100% intact (layout, typography, colors, responsive design, and spacing are unchanged).
- **Reservation Flow**: Kept 100% intact (all steps, card-to-card transfer, copy action, and Supabase insertion logic preserved).
- **Persian / English Localization**: Fully dynamic formatting with Persian Solar Hijri calendar and Persian digits (`۰-۹`) in Persian mode, and Gregorian calendar in English mode.

---

## 2. Files Modified

| File Path | Summary of Changes |
| :--- | :--- |
| `/src/App.tsx` | Wrapped the application in `<SessionProvider>` inside `<LanguageProvider>` so all components can access dynamic session and movie state. |
| `/src/components/GatheringCard.tsx` | Connected to `useSession()` for session date (`getDateDisplay`), time (`getTimeDisplay`), cafe name (`session.locationNameFa` / `session.locationNameEn`), address (`session.locationAddressFa` / `session.locationAddressEn`), capacity, and image. |
| `/src/components/MidRowCards.tsx` | Connected to `useSession()` to display the active movie title, poster image, genre, duration, release year, and director. |
| `/src/components/FilmDetailsModal.tsx` | Connected to `useSession()` for film overview, synopsis, director, duration, discussion prompts, vocabulary, and footer session date/time. |
| `/src/components/ReservationModal.tsx` | Connected to `useSession()` in the modal header, Step 3 payment summary, and Step 4 confirmation pass. |
| `/src/lib/supabase.ts` | Configured with project endpoint credentials and environment variable fallback support. |

---

## 3. Files Created

| File Path | Summary of Purpose |
| :--- | :--- |
| `/src/context/SessionContext.tsx` | Global React context and hook (`useSession`) that queries `public.sessions` (`WHERE is_active = true`) and `public.movies` (`WHERE id = movie_id`), exposes state, formatting helpers, loading flags, error handling, and manual refetch. |
| `/src/utils/dateFormatter.ts` | Localization utility functions for Persian Solar Hijri (`fa-IR-u-ca-persian`) and English Gregorian (`en-US`), with Persian digit conversion (`۰-۹`). |
| `/SUPABASE_SESSION_INTEGRATION_REPORT.md` | This integration and architecture report. |

---

## 4. Query Architecture & Data Flow

### Active Session Fetching
```typescript
const { data: sessionData, error: sessionErr } = await supabase
  .from('sessions')
  .select('*')
  .eq('is_active', true)
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle();
```

### Related Movie Fetching
```typescript
const movieId = sessionData.movie_id || sessionData.movieId;
if (movieId) {
  const { data: movieData, error: movieErr } = await supabase
    .from('movies')
    .select('*')
    .eq('id', movieId)
    .maybeSingle();
}
```

---

## 5. Persian and English Date/Time Formatting

- **Persian Mode (`fa`)**:
  - Uses `Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday: 'long', month: 'long', day: 'numeric' })`
  - Numbers and hours are converted to Persian digits (e.g. `۱۷:۰۰`, `یکشنبه، ۸ شهریور`, `ظرفیت صمیمانه ۸ نفره`).
- **English Mode (`en`)**:
  - Uses `Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' })`
  - Formats dates as standard Gregorian (e.g. `Sunday, Aug 30 • 17:00`).

---

## 6. Loading, Error & Fallback Handling

- **Initial / Loading State**: While fetching, the UI smoothly displays default structured session and movie data without layout shifts or flashes of unstyled content.
- **Offline / Error Fallback**: If the network request fails or no active session is returned, the app gracefully falls back to predefined default club data while logging helpful diagnostic warnings to the developer console.

---

## 7. Confirmation

- **Visual Design**: Unchanged.
- **Responsive Behavior**: Unchanged.
- **Reservation Flow & Logic**: Unchanged.
