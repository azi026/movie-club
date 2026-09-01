// Utility functions for formatting Persian (Solar Hijri) and English (Gregorian) dates & numbers

export function toPersianDigits(n: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/\d/g, (d) => persianDigits[parseInt(d, 10)] || d);
}

/**
 * Formats a date string (e.g. "2026-08-30" or ISO timestamp) into Persian or English localized text.
 */
export function formatSessionDate(dateStr: string | null | undefined, lang: 'fa' | 'en'): string {
  if (!dateStr) {
    return lang === 'fa' ? 'یکشنبه، ۸ شهریور' : 'Sunday, Aug 30';
  }

  try {
    // If it's already a Persian formatted string, return it for fa
    if (lang === 'fa' && /[\u0600-\u06FF]/.test(dateStr)) {
      return dateStr;
    }

    // Parse date parts safely avoiding UTC timezone offsets shifting the date
    let dateObj: Date;
    if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      const [year, month, day] = dateStr.split('T')[0].split('-').map(Number);
      dateObj = new Date(year, month - 1, day, 12, 0, 0);
    } else {
      dateObj = new Date(dateStr);
    }

    if (isNaN(dateObj.getTime())) {
      return dateStr;
    }

    if (lang === 'fa') {
      const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      const formatted = formatter.format(dateObj);
      return toPersianDigits(formatted);
    } else {
      const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
      return formatter.format(dateObj);
    }
  } catch (err) {
    console.warn('Error formatting date:', err);
    return dateStr;
  }
}

/**
 * Formats a time string (e.g. "17:00" or "17:00:00") into Persian (with Persian digits) or English.
 */
export function formatSessionTime(timeStr: string | null | undefined, lang: 'fa' | 'en'): string {
  if (!timeStr) return '17:00';
  
  // Strip seconds if present
  let cleanTime = timeStr;
  if (/^\d{1,2}:\d{2}:\d{2}/.test(timeStr)) {
    cleanTime = timeStr.slice(0, 5);
  }

  if (lang === 'fa') {
    return toPersianDigits(cleanTime);
  }
  return cleanTime;
}

export function formatSessionDayOfWeek(dateStr: string | null | undefined, lang: 'fa' | 'en'): string {
  if (!dateStr) {
    return lang === 'fa' ? 'یکشنبه' : 'Sunday';
  }

  try {
    let dateObj: Date;
    if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      const [year, month, day] = dateStr.split('T')[0].split('-').map(Number);
      dateObj = new Date(year, month - 1, day, 12, 0, 0);
    } else {
      dateObj = new Date(dateStr);
    }

    if (isNaN(dateObj.getTime())) {
      return lang === 'fa' ? 'یکشنبه' : 'Sunday';
    }

    if (lang === 'fa') {
      const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday: 'long' });
      return formatter.format(dateObj);
    } else {
      const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
      return formatter.format(dateObj);
    }
  } catch {
    return lang === 'fa' ? 'یکشنبه' : 'Sunday';
  }
}
