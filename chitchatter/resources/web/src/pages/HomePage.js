import React from "react";
import ChatContainer from "../components/ChatContainer";
import ParticipantsContainer from "../components/ParticipantsContainer";

const HomePage = () => {

  return (
    <React.Fragment>
      <ParticipantsContainer />
      <ChatContainer />
    </React.Fragment>
  );
};

export default HomePage;
