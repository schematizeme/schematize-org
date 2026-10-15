// Aplicações do ecossistema schematize — fonte única das páginas /apps e /apps/<slug>.
// Comandos e flags vêm do install.sh do schematize-cli (cabeçalho do script): nunca
// inventar flag. App sem flag própria (overdev) vem no kit completo. O instalador do
// Windows (schematize_windows_rs) cobre só market + overdev. Comandos não se traduzem.
export const REPO = "https://github.com/schematizeme/schematize-cli";
export const RAW = "https://raw.githubusercontent.com/schematizeme/schematize-cli/main/install.sh";
export const RELEASES = `${REPO}/releases/latest`;
export const WIN_REPO = "https://github.com/schematizeme/schematize_windows_rs";
export const WIN_RAW = "https://raw.githubusercontent.com/schematizeme/schematize_windows_rs/main/install.ps1";
export const WIN_RELEASES = `${WIN_REPO}/releases/latest`;
export const INSTALL_WIN = `irm ${WIN_RAW} | iex`;
export const INSTALL_WIN_FULL = `& ([scriptblock]::Create((irm ${WIN_RAW}))) -Completo`;
export const GIT_WIN = "winget install --id Git.Git -e";

export const linux = (flag = "") => `curl -fsSL ${RAW} | bash${flag ? ` -s -- ${flag}` : ""}`;
export const freebsd = (flag = "") => `fetch -o - ${RAW} | sh${flag ? ` -s -- ${flag}` : ""}`;

export interface AppDef {
  slug: string;
  icon: string;
  /** Flag do install.sh; "" = instalação base (hub + market); null = só no kit completo. */
  flag: string | null;
  /** Existe instalador no Windows para este app? */
  windows: boolean;
}

// Ordem = a de `apps.items` nos dicionários.
export const APPS: AppDef[] = [
  { slug: "schematize", icon: "terminal", flag: "", windows: false },
  { slug: "market", icon: "store", flag: "", windows: true },
  { slug: "overdev", icon: "infinity", flag: null, windows: true },
  { slug: "deployer", icon: "rocket", flag: "--deployer", windows: false },
  { slug: "optimizer", icon: "gauge", flag: "--optimizer", windows: false },
  { slug: "database", icon: "database", flag: "--database", windows: false },
  { slug: "git", icon: "git-branch", flag: "--git", windows: false },
  { slug: "skills", icon: "blocks", flag: "--skills", windows: false },
];

/** Comando Linux/FreeBSD do app (flag própria) ou do kit completo (sem flag própria). */
export function cmds(app: AppDef) {
  const flag = app.flag === null ? "--completo" : app.flag;
  return { linux: linux(flag), freebsd: freebsd(flag), inKit: app.flag === null };
}
