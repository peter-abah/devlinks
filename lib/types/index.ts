export enum Platforms {
  GITHUB = "github",
  YOUTUBE = "youtube",
  LINKEDIN = "linkedin",
  FACEBOOK = "facebook",
  FRONTEND_MENTOR = "frontend_mentor",
}

export const PLATFORMS = Object.values(Platforms);

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }