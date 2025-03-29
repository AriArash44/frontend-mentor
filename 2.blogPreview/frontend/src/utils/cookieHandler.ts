export function getCookie(name: string): string | null {
    const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.trim().split('='))
        .filter(([key]) => key === name);
  
    return cookies.length ? decodeURIComponent(cookies[0][1]) : null;
}