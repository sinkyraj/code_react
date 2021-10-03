import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: props => props.color,
    padding: '20px',
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '4px',
    boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.30)',
    fontFamily: 'Arial'
  },
  clearButton: {
    cursor: 'pointer'
  }
});

export default function ListItem(props) {
  const classes = useStyles(props);

  return (
    <div color={props.color} className={classes.root}>
      <div>{props.item.message}</div>
      <div onClick={() => props.clearMessage(props.item)} className={classes.clearButton}>Clear</div>
    </div>
  );
}
