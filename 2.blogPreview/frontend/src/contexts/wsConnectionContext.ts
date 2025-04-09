import { WebSocket } from 'ws';
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
        if (!WsConnectionContext.instance){
            WsConnectionContext.instance = new WsConnectionContext();
        }
        if (!WsConnectionContext.instance.connection || WsConnectionContext.instance.connection.readyState !== WebSocket.OPEN) {
            WsConnectionContext.instance.initializeConnection();
            WsConnectionContext.instance.connection = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        }
        return WsConnectionContext.instance;
    }

    private initializeConnection(): void {
        this.connection = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        this.connection.on('message', async (message: any) => {
            if(message.theme) {
                (await ThemeContext.getInstance()).setTheme(message.theme, false);
            }
            else{
                throw new Error(errorMessages.websocketMalformedMessage);
            }
        });
        this.connection.on('close', (code: WebSocketCloseCode ) => {
            if (code === 4003) {
                throw new Error(errorMessages.websocketInvalidToken);
            }
            throw new Error(errorMessages.websocketConnectionclosed);
        });
    };

    public async sendMessage() {
        const userTheme = (await ThemeContext.getInstance()).getTheme();
        this.connection.send({theme: userTheme});
    }

    public closeConnection() {
        if (this.connection && this.connection.readyState === WebSocket.OPEN) {
            this.connection.close(1000);
        }
    }
}