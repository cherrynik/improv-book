export type Locale = "ru" | "en";

export type Localized<T> = Record<Locale, T>;
