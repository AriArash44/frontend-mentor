import { errorMessages } from "../consts/errorMessages";
import { themes } from "../consts/themeMapper";
import { apiPost, apiGet } from "../utils/requestHandler";
import { NameContext } from "./nameContext";
import { WsConnectionContext } from "./wsConnectionContext";

export class ThemeContext {
    private static instance: ThemeContext;
    private theme: any;
      
    private constructor() {}

    public static affectTheme(themeColor: string = ThemeContext.instance.getTheme()) {
        document.documentElement.style.setProperty('--theme-color', themes[themeColor.toLowerCase() as keyof typeof themes]);
        document.getElementById('card-image')?.shadowRoot?.querySelector('img')?.setAttribute('src', `/images/illustration-article-${themeColor.toLowerCase()}.svg`);
        const themeButtons = document.querySelectorAll("theme-button-component");
        const themeButtonsArray = Array.from(themeButtons);
        themeButtonsArray.forEach((themeButton) => {
            if(themeButton.getAttribute('color') === themeColor.toLowerCase()){
                themeButton.setAttribute('active', 'true');
            }
            else{
                themeButton.setAttribute('active', 'false');
            }
        });
    }

    public static async getInstance(): Promise<ThemeContext> {
        if (!ThemeContext.instance) {
            ThemeContext.instance = new ThemeContext();
        }
        const username = (await NameContext.getInstance()).getName();
        let themeValue = sessionStorage.getItem('user_theme');
        if (!themeValue) {
            try{
                const response = await apiGet(`/api/userPreferences/${username}`, {});
                themeValue = response['theme'];
                sessionStorage.setItem('user_theme', themeValue!);
            } catch(err) {
                if(err instanceof Error && err.message === errorMessages.userMissed){
                    themeValue = 'yellow';
                    sessionStorage.setItem('user_theme', themeValue);
                }
                else{
                    throw err;
                }
            }
        }
        ThemeContext.instance.theme = themeValue;
        return ThemeContext.instance;
    }

    public getTheme(): string {
        return this.theme;
    }

    public async setTheme(newTheme: string, setOnServerFlag: boolean = true) {
        if(setOnServerFlag) {
            const username = (await NameContext.getInstance()).getName();
            await apiPost(`/api/userPreferences/${username}`, {'theme': newTheme});
            (await WsConnectionContext.getInstance()).sendMessage();
        }
        this.theme = newTheme;
        sessionStorage.setItem('user_theme', newTheme);
        ThemeContext.affectTheme();
    }

    public removeTheme(): void {
        sessionStorage.removeItem('user_theme');
        this.theme = undefined;
    }
}
