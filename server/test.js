const fs = require('fs');
const SerialPort = require('serialport')
const writeStream = fs.createWriteStream('output.txt');

const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 115200,
    parser: SerialPort.parsers.readline
});

port.on('open', () => {
  console.log('port opened')
});

port.on('data', data => {
    writeStream.write(data);
});

