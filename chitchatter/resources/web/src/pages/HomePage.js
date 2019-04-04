import React, { useEffect, useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import ParticipantsContainer from "../components/ParticipantsContainer";
import { Store } from "../store";
import { Sockets } from "../utils/socket";

const HomePage = () => {
  const { state, dispatch } = useContext(Store);
  const { sockets } = useContext(Sockets);

  useEffect(() => {
    for (const socketInfo of sockets) {
      socketInfo.socket.onopen = () => {
        console.log("Succesfully connected to channel: " + state.channel);
      };

      socketInfo.socket.onerror = () => {
        console.log("Uh oh... there was an error connected to the chat server");
      };

      socketInfo.socket.onmessage = event => {
        const data = JSON.parse(event.data);
        if (socketInfo.name !== data.channel) return;
        console.warn(data);
      };
    }
  }, []);

  return (
    <React.Fragment>
      <ParticipantsContainer />
      <ChatContainer />
    </React.Fragment>
  );
};

export default HomePage;
