import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Calculate the difference between today and the given date
export function calculateDaysDiff(date: Date): number {
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}