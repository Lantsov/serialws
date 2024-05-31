import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const config = {
  websocketPort: process.env.WEBSOCKET_PORT as string,
  serialPortName: process.env.SERIAL_PORT as string,
  baudRate: parseInt(process.env.BAUD_RATE as string, 10),
};
