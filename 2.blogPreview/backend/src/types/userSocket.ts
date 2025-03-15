import { WebSocket } from "ws";

interface UserSocket {
    [username: string]: Set<WebSocket>;
}

export default UserSocket;