import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Platforms } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function titleCase(str: string) {
  return str[0].toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
}

export function padArray<T>(arr: Array<T>, length: number, fillValue?: T) {
  if (arr.length >= length) {
    return arr;
  }
  const padding = new Array(length - arr.length).fill(fillValue);
  return arr.concat(padding);
}

export const PLATFORM_COLORS: Record<Platforms, string> = {
  github: "#1A1A1A",
  youtube: "#EE3939",
  linkedin: "#2D68FF",
  facebook: "#1877F2",
  frontend_mentor: "#338a99",
  codewars: "#8A1A50",
  freeCodeCamp: "#302267",
  "dev.to": "Dark Grey",
};

export const defaultUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const PROFILE_BASE_URL = `${defaultUrl}/profile`;
