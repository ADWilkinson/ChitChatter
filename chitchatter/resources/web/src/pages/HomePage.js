import React, { useEffect, useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import ParticipantsContainer from "../components/ParticipantsContainer";
import { Store } from "../store";
import { SET_CHANNEL_SOCKET, REMOVE_CHANNEL_SOCKET } from "../constants/channelActions";

const HomePage = () => {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {

    if (state.socketInfo.currentSocket.readyState === WebSocket.OPEN) {
      state.socketInfo.currentSocket.close();

      dispatch({
        type: REMOVE_CHANNEL_SOCKET,
        payload: { socket: null }
      });

      console.warn("REMOVE SOCKET: ", state.socketInfo.currentSocket);
    }

    dispatch({
      type: SET_CHANNEL_SOCKET,
      payload: { socket: new WebSocket("ws://" + window.location.host + "/ws/" + state.channel.channel) }
    });

    console.warn("SET SOCKET: ", state.socketInfo.currentSocket);

    if (state.socketInfo.currentSocket.readyState === WebSocket.OPEN) {
      console.warn("HANDLERS SOCKET: ", state.socketInfo.currentSocket);

      state.socketInfo.currentSocket.onopen = () => {
        console.log("Succesfully connected to chat server at ws://localhost:8080/ws/" + state.channel.channel);
      };

      state.socketInfo.currentSocket.onclose = () => {
        console.log("Goodbye!");
      };

      state.socketInfo.currentSocket.onerror = () => {
        console.log("Uh oh...");
      };

      state.socketInfo.currentSocket.onmessage = event => {
        const data = JSON.parse(event.data);
        console.warn(event);
        console.warn(data);
      };
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
