require('dotenv').config({ path: '.env' });

module.exports = {
    websocketPort: process.env.WEBSOCKET_PORT,
    serialPortName: process.env.SERIAL_PORT,
    baudRate: parseInt(process.env.BAUD_RATE)
};
