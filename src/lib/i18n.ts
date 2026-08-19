// i18n — dicionários por idioma + helpers de rota/hreflang para o SEO multi-idioma.
// O quê: carrega os JSON de conteúdo, resolve chaves com fallback pro en, e monta
// caminhos localizados e a lista de alternates (hreflang). Onde: usado por Base.astro
// e pelas páginas. A estratégia multi-DOMÍNIO (net/org/me/com.br) vive na skill seo.
import en from "../i18n/en.json";
import pt from "../i18n/pt.json";
import es from "../i18n/es.json";
import de from "../i18n/de.json";
import fr from "../i18n/fr.json";
import it from "../i18n/it.json";
import zh from "../i18n/zh.json";
import hi from "../i18n/hi.json";
import ar from "../i18n/ar.json";
import ru from "../i18n/ru.json";
import ja from "../i18n/ja.json";
import ko from "../i18n/ko.json";
import tr from "../i18n/tr.json";
import vi from "../i18n/vi.json";
import id from "../i18n/id.json";
import pl from "../i18n/pl.json";
import nl from "../i18n/nl.json";
import th from "../i18n/th.json";
import fa from "../i18n/fa.json";
import bn from "../i18n/bn.json";

export const LOCALES = [
  "en", "pt", "es", "de", "fr", "it",
  "zh", "hi", "ar", "ru", "ja", "ko", "tr",
  "vi", "id", "pl", "nl", "th", "fa", "bn",
] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Locales que renderizam da direita p/ a esquerda (dir="rtl"). */
export const RTL_LOCALES: readonly Locale[] = ["ar", "fa"];
/** true se o locale é RTL (Base.astro emite <html dir="rtl">). */
export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** Nome nativo + código BCP-47 (usado no hreflang e no <html lang>). */
export const LOCALE_META: Record<Locale, { native: string; bcp47: string }> = {
  en: { native: "English", bcp47: "en" },
  pt: { native: "Português", bcp47: "pt-BR" },
  es: { native: "Español", bcp47: "es" },
  de: { native: "Deutsch", bcp47: "de" },
  fr: { native: "Français", bcp47: "fr" },
  it: { native: "Italiano", bcp47: "it" },
  zh: { native: "中文", bcp47: "zh" },
  hi: { native: "हिन्दी", bcp47: "hi" },
  ar: { native: "العربية", bcp47: "ar" },
  ru: { native: "Русский", bcp47: "ru" },
  ja: { native: "日本語", bcp47: "ja" },
  ko: { native: "한국어", bcp47: "ko" },
  tr: { native: "Türkçe", bcp47: "tr" },
  vi: { native: "Tiếng Việt", bcp47: "vi" },
  id: { native: "Bahasa Indonesia", bcp47: "id" },
  pl: { native: "Polski", bcp47: "pl" },
  nl: { native: "Nederlands", bcp47: "nl" },
  th: { native: "ไทย", bcp47: "th" },
  fa: { native: "فارسی", bcp47: "fa" },
  bn: { native: "বাংলা", bcp47: "bn" },
};

const DICTS: Record<Locale, Record<string, unknown>> = {
  en, pt, es, de, fr, it,
  zh, hi, ar, ru, ja, ko, tr,
  vi, id, pl, nl, th, fa, bn,
};

function lookup(obj: Record<string, unknown>, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[k];
    return undefined;
  }, obj);
}

/** Traduz uma chave "a.b.c" para string; fallback: locale → en → a própria chave. */
export function t(locale: Locale, key: string): string {
  const v = lookup(DICTS[locale] ?? DICTS.en, key);
  if (typeof v === "string") return v;
  const f = lookup(DICTS.en, key);
  return typeof f === "string" ? f : key;
}

/** Valor cru (arrays/objetos p/ listas), com fallback pro en. */
export function tx<T = unknown>(locale: Locale, key: string): T {
  const v = lookup(DICTS[locale] ?? DICTS.en, key);
  return (v ?? lookup(DICTS.en, key)) as T;
}

/** Caminho localizado: (pt, "product") → "/pt/product/". */
export function path(locale: Locale, slug = ""): string {
  return `/${locale}/${slug ? slug + "/" : ""}`;
}

/** Alternates de hreflang p/ uma página (mesmo slug em todos os locales). */
export function alternates(slug = "") {
  return LOCALES.map((l) => ({
    locale: l,
    bcp47: LOCALE_META[l].bcp47,
    href: path(l, slug),
  }));
}
