import { CHANNEL_UK, CHANNEL_GLOBAL } from '../constants/channels';
import { USER_MESSAGE, SERVER_MESSAGE, SERVER_UPDATE_MESSAGES, SERVER_UPDATE_USERS } from '../constants/messageTypes';
import { ADD_GLOBAL_MESSAGE, ADD_UK_MESSAGE, SET_MESSAGE_HISTORY } from '../constants/messagesActions';
import { SET_USERS_LIST } from '../constants/usersActions';

export default class MessageProcessor {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  dispatch;

  async execute(data) {
    switch (data.type) {
      case USER_MESSAGE:
        await this.addMessageToStore(data);
        break;
      case SERVER_MESSAGE:
        await this.addMessageToStore(data);
        break;
      case SERVER_UPDATE_MESSAGES:
        await this.setMessageHistoryToStore(data);
        break;
      case SERVER_UPDATE_USERS:
        await this.setUserListToStore(data);
        break;
      default:
        break;
    }
  }

  dispatchAction = async (type, payload) => {
    await this.dispatch({
      type: type,
      payload: payload
    });
  };

  addMessageToStore = async data => {
    const messageObj = {
      sender: data.sender,
      channel: data.channel,
      recipient: data.recipient,
      message: data.message,
      timestamp: data.messageTime
    };

    if (data.channel === CHANNEL_GLOBAL) {
      await this.dispatchAction(ADD_GLOBAL_MESSAGE, messageObj);
    }

    if (data.channel === CHANNEL_UK) {
      await this.dispatchAction(ADD_UK_MESSAGE, messageObj);
    }
  };

  setMessageHistoryToStore = async data => {
    const globalMessages = [];
    const ukMessages = [];

    data.messageHistory.forEach(message => {
      if (message.channel === CHANNEL_GLOBAL) {
        globalMessages.push({
          sender: message.sender,
          channel: message.channel,
          recipient: message.recipient,
          message: message.message,
          timestamp: message.messageTime
        });
      } else if (message.channel === CHANNEL_UK) {
        ukMessages.push({
          sender: message.sender,
          channel: message.channel,
          recipient: message.recipient,
          message: message.message,
          timestamp: message.messageTime
        });
      }
    });

    const payload = {
      global: globalMessages,
      uk: ukMessages
	};
    await this.dispatchAction(SET_MESSAGE_HISTORY, payload);
  };

  setUserListToStore = async data => {
    await this.dispatchAction(SET_USERS_LIST, data.participants);
  };
}
