import { apiGet } from "../utils/requestHandler";

export class NameContext {
    private static instance: NameContext;
    private static loggedIn: boolean = false;
    private name: any;
      
    private constructor() {}

    public static async getInstance(): Promise<NameContext> {
        if (!NameContext.instance) {
            NameContext.instance = new NameContext();
        }
        let nameValue = sessionStorage.getItem('user_name');
        if (!nameValue) {
            const response = await apiGet('/api/authentication/username', {});
            nameValue = response['username'];
            sessionStorage.setItem('user_name', nameValue!);
        }
        NameContext.instance.name = nameValue;
        NameContext.loggedIn = true;
        return NameContext.instance;
    }

    public static isLoggedIn(): boolean {
        return NameContext.loggedIn;
    }

    public getName(): string {
        return this.name;
    }

    public removeName(): void {
        sessionStorage.removeItem('user_name');
        this.name = undefined;
    }
}
