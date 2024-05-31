import { config } from './config';
import SerialPortManager from './SerialPortManager';
import WebSocketManager, { JsonData } from './WebSocketManager';

const { version } = require('../package.json');

const webSocketServer: WebSocketManager = new WebSocketManager(
  parseInt(config.websocketPort, 10),
);

const serialPortManager: SerialPortManager = new SerialPortManager(
  config.serialPortName,
  config.baudRate,
  (data: JsonData): void => {
    webSocketServer.send(data);
  },
);

console.clear();
console.log(`COM-port to WebSocket v.${version} is running...`);
console.log(`WebSocket server running on port ${config.websocketPort}`);
console.log(
  `Serial port configured on ${config.serialPortName} with baud rate ${config.baudRate}`,
);
console.log('Press Ctrl+C to exit');
