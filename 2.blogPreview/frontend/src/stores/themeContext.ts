import { themes } from "../consts/themeMapper";
import { apiPost, apiGet } from "../utils/requestHandler";
import { NameContext } from "./nameContext";

export class ThemeContext {
    private static instance: ThemeContext;
    private theme: any;
      
    private constructor() {}

    public static affectTheme(themeColor: string = ThemeContext.instance.getTheme()) {
        document.documentElement.style.setProperty('--theme-color', themes[themeColor as keyof typeof themes]);
        document.getElementById('card-image')?.shadowRoot?.querySelector('img')?.setAttribute('src', `/images/illustration-article-${themeColor}.svg`);
    }

    public static async getInstance(): Promise<ThemeContext> {
        if (!ThemeContext.instance) {
            ThemeContext.instance = new ThemeContext();
        }
        const username = (await NameContext.getInstance()).getName();
        let themeValue = sessionStorage.getItem('user_theme');
        if (!themeValue) {
            const response = await apiGet(`/api/userPreferences/${username}`, {});
            themeValue = response['theme'];
            sessionStorage.setItem('user_name', themeValue!);
        }
        ThemeContext.instance.theme = themeValue;
        return ThemeContext.instance;
    }

    public getTheme(): string {
        return this.theme;
    }

    public async setTheme(newTheme: string) {
        const username = (await NameContext.getInstance()).getName();
        await apiPost(`/api/userPreferences/${username}`, {'theme': newTheme});
        this.theme = newTheme;
        sessionStorage.setItem('user_theme', newTheme);
        ThemeContext.affectTheme();
    }
}
