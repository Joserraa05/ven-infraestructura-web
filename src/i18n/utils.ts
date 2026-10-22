import es from './es.json';
import pt from './pt.json';

export const languages = ['es', 'pt'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'es';

export interface Project {
  code: string;
  title: string;
  /** File name inside `src/assets/projects/`. */
  image: string;
  alt: string;
}

type RawDictionary = typeof es;
export type Dictionary = Omit<RawDictionary, 'projects'> & {
  projects: Omit<RawDictionary['projects'], 'items'> & { items: Project[] };
};

// `check:i18n` guarantees both files share the same keys; the type here only needs one shape.
const dictionaries: Record<Lang, Dictionary> = {
  es: es as Dictionary,
  pt: pt as Dictionary,
};

export type PageId = keyof Dictionary['routes'];

type StringPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : T[K] extends readonly unknown[]
      ? never
      : StringPaths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TranslationKey = StringPaths<Dictionary>;

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function t(lang: Lang, key: TranslationKey): string {
  const value = key
    .split('.')
    .reduce<unknown>((node, segment) => (node as Record<string, unknown>)[segment], dictionaries[lang]);
  if (typeof value !== 'string') {
    throw new Error(`Missing translation "${key}" for "${lang}"`);
  }
  return value;
}

export function isPending(lang: Lang, value: string): boolean {
  return value === t(lang, 'common.pending');
}

export function getPath(lang: Lang, page: PageId, hash?: string): string {
  const slug = dictionaries[lang].routes[page];
  const path = slug ? `/${lang}/${slug}/` : `/${lang}/`;
  return hash ? `${path}#${hash}` : path;
}

export interface Alternate {
  lang: Lang;
  hreflang: string;
  path: string;
}

export function getAlternates(page: PageId): Alternate[] {
  return languages.map((lang) => ({
    lang,
    hreflang: dictionaries[lang].meta.lang,
    path: getPath(lang, page),
  }));
}

/** Equivalent page in the other language. */
export function getAlternate(lang: Lang, page: PageId): Alternate {
  const other = getAlternates(page).find((alternate) => alternate.lang !== lang);
  if (!other) {
    throw new Error(`No alternate language for "${lang}"`);
  }
  return other;
}
