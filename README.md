# SerialWS Application

## Overview
SerialWS is a Node.js application designed to create a bridge between a serial port and a WebSocket connection. Its primary functionality is to listen for data from a specified serial port and forward it to a connected WebSocket client.

## Installation

Before you can run SerialWS, make sure you have Node.js and npm installed. You also need to install the required Node packages.

To install the dependencies, navigate to the app directory and run:
`npm install`

## Configuration

Setup your environment variables by creating a `.env` file in the root of the application with the following variables:
`SERIAL_PORT=your_serial_port_name`
`BAUD_RATE=your_baud_rate`
`WEBSOCKET_PORT=your_websocket_port`

Replace `your_serial_port_name`, `your_baud_rate`, and `your_websocket_port` with the appropriate values for your setup.

## Running the Application

Start the application by running:
`node app.js`

## Operations

Upon launching, the app attempts to establish a WebSocket server listening on the specified port in the `.env` file.

When a WebSocket client connects, the app logs a confirmation message. It then tries to connect to the specified serial port with the given baud rate.

### Serial Port Connection

SerialWS monitors the serial port for any incoming data, logs the data as ASCII text to the console, and then forwards it to the connected WebSocket client.

In the event of an error during serial port connection, or if a serial port closes, the app logs the occurrence.

If there is any issue with opening the serial port, SerialWS will retry the connection every 5 seconds.

### WebSocket Communication

The WebSocket server listens for incoming connections. Once a client connects, any data received from the serial port is immediately sent to the WebSocket client.

## Dependencies

SerialWS uses the following Node.js modules:

- `dotenv`: Loads environment variables from `.env` to `process.env`.
- `serialport`: Handles communication with the serial ports.
- `ws`: Provides the WebSocket server implementation.

## Troubleshooting

If you encounter any issues:

- Check that all environment variables in `.env` are correct.
- Verify that the serial device is properly connected and configured.
- Ensure the WebSocket client attempts to connect to the correct port.

## Notes

This application does not handle multiple WebSocket clients or serial ports simultaneously. It's designed for a one-to-one connection.

## License

MIT License

Copyright (c) 2024 @lantsov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
