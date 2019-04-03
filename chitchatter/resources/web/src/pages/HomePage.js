import React, { useEffect, useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import ParticipantsContainer from "../components/ParticipantsContainer";
import { Store } from "../store";

const HomePage = () => {
  const { state } = useContext(Store);

  useEffect(() => {
    const socket = new WebSocket("ws://" + window.location.host + "/ws/" + state.channel);

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
  }, [state.channel]);

  return (
    <React.Fragment>
      <ParticipantsContainer />
      <ChatContainer />
    </React.Fragment>
  );
};

export default HomePage;
