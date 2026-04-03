export const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export type LocalizedString = {
  zh: string;
  en: string;
};

export function isLocalizedString(value: any): value is LocalizedString {
  return (
    typeof value === 'object' &&
    value !== null &&
    'zh' in value &&
    'en' in value &&
    typeof value.zh === 'string' &&
    typeof value.en === 'string'
  );
}

export function getLocalizedValue<T = string>(
  value: T | LocalizedString,
  locale: Locale
): T {
  if (isLocalizedString(value)) {
    return value[locale] as unknown as T;
  }
  // Backward compatibility: if plain string, return as-is
  return value as T;
}

export function getLocalizedArray(
  values: LocalizedString[],
  locale: Locale
): string[] {
  return values.map(v => getLocalizedValue(v, locale) as unknown as string);
}

export async function getDictionary(locale: Locale) {
  return import(`@/dictionaries/${locale}.json`).then(
    (module) => module.default
  );
}
