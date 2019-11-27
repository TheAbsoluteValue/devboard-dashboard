import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import OutputBox from './components/OutputBox';
const Readline = require('@serialport/parser-readline');

const useStyles = makeStyles(theme => ({
    header: {
	backgroundColor: '#282c34',
	color: 'white',
	minHeight: '100vh',
	padding: '0.75em',
	display: 'flex',
	justifyContent: 'space-around'
    },
    button: {
	marginLeft: theme.spacing(1)
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
    const SerialPort = require('@serialport/stream');
    SerialPort.Binding = require('@serialport/binding-abstract');
    const port = new SerialPort('/dev/ttyUSB0', {baudRate: 115200});
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
	  <div>
	    <Button
	      variant='contained'
	      onClick={handleClick}
	      className={classes.button}
	    >
	      Test
	    </Button>
	    <Button
	      variant='contained'
	      onClick={handleReset}
	      className={classes.button}
	    >
	      Reset
            </Button>
          </div>
          <OutputBox data={data} />
        </div>
    );
}

export default App;
