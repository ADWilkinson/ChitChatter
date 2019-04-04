import React, { useEffect, useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import ParticipantsContainer from "../components/ParticipantsContainer";
import { Store } from "../store";
import { SET_CHANNEL_SOCKET, REMOVE_CHANNEL_SOCKET } from "../constants/channelActions";

const HomePage = () => {
  const { state, dispatch } = useContext(Store);

  const connect = () => {
    
    console.log(state.channel);
    // DEV
    const socket = new WebSocket("ws://" + "localhost:8080" + "/ws/" + state.channel);
    // PROD
    //const socket = new WebSocket("ws://" + window.location.host + "/ws/" + state.channel);

    socket.onopen = () => {
      console.log("Succesfully connected to chat server at ws://localhost:8080/ws/" + state.channel);
    };

    socket.onclose = () => {
      console.log("Goodbye!");
    };

    socket.onerror = () => {
      console.log("Uh oh...");
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.warn(event);
      console.warn(data);
    };

    console.warn(socket);
    return socket;
  }

  useEffect(() => {
    dispatch({
      type: SET_CHANNEL_SOCKET,
      payload: { socket: connect() }
    });

    
  }, []);

  return (
    <React.Fragment>
      <ParticipantsContainer />
      <ChatContainer />
    </React.Fragment>
  );
};

export default HomePage;
