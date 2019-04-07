import React, { useContext, useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import { Grid, Card, Tab, Tabs, AppBar, withStyles, Button, Fab } from '@material-ui/core';
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
    marginTop: '40px',
    borderRadius: '20px',
    border: 'solid thin #00000036',
    minWidth: '50%',
    maxWidth: '100%'
  },
  noTop: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '0px',
      paddingTop: '0px'
    }
  },
  noButton: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
  },
  footerCard: {
    borderRadius: '25px'
  },
  rightIcon: {
    marginRight: theme.spacing.unit
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
    }, 400);
  }, []);
  const changeChannel = (event, value) => {
    setTimeout(() => {
      forceScrollToBottom();
    }, 100);
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
        {messageArray.map((msg, index) => {
          return <MessageBox key={index} author={msg.userId === state.userId} authorName={msg.sender} messageContent={msg.message} />;
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className={classNames(classes.root, classes.content, classes.toolbar)}>
        <Grid container justify="center">
          <Card className={classNames(classes.card, classes.noTop)}>
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
      <Grid className={classes.noButton} container justify="center">
        <Fab variant="extended" style={{ backgroundColor: '#ce6a6b12' }} aria-label="Github" target="_blank" href={'https://github.com/ADWilkinson'}>
          <div className={classes.rightIcon}>
            <i className={'fab fa-github'} />
          </div>
          <span>{'Created with'} </span>
          <i style={{ padding: '0px 7px 0px 7px', color: '#ce6a6b' }} className={'fas fa-heart'} />
          <span>{'by Andrew Wilkinson'} </span>
        </Fab>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(ChatContainer);
