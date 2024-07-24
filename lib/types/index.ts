export enum Platforms {
  GITHUB = "github",
  YOUTUBE = "youtube",
  LINKEDIN = "linkedin",
  FACEBOOK = "facebook",
  FRONTEND_MENTOR = "frontend_mentor",
  DEV_TO = "dev.to",
  CODEWARS = "codewars",
  FREE_CODE_CAMP = "freeCodeCamp",
}

export const PLATFORMS = Object.values(Platforms);

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
