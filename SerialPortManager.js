const { SerialPort } = require('serialport');

class SerialPortManager {
    constructor(portName, baudRate, onData) {
        this.portName = portName;
        this.baudRate = baudRate;
        this.onData = onData;
        this.errorDisplayed = false;
        this.connect();
    }

    connect() {
        this.port = new SerialPort({ path: this.portName, baudRate: this.baudRate }, (err) => {
            if (err) {
                if (!this.errorDisplayed) {
                    console.error('Error when opening COM port:', err.message);
                    this.errorDisplayed = true;
                }
                setTimeout(() => this.connect(), 5000);
            }
        });

        this.port.on('open', () => {
            console.log('COM port is open.');
        });

        this.port.on('data', (data) => {
            const buffer = Buffer.from(data);
            const text = buffer.toString('utf8');
            console.log('Received data:', text);

            const jsonData = {
                message: text,
                timestamp: Date.now(),
            };

            this.onData(jsonData);
        });

        this.port.on('close', () => {
            console.log('The COM port was closed.');
            setTimeout(() => this.connect(), 5000);
        });

        this.port.on('error', (err) => {
            console.error('COM port error:', err);
            setTimeout(() => this.connect(), 5000);
        });
    }
}

module.exports = SerialPortManager;
