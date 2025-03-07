export class ThemeStore {
    private static instance: ThemeStore;
    private theme: string = localStorage.getItem("theme") || "yellow";

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
        localStorage.setItem("theme", newTheme);
        document.body.className = "";
        document.body.classList.add(`theme-${newTheme}`);
    }
}
