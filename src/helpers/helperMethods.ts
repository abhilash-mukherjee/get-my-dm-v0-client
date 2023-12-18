export function handleCopy(text: string) {
    const clipboard = window.navigator.clipboard;
    clipboard.writeText(text);
}