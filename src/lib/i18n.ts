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

export const LOCALES = ["en", "pt", "es", "de", "fr", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Nome nativo + código BCP-47 (usado no hreflang e no <html lang>). */
export const LOCALE_META: Record<Locale, { native: string; bcp47: string }> = {
  en: { native: "English", bcp47: "en" },
  pt: { native: "Português", bcp47: "pt-BR" },
  es: { native: "Español", bcp47: "es" },
  de: { native: "Deutsch", bcp47: "de" },
  fr: { native: "Français", bcp47: "fr" },
  it: { native: "Italiano", bcp47: "it" },
};

const DICTS: Record<Locale, Record<string, unknown>> = { en, pt, es, de, fr, it };

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
