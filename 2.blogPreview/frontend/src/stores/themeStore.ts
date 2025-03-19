import { getCookie, isCookieValid } from "../utils/cookieHandler";
import { apiPost } from "../utils/requestHandler";

export class ThemeStore {
    private static instance: ThemeStore;
    private theme: string = (() => {
        const cookieValue = getCookie('user_theme');
        return cookieValue && isCookieValid(cookieValue) ? cookieValue : "yellow";
    })();
      
    private constructor() {}

    public static getInstance(): ThemeStore {
        if (!ThemeStore.instance) {
            ThemeStore.instance = new ThemeStore();
        }
        return ThemeStore.instance;
    }

    public getTheme(): string {
        return this.theme;
    }

    public setTheme(newTheme: string): void {
        this.theme = newTheme;
        //TODO: does we need to add the class of theme to document.body?
        //TODO: we need another singelton connected to the localhost for the username
        apiPost('/api/userPreferences/bz', {"theme": newTheme})
        document.body.className = "";
        document.body.classList.add(`theme-${newTheme}`);
    }
}
