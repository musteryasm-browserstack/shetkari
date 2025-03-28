import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function fallback(name: string): string {
    const nameArr = name.length > 0 ? name.trim().split(" ") : [];
    let fallBackName = "";
    nameArr.forEach((nameEl) => {
        fallBackName += nameEl[0].toUpperCase();
    });
    return fallBackName;
}

export function getLabelFromName(name: string): string {
    const label = name.replaceAll("-", " ");
    const finalLabel = label.replaceAll("_", " ");
    return finalLabel;
}

export function formatDate(inputDate: Date) {
    const date = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();

    const newDate = date.toString().padStart(2, '0');
    const newMonth = month.toString().padStart(2, '0');

    return `${year}-${newMonth}-${newDate}`;
}

export function formatDateReverse(inputDate: Date) {
    const date = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();

    const newDate = date.toString().padStart(2, '0');
    const newMonth = month.toString().padStart(2, '0');

    return `${newDate}-${newMonth}-${year}`;
}

export function urlB64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function convert12HourTime(dateString: string): string {
    // Parse the date string into a Date object
    const date = parseISO(dateString);

    // Format the date and time using date-fns
    const formattedDate = format(date, "eee, MMMM d, yyyy, h:mm a");

    return formattedDate;
}
