import { themes } from "../consts/themeMapper";
import { apiPost, apiGet } from "../utils/requestHandler";

export class ThemeStore {
    private static instance: ThemeStore;
    private theme: string = (() => {
        const themeValue = sessionStorage.getItem('user_theme');
        return themeValue ? themeValue : "yellow";
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
        try {
            const response = await apiGet('/api/authentication/username', {});
            await apiPost(`/api/userPreferences/${response["username"]}`, {"theme": newTheme})
            this.theme = newTheme;
            sessionStorage.setItem('user_theme', newTheme); 
            document.documentElement.style.setProperty('--theme-color', themes[newTheme as keyof typeof themes]);
            document.getElementById('card-image')?.shadowRoot?.querySelector('img')?.setAttribute('src', `/images/illustration-article-${newTheme}.svg`);
        }
        catch(err) {
            throw err;
        }
    }
}
