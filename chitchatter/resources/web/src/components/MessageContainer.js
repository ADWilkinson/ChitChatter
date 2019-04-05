import React, { useContext, useState } from 'react';
import { Grid, CardContent, withStyles, TextField, Divider, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Store } from '../store';
import { Sockets } from '../utils/socket';
import MessageBox from './MessageBox';
import { CHANNEL_GLOBAL } from '../constants/channels';

const styles = theme => ({
  messages: {
    minHeight: 500,
    maxHeight: 1000,
    overflow: 'auto'
  },
  card: {
    minWidth: 600,
    maxWidth: 600
  }
});

const MessageContainer = props => {
  const { classes } = props;
  const { state } = useContext(Store);
  const { sockets } = useContext(Sockets);
  const [userInput, setUserInput] = useState('');

  const sendMessage = () => {
    const currSocket = sockets.find(x => x.name === state.channel);
    if (userInput !== '') {
      currSocket.socket.send(userInput);
    }
    setUserInput('');
  };

  const handleChange = event => {
    setUserInput(event.target.value);
  };

  const handleEnter = event => {
    if (event.key.toLowerCase() === 'enter' && userInput !== '') {
      sendMessage();
      event.preventDefault();
    }
  };

  const renderMessages = () => {
    const messageArray = state.channel === CHANNEL_GLOBAL ? state.messages.global : state.messages.uk;

    return (
      <React.Fragment>
        {messageArray.map(msg => {
          return <MessageBox key={msg.sender + msg.timestamp + msg.message} author={true} authorName={msg.sender} messageContent={msg.message} />;
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <CardContent className={classes.messages}>
        <Grid container alignContent={'flex-end'}>
          {renderMessages()}
        </Grid>
      </CardContent>
      <Divider />

      <Grid container wrap="nowrap" justify="center" style={{ marginTop: 12 }}>
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

        <Grid item xs={6} container justify="center">
          <Button variant="text" disabled={false} onClick={sendMessage}>
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
    </React.Fragment>
  );
};

export default withStyles(styles)(MessageContainer);
