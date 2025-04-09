import { ThemeContext } from './themeContext';
import { WebSocketCloseCode } from '../types/webSocketCloseCode';
import { errorMessages } from '../consts/errorMessages';

export class WsConnectionContext {
    private static instance: WsConnectionContext;
    private connection: any;

    private constructor() {
        this.initializeConnection();
    }

    public static async getInstance(): Promise<WsConnectionContext> {
        if (!WsConnectionContext.instance) {
            WsConnectionContext.instance = new WsConnectionContext();
        }
        if (!WsConnectionContext.instance.connection || WsConnectionContext.instance.connection.readyState !== WebSocket.OPEN) {
            WsConnectionContext.instance.initializeConnection();
        }
        return WsConnectionContext.instance;
    }

    private initializeConnection(): void {
        try {
            this.connection = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
            this.connection.onmessage = async (event: MessageEvent) => {
                const message = JSON.parse(await event.data.text());
                if (message.theme) {
                    (await ThemeContext.getInstance()).setTheme(message.theme, false);
                } else {
                    throw new Error(errorMessages.websocketMalformedMessage);
                }
            };
            this.connection.onclose = (event: CloseEvent) => {
                if (event.code === WebSocketCloseCode.INVALID_TOKEN) {
                    throw new Error(errorMessages.websocketInvalidToken);
                }
            };
            this.connection.onerror = () => {
                throw new Error(errorMessages.websocketConnectionclosed);
            };
        } catch(err) {
            throw err;
        }
    }

    public async sendMessage(): Promise<void> {
        const userTheme = (await ThemeContext.getInstance()).getTheme();
        this.connection.send(JSON.stringify({ theme: userTheme }));
    }

    public closeConnection(): void {
        if (this.connection && this.connection.readyState === WebSocket.OPEN) {
            this.connection.close(WebSocketCloseCode.NORMAL_CLOSURE,'Closing connection');
        }
    }
}
