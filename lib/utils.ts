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
  frontend_mentor: "#6ABECD",
};

export const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
