import { getCookie } from "../utils/cookieHandler";
import { themes } from "../consts/themeMapper";
import { apiPost, apiGet } from "../utils/requestHandler";
import { UsernameApiResponse } from "../types/usernameApiResponse";

export class ThemeStore {
    private static instance: ThemeStore;
    private theme: string = (() => {
        const cookieValue = getCookie('user_theme');
        return cookieValue ? cookieValue : "yellow";
    })();
      
    private constructor() {}

    public static getInstance(): ThemeStore {
        if (!ThemeStore.instance) {
            ThemeStore.instance = new ThemeStore();
        }
        document.documentElement.style.setProperty('--theme-color', themes[ThemeStore.instance.getTheme() as keyof typeof themes]);
        document.getElementById('card-image')?.shadowRoot?.querySelector('img')?.setAttribute('src', `/images/illustration-article-${ThemeStore.instance.getTheme()}.svg`);
        return ThemeStore.instance;
    }

    public getTheme(): string {
        return this.theme;
    }

    public async setTheme(newTheme: string) {
        this.theme = newTheme;
        try {
            const response: UsernameApiResponse = await apiGet('/api/authentication/username', {}, true);
            await apiPost(`/api/userPreferences/${response["username"]}`, {"theme": newTheme}, true)
            document.documentElement.style.setProperty('--theme-color', themes[newTheme as keyof typeof themes]);
            document.getElementById('card-image')?.shadowRoot?.querySelector('img')?.setAttribute('src', `/images/illustration-article-${newTheme}.svg`);
        }
        catch(err) {
            throw err;
        }
    }
}
