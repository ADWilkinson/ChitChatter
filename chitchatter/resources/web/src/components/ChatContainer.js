import React from "react";
import { withStyles } from "@material-ui/core";
import ParticipantsContainer from "./ParticipantsContainer";
import MessageContainer from "./MessageContainer";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

const ChatContainer = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ParticipantsContainer />
        <MessageContainer />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(ChatContainer);
