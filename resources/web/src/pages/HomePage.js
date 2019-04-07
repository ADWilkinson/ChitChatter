import React, { useEffect, useContext } from 'react';
import ChatContainer from '../components/ChatContainer';
import ParticipantsContainer from '../components/ParticipantsContainer';
import { Store } from '../store';
import { Sockets } from '../utils/socket';
import MessageProcessor from '../utils/messageProcessor';

const HomePage = () => {
  const { state, dispatch } = useContext(Store);
  const { sockets } = useContext(Sockets);
  const processor = new MessageProcessor(dispatch);

  useEffect(() => {
    for (const socketInfo of sockets) {
      socketInfo.socket.onopen = () => {
        console.log('Succesfully connected to channel: ' + socketInfo.name);
      };

      socketInfo.socket.onerror = () => {
        console.log('Uh oh... there was an error connected to the chat server');
      };

      socketInfo.socket.onmessage = async event => {
        const data = JSON.parse(event.data);
        await processor.execute(data);
      };
    }
  }, []);

  return (
    <React.Fragment>
      <ParticipantsContainer participants={state.users} />
      <ChatContainer messages={state.messages} />
    </React.Fragment>
  );
};

export default HomePage;
