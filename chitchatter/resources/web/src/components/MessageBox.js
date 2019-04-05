import React from 'react';
import { Grid, Typography, withStyles, Divider } from '@material-ui/core';

const styles = theme => ({
  myMessage: {
    minHeight: '16px',
    minWidth: '16px',
    borderRadius: 6,
    backgroundColor: '#0084ff',
    color: '#ffffff',
    padding: 6,
    margin: 2
  },
  notMyMessage: {
    minHeight: '16px',
    minWidth: '16px',
    borderRadius: 6,
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(0,0,0,0.5)' : '#f6f6f6',
    padding: 6,
    margin: 2
  }
});

const MessageBox = props => {
  const { classes } = props;

  return (
    <Grid container item xs={12} justify={props.author ? 'flex-end' : 'flex-start'} style={{ padding: 3 }}>
      {props.showAuthor && (
        <Grid item xs={12}>
          <Typography align={props.author ? 'right' : 'left'} variant="caption" style={{ fontWeight: 'bold' }}>
            {'props.authorName'}
          </Typography>
        </Grid>
      )}
      <Grid item style={{ flexShrink: 1 }}>
        <Typography variant="body1" className={props.author ? classes.myMessage : classes.notMyMessage}>
          {props.messageContent}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MessageBox);
