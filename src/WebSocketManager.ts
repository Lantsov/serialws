import { Server as WebSocketServer, WebSocket as WS } from 'ws';

export interface JsonData {
  message: string;
  timestamp: number;
}

class WebSocketManager {
  private wss: WebSocketServer;
  private websocketClient: WS | null = null;

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (ws: WS): void => {
      console.log('WS Connected.');
      ws.send(JSON.stringify({ message: 'CONNECTED', timestamp: Date.now() }));
      this.websocketClient = ws;
    });
  }

  public send(data: JsonData): void {
    if (this.websocketClient) {
      this.websocketClient.send(JSON.stringify(data));
    } else {
      console.error('No WebSocket client connected.');
    }
  }
}

export default WebSocketManager;
