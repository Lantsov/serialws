const WebSocket = require('ws');

class WebSocketServer {
    constructor(port) {
        this.wss = new WebSocket.Server({ port });
        this.websocketClient = null;

        this.wss.on('connection', (ws) => {
            console.log('WS Connected.');
            ws.send(JSON.stringify({ message: 'CONNECTED', timestamp: Date.now() }));
            this.websocketClient = ws;
        });
    }

    send(data) {
        if (this.websocketClient) {
            this.websocketClient.send(JSON.stringify(data));
        } else {
            console.error('No WebSocket client connected.');
        }
    }
}

module.exports = WebSocketServer;
