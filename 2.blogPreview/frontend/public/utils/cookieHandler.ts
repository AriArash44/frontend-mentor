export function getCookie(name: string) {
    const cookies = document.cookie
        .split(';')
        .map((cookie) => cookie.trim().split('='))
        .filter(([key]) => key === name);

    return cookies.length ? decodeURIComponent(cookies[0][1]) : null;
}

export function isCookieValid(cookie: string) {
    try {
        const parsedCookie = JSON.parse(cookie);
        const expirationTime = new Date(parsedCookie.expiration);
        const currentTime = new Date();
        return currentTime < expirationTime;
    } catch (error) {
        console.error('Error parsing cookie value:', error);
        return false;
    }
}
