import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import OutputBox from './components/OutputBox';

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

    useEffect(() => {
        setInterval(() => {
	    fetch('http://localhost:8080/')
		.then(data => data.text())
		.then(dataFrom => {
		    let out ="";
		    for(let i = 0; i < dataFrom.length; i++)
			out += dataFrom[i];
		    out = out.split('\r').join('').split('\n');
		    out = out.slice(0, out.length - 1);
		    setData([out, ...data]);
		})
		.catch(err => console.log(err));
        }, 250)
    }, []);
    
    
    function handleClick() {
	setCount(count + 1);
    }

    function handleReset() {
	setData([]);
    }

    return (
	<div className={classes.header}>
	  <OutputBox data={data} />
	</div>
    );
}

export default App;
