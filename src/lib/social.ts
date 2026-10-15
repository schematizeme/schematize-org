// Fonte única dos perfis sociais (Header, Footer e sameAs do JSON-LD).
// Só entra na tela o que tem URL: link vazio ou perfil chutado é pior que nenhum.
// Preencha x/instagram/linkedin quando o dono passar os perfis — o resto se ajusta.
export const social = {
  x: "",
  instagram: "",
  github: "https://github.com/schematizeme",
  linkedin: "",
} as const;

export type SocialKey = keyof typeof social;

/** Metadados fixos por rede (nome de marca não se traduz). */
const META: Record<SocialKey, { label: string; icon: string }> = {
  x: { label: "X", icon: "simple-icons:x" },
  instagram: { label: "Instagram", icon: "simple-icons:instagram" },
  github: { label: "GitHub", icon: "simple-icons:github" },
  linkedin: { label: "LinkedIn", icon: "simple-icons:linkedin" },
};

/** Redes com URL preenchida, na ordem X, Instagram, GitHub, LinkedIn. */
export const socialLinks = (Object.keys(META) as SocialKey[])
  .filter((k) => social[k])
  .map((k) => ({ key: k, url: social[k] as string, ...META[k] }));

/** URLs para o `sameAs` do JSON-LD. */
export const sameAs: string[] = socialLinks.map((s) => s.url);
