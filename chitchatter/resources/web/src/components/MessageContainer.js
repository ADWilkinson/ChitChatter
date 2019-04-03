import React from "react";
import { Grid, Card, CardContent, withStyles, TextField, Divider, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const styles = theme => ({
  messages: {
    minHeight: 500,
    maxHeight: 500,
    overflow: "auto"
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

const MessageContainer = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center">
          <Card className={classes.card} style={{ padding: 16, margin: 16 }}>
            <CardContent className={classes.messages}>{/* Render Messages*/}</CardContent>
            <Divider />
            <Grid container wrap="nowrap" justify="center" style={{ marginTop: 12 }}>
              <Grid item xs={10} container justifty="center">
                <TextField
                  label="Type a message..."
                  autoFocus
                  className={classes.card}
                  value={"Hello"}
                  onChange={() => {}}
                  onKeyDown={() => {}}
                  InputProps={{
                    disableUnderline: true
                  }}
                />
              </Grid>
              <Grid item xs={6} container justify="center">
                <Button variant="text" disabled={false} onClick={() => {}}>
                  Send
                  <SendIcon
                    style={{
                      paddingLeft: "6px",
                      color: false ? "rgba(0,0,0,.2)" : "#0084ff"
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(MessageContainer);
