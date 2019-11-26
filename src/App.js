import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutputBox from './components/OutputBox';
const SerialPort = require('@serialport/stream');
const MockBinding = require('@serialport/binding-mock');
const Readline = require('@serialport/parser-readline');

const useStyles = makeStyles(theme => ({
    header: {
	backgroundColor: '#282c34',
	color: 'white',
	minHeight: '100vh'
    }
}));

//baud for esp-32: 115200
//data bits: 8
//stop bits: 1
//parity: none
//flow control: xon/xoff

function App() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    SerialPort.Binding = MockBinding;
    MockBinding.createPort('/dev/ROBOT', { echo: true, record: true });
    const port = new SerialPort('/dev/ROBOT');
    const parser = port.pipe(new Readline());
    parser.on('data', dataFrom => setData([dataFrom, ...data]));

    function handleClick() {
        setCount(count + 1);
	port.write(`Test: ${count}\n`);
	console.log(port);
    }
    
    function handleReset() {
        setData([]);
    }
    
    return (
	<div className={classes.header}>
	  <button onClick={handleClick}>Test</button>
	  <button onClick={handleReset}>Reset</button>
	  <OutputBox data={data}/>
	</div>
    );
}

export default App;
