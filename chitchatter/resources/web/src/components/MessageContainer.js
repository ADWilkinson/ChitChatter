import React, { useState, useEffect } from 'react';
import { Grid, CardContent, withStyles, TextField, Divider, Button, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  messages: {
    minHeight: 700,
    maxHeight: 700,
    overflow: 'auto'
  },
  log: {
    minHeight: 150,
    maxHeight: 150,
    overflow: 'auto'
  },
  card: {
    minWidth: 600,
    maxWidth: 600
  },
  subtitle: {
    minHeight: '16px',
    minWidth: '16px',
    borderRadius: 6,
    padding: 6,
    margin: 2
  }
});

const MessageContainer = props => {
  const { classes } = props;
  const [userInput, setUserInput] = useState('');
  const endOfChat = React.createRef();

  const sendMessage = () => {
    if (userInput !== '') {
      props.sendHandler(userInput);
    }
    setUserInput('');
    scrollToBottom();
  };

  const handleSendButton = () => {
    sendMessage();
    props.forceScroll();
  };

  const handleChange = event => {
    setUserInput(event.target.value);
    scrollToBottom();
  };

  const handleEnter = event => {
    if (event.key.toLowerCase() === 'enter' && userInput !== '') {
      sendMessage();
      event.preventDefault();
    }
  };

  const scrollToBottom = () => {
    endOfChat.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  return (
    <React.Fragment>
      <CardContent id="endOfChat" className={classes.messages}>
        <Grid container alignContent={'flex-end'}>
          {props.messageList(true)}
        </Grid>
        <div style={{ paddingTop: '50px' }} ref={endOfChat} />
      </CardContent>
      <Divider />

      <Grid container wrap="nowrap" justify="center" style={{ margin: 12 }}>
        <Grid item xs={10} container justifty="center">
          <TextField
            label="Type a message..."
            autoFocus
            className={classes.card}
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleEnter}
            InputProps={{
              disableUnderline: true
            }}
          />
        </Grid>
        <Grid item xs={2} container justify="center">
          <Button variant="text" disabled={userInput === ''} onClick={handleSendButton}>
            Send
            <SendIcon
              style={{
                paddingLeft: '6px',
                color: false ? 'rgba(0,0,0,.2)' : '#0084ff'
              }}
            />
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <CardContent className={classes.log}>
        <Typography variant="body2" className={classes.subtitle}>
          {'Server Messages'}
        </Typography>
        <Divider />
        <Grid container>{props.messageList(false)}</Grid>
      </CardContent>
    </React.Fragment>
  );
};

export default withStyles(styles)(MessageContainer);
