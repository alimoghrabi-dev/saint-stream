import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateElapsedTime(createdAt: string | number | Date) {
  const commentDate = new Date(createdAt);
  const currentDate = new Date();

  //@ts-ignore
  const timeDifference = currentDate - commentDate;

  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} days ago`;
  }
}
