import React, { useContext, useState } from "react";
import MessageContainer from "./MessageContainer";
import { Grid, Card, Tab, Tabs, AppBar, withStyles } from "@material-ui/core";
import classNames from "classnames";
import { Store } from "../store";
import { SET_CHANNEL } from "../constants/channelActions";
import { CHANNEL_GLOBAL, CHANNEL_UK } from "../constants/channels";
import { connect } from "../utils/socket";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  card: {
    minWidth: 800,
    maxWidth: 800
  }
});

const ChatContainer = props => {
  const { classes } = props;
  const { state, dispatch } = useContext(Store);
  const [index, setIndex] = useState(0);

  const changeChannel = (event, value) => {
    setIndex(value);
    const channelSelected = value === 0 ? { name: CHANNEL_GLOBAL, index: 0 } : { name: CHANNEL_UK, index: 1 };

    dispatch({
      type: SET_CHANNEL,
      payload: channelSelected
    });
  };

  return (
    <React.Fragment>
      <div className={classNames(classes.root, classes.content, classes.toolbar)}>
        <Grid container justify="center">
          <Card className={classes.card}>
            <AppBar position="static" color="default">
              <Tabs value={index} onChange={changeChannel} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab label="Global" />
                <Tab label="United Kingdom" />
              </Tabs>
            </AppBar>

            <MessageContainer style={{ padding: 16, margin: 16 }} />
          </Card>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(ChatContainer);
