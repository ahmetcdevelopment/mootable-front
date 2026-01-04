import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

// Supported locales
export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'tr';

// Get locale from cookie or Accept-Language header
async function getLocale(): Promise<Locale> {
  // 1. Check cookie first
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  if (localeCookie && locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale;
  }

  // 2. Check Accept-Language header
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2).toLowerCase())
      .find(lang => locales.includes(lang as Locale));
    
    if (preferredLocale) {
      return preferredLocale as Locale;
    }
  }

  // 3. Fall back to default
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
