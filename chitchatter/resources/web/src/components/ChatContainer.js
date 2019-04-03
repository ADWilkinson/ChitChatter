import React from "react";
import MessageContainer from "./MessageContainer";
import { Grid, Card, Tab, Tabs, AppBar, withStyles } from "@material-ui/core";
import classNames from "classnames";

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

  return (
    <React.Fragment>
      <div className={classNames(classes.root, classes.content, classes.toolbar)}>
        <Grid container justify="center">
          <Card className={classes.card}>
            <AppBar position="static" color="default">
              <Tabs value={""} onChange={() => {}} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
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
