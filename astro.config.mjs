// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// schematize.org — site institucional (tudo consolidado no .org). i18n com URL por
// idioma (prefixo em todos os locales), self-canonical por página, hreflang recíproco.
// EN é o default; raiz redireciona.
// O sitemap é gerado por endpoint próprio (src/pages/sitemap.xml.ts) — sem dependência externa.
export default defineConfig({
  site: "https://schematize.org",
  // Ícones open-source (Lucide para UI, Simple Icons para marcas) via astro-icon —
  // geometria oficial, nada desenhado à mão. `Icon name="lucide:shield-check"`.
  integrations: [icon()],
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: [
      "en", "pt", "es", "de", "fr", "it",
      "zh", "hi", "ar", "ru", "ja", "ko", "tr",
      "vi", "id", "pl", "nl", "th", "fa", "bn",
    ],
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    "/": "/en/",
  },
});
