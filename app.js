const config = require('./config');
const WebSocketServer = require('./WebSocketServer');
const SerialPortManager = require('./SerialPortManager');

const webSocketServer = new WebSocketServer(config.websocketPort);

const serialPortManager = new SerialPortManager(config.serialPortName, config.baudRate, (data) => {
    webSocketServer.send(data);
});

console.log(`WebSocket server running on port ${config.websocketPort}`);
console.log(`Serial port configured on ${config.serialPortName} with baud rate ${config.baudRate}`);
