// sitemap.xml — gerado sem dependência externa. Lista todas as páginas × locales,
// cada URL com os alternates hreflang (i18n correto). x-default aponta pro en.
import type { APIRoute } from "astro";
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, path } from "../lib/i18n";

const SLUGS = [
  "",
  "software",
  "projects",
  "research",
  "principles",
  "about",
  "contact",
  "sitemap",
  "legal",
  "legal/terms-of-use",
  "legal/terms-of-service",
  "legal/privacy",
  "legal/cookies",
];
const SITE = "https://schematize.org";

export const GET: APIRoute = () => {
  const abs = (p: string) => `${SITE}${p}`;
  const urls = SLUGS.flatMap((slug) =>
    LOCALES.map((loc) => {
      const links = LOCALES.map(
        (l) =>
          `<xhtml:link rel="alternate" hreflang="${LOCALE_META[l].bcp47}" href="${abs(path(l, slug))}"/>`,
      ).join("");
      const xdefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(path(DEFAULT_LOCALE, slug))}"/>`;
      return `  <url><loc>${abs(path(loc, slug))}</loc>${links}${xdefault}</url>`;
    }),
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
};
