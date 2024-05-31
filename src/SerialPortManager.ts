import { SerialPort } from 'serialport';

interface JsonData {
  message: string;
  timestamp: number;
}

class SerialPortManager {
  private readonly portName: string;
  private readonly baudRate: number;
  private port?: SerialPort;
  private readonly onData: (data: JsonData) => void;
  private errorDisplayed: boolean = false;

  constructor(
    portName: string,
    baudRate: number,
    onData: (data: JsonData) => void,
  ) {
    this.portName = portName;
    this.baudRate = baudRate;
    this.onData = onData;
    this.connect();
  }

  private connect(): void {
    this.port = new SerialPort(
      { path: this.portName, baudRate: this.baudRate },
      (err: Error | null): void => {
        if (err) {
          if (!this.errorDisplayed) {
            console.error('Error when opening COM port:', err.message);
            this.errorDisplayed = true;
          }
          setTimeout(() => this.connect(), 5000);
        }
      },
    );

    this.port.on('open', (): void => {
      console.log('COM port is open.');
    });

    this.port.on('data', (data: Buffer): void => {
      const text: string = data.toString('utf8');
      console.log('Received data:', text);

      const jsonData: JsonData = {
        message: text,
        timestamp: Date.now(),
      };

      this.onData(jsonData);
    });

    this.port.on('close', (): void => {
      console.log('The COM port was closed.');
      setTimeout(() => this.connect(), 5000);
    });

    this.port.on('error', (err: Error): void => {
      console.error('COM port error:', err);
      setTimeout(() => this.connect(), 5000);
    });
  }
}

export default SerialPortManager;
