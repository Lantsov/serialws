require('dotenv').config({path: '.env'});
const {SerialPort} = require('serialport');
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: process.env.WEBSOCKET_PORT});
let websocketClient;
const portName = process.env.SERIAL_PORT;
const baudRate = parseInt(process.env.BAUD_RATE);
let port;

wss.on('connection', function connection(ws) {
    console.log('WS Connected.');
    ws.send(JSON.stringify({message: 'CONNECTED', timestamp: Date.now()}));
    websocketClient = ws;
});

let errorDisplayed = false;
const connectToSerialPort = () => {
    port = new SerialPort({path: portName, baudRate: baudRate}, function (err) {
        if (err) {
            if (!errorDisplayed) {
                console.error('Error when opening COM port:', err.message);
                errorDisplayed = true;
            }
            setTimeout(connectToSerialPort, 5000);
        }
    });

    port.on('open', () => {
        console.log('COM port is open.');
    });

    port.on('data', function (data) {
        const buffer = Buffer.from(data);
        const text = buffer.toString('utf8');
        console.log('Received data:', text);

        const jsonData = {
            message: text,
            timestamp: Date.now(),
        };
        const jsonStr = JSON.stringify(jsonData);

        if (websocketClient) {
            websocketClient.send(jsonStr);
        } else {
            console.log('Received error');
        }
    });

    port.on('close', () => {
        console.log('The COM port was closed.');
        setTimeout(connectToSerialPort, 5000);
    });

    port.on('error', (err) => {
        console.error('COM port error:', err);
        setTimeout(connectToSerialPort, 5000);
    });
};

connectToSerialPort();
