import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Calculate the difference between today and the given date
export function calculateDaysDiff(date: Date): number {
    const currentDate = new Date().getTime();
    const diffTime = Math.round(currentDate - (date.getTime()));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
}