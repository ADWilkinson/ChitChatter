import React, { useContext, useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import { Grid, Card, Tab, Tabs, AppBar, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { Store } from '../store';
import { SET_CHANNEL } from '../constants/channelActions';
import { CHANNEL_GLOBAL, CHANNEL_UK } from '../constants/channels';
import { Sockets } from '../utils/socket';
import { SERVER_MESSAGE } from '../constants/messageTypes';
import MessageBox from './MessageBox';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  card: {
    minWidth: '50%',
    maxWidth: '50%'
  }
});

const ChatContainer = props => {
  const { classes } = props;
  const { state, dispatch } = useContext(Store);
  const { sockets } = useContext(Sockets);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      forceScrollToBottom();
    }, 1000);
  }, []);
  const changeChannel = (event, value) => {
    setIndex(value);
    const channelSelected = value === 0 ? { name: CHANNEL_GLOBAL, index: 0 } : { name: CHANNEL_UK, index: 1 };

    dispatch({
      type: SET_CHANNEL,
      payload: channelSelected
    });
  };

  const handleSendMessage = input => {
    const currSocket = sockets.find(x => x.name === state.channel);
    if (input !== '') {
      currSocket.socket.send(input);
    }
  };

  const forceScrollToBottom = () => {
    let listEnd = document.getElementById('endOfChat');
    listEnd.scrollTop = listEnd.scrollHeight;
  };

  const renderMessages = userMessagesOnly => {
    let messageArray;

    if (userMessagesOnly) {
      messageArray = state.channel === CHANNEL_GLOBAL ? state.messages.global : state.messages.uk;
      messageArray = messageArray.filter(x => x.type !== SERVER_MESSAGE);
    } else {
      messageArray = [...state.messages.global, ...state.messages.uk];
      messageArray = messageArray.filter(x => x.type === SERVER_MESSAGE).reverse();
    }

    return (
      <React.Fragment>
        {messageArray.map(msg => {
          return (
            <MessageBox key={msg.sender + msg.timestamp + msg.message} author={true} authorName={msg.sender} messageContent={msg.message} />
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className={classNames(classes.root, classes.content, classes.toolbar)}>
        <Grid container justify="center">
          <Card className={classes.card}>
            <AppBar position="static" color="default">
              <Tabs value={index} onChange={changeChannel} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab label="Global" />
                <Tab label="United Kingdom" />
              </Tabs>
            </AppBar>

            <MessageContainer
              forceScroll={forceScrollToBottom}
              messageList={renderMessages}
              sendHandler={handleSendMessage}
              style={{ padding: 16, margin: 16 }}
            />
          </Card>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(ChatContainer);
