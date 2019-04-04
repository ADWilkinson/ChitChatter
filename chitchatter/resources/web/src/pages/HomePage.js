import React, { useEffect, useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import ParticipantsContainer from "../components/ParticipantsContainer";
import { Store } from "../store";
import { SET_CHANNEL_SOCKET, REMOVE_CHANNEL_SOCKET } from "../constants/channelActions";
import { connect } from "../utils/socket";

const HomePage = () => {
  const { state, dispatch, sockets } = useContext(Store);

  useEffect(() => {
    console.warn('HOMEPAGE', sockets)
  }, []);

  return (
    <React.Fragment>
      <ParticipantsContainer />
      <ChatContainer />
    </React.Fragment>
  );
};

export default HomePage;
