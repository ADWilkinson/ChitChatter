import React, {useEffect, useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import ParticipantsContainer from "../components/ParticipantsContainer";
import { Store } from "../store";

const HomePage = () => {

  const { state } = useContext(Store);

  useEffect(() => {
    const socket = new WebSocket("ws://" + window.location.host + "/ws/" + state.channel);

    socket.onopen = () => {
      console.log('Succesfully connected to chat server at ws://localhost:8080/ws/' + state.channel)
  }

  socket.onclose = () => {
      console.log('Goodbye!')
  }

  socket.onerror = () => {
      console.log('Uh oh...')
  }

  socket.onmessage = event => {
      const data = JSON.parse(event.data)
      const { type } = data
      switch (type) {
          case 'message':
              this.setState(state => ({
                  messages: [...state.messages, { text: data.text, author: data.author }]
              }))
              this.scrollToBottom()
              break
          case 'joinChat':
              this.setState(state => ({
                  messages: data.previousMessages,
                  author: data.author
              }))
              this.scrollToBottom()
              break
          case 'participantsUpdate':
              this.setState(state => ({
                  participants: data.participants
              }))
              break
          default:
              break
      }
    }
  }, [state.channel]);


  return (
    <React.Fragment>
      <ParticipantsContainer />
      <ChatContainer />
    </React.Fragment>
  );
};

export default HomePage;
