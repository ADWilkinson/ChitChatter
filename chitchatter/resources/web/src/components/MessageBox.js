import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  myMessage: {
    minHeight: '16px',
    minWidth: '16px',
    borderRadius: 12,
    backgroundColor: '#4a919ecf',
    color: '#fffafa',
    padding: 12,
    margin: 4
  },
  notMyMessage: {
    minHeight: '16px',
    minWidth: '16px',
    borderRadius: 12,
    backgroundColor: '#212e53e6',
    color: '#fffafa',
    padding: 12,
    margin: 4
  }
});

const MessageBox = props => {
  const { classes } = props;

  return (
    <Grid container item xs={12} justify={props.author ? 'flex-end' : 'flex-start'} style={{ padding: 3 }}>
      {props.authorName !== 'SERVER' && (
        <Grid item xs={12}>
          <Typography align={props.author ? 'right' : 'left'} variant="caption" style={{color: '#696969', fontWeight: 'bold' }}>
            {props.authorName}
          </Typography>
        </Grid>
      )}

      <Grid item style={{ flexShrink: 1 }}>
        <Typography variant="body2" className={props.author ? classes.myMessage : classes.notMyMessage}>
          {props.messageContent}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MessageBox);
