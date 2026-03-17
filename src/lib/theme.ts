export const THEMES = [
  "mono-lab",
  "noir-portal",
  "aurora-spectral",
  "cad-clinical",
  "neon-lattice",
  "paper-negative",
  "oxide-redline",
  "mint-sterile",
  "violet-haze",
  "sunset-heat",
] as const;

export type ThemeName = (typeof THEMES)[number];

export function isThemeName(v: string): v is ThemeName {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return (THEMES as readonly string[]).includes(v);
}

