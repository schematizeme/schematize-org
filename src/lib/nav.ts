// Destinos do megamenu "Conteúdo" — URLs exatas definidas pelo dono do site.
// Textos (título + 1 linha) ficam no i18n em nav.contentItems.<key>.
export interface ContentItem { key: string; icon: string; href: string; }
export interface ContentGroup { labelKey: string; items: ContentItem[]; }

export const CONTENT_GROUPS: ContentGroup[] = [
  {
    labelKey: "nav.contentRead",
    items: [
      { key: "blog", icon: "pen-line", href: "https://blog.schematize.org" },
      { key: "research", icon: "flask-conical", href: "https://research.schematize.org" },
      { key: "wiki", icon: "book-open", href: "https://wiki.schematize.org" },
      { key: "academy", icon: "graduation-cap", href: "https://schematize.educe.me" },
    ],
  },
  {
    labelKey: "nav.contentBuild",
    items: [
      { key: "skills", icon: "blocks", href: "https://skills.schematize.org" },
      { key: "blueprints", icon: "drafting-compass", href: "https://blueprint.schematize.org" },
    ],
  },
];

// Entrar/Cadastrar passam pelo BFF do skills (client OIDC cadastrado no broker).
export const SIGNIN_URL = "https://skills.schematize.org/api/auth/login?return=/";
export const SIGNUP_URL = "https://skills.schematize.org/api/auth/login?signup=1&return=/";

export const LEGAL_LINKS = [
  { slug: "legal/privacy", key: "legal.docs.privacy.h1" },
  { slug: "legal/terms-of-use", key: "legal.docs.termsUse.h1" },
  { slug: "legal/terms-of-service", key: "legal.docs.termsService.h1" },
  { slug: "legal/cookies", key: "legal.docs.cookies.h1" },
];
