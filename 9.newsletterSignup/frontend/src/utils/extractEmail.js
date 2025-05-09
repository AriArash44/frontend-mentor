export function extractEmail(text) {
    const regex = /[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}/;
    const match = text.match(regex);
    return match ? match[0] : null;
}