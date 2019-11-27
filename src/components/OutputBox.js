import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Paper, GridListTile, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
	backgroundColor: '#4d4d4d',
	margin: theme.spacing(1),
	color: 'white',
	padding: theme.spacing(1)
    },
    gridList: {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignContent: 'baseline',
	width: 500,
	height: '100%',
	backgroundColor: '#fff'
    }
}));

export default function OutputBox(props) {
    const classes = useStyles();

    return (
	<GridList className={classes.gridList} cellHeight={60} cols={1} spacing={1}>
	  {props.data.map((output, i) => (
	      <GridListTile cols={1} key={i}>
		<Paper className={classes.paper}>
		  <Typography component='p'>{output}</Typography>
		</Paper>
	      </GridListTile>
          ))}
        </GridList>
    );

