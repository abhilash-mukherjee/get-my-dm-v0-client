import { toast } from "react-toastify";

export function handleCopy(text: string) {
    const clipboard = window.navigator.clipboard;
    clipboard.writeText(text);
    toast.info('URL Copied',{   
    })
}

export function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}