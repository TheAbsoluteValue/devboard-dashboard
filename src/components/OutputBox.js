import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Paper, GridListTile, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-around',
	overflow: 'hidden',
    },

    paper: {
	backgroundColor: '#4d4d4d',
	margin: theme.spacing(1),
	color: 'white',
	padding: theme.spacing(1),
    },

    gridList: {
	width: 500,
	height: 450,
    },
}));

export default function OutputBox(props) {
    const classes = useStyles();
    // const data = ["Hello world!", 2, 3, 4, 5, 6, 7, 8];
    
    return (
	<div className={classes.root}>
	  <GridList className={classes.gridList} cellHeight={50} cols={1}>
	    {props.data.map((output, i) => (
		<GridListTile cols={1} key={i}>
		  <Paper className={classes.paper}>
                    <Typography component="p">{output}</Typography>
                  </Paper>
		</GridListTile>
	    ))}
	  </GridList>
	</div>
    );
}
