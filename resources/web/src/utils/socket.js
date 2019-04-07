import React from "react";
import { CHANNEL_LIST } from "../constants/channels";

export const Sockets = React.createContext();

export const SocketsProvider = props => {
  const sockets = connect();
  const value = { sockets };

  return <Sockets.Provider value={value}>{props.children}</Sockets.Provider>;
};

const connect = () => {
  // DEV
  //const socket = new WebSocket("ws://localhost:8080/ws/" + channel");
  const channels = CHANNEL_LIST;
  const sockets = [];

  for (const channel of channels) {
    console.log('Connecting to channel: ', channel)
    const socket = new WebSocket("wss://" + window.location.host + "/ws/" + channel);

    socket.onclose = () => {
      console.dir("Connection to chat server closed, attempting to reconnect...");
      setTimeout(function() {
//        connect();
      }, 1000);
    };

    const socketInfo = {
      name: channel,
      socket: socket
    };

    sockets.push(socketInfo);
  }
  return sockets;
};


