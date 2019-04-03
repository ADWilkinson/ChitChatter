import React from 'react';
import { Grid, Card, CardContent, Typography, withStyles, TextField, Divider, Button, AppBar, Toolbar, Drawer } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

const styles = theme => ({
  root: {
      flexGrow: 1
  },
  content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
  },
  grow: {
      flexGrow: 1
  },
  drawer: {
      width: 240,
      flexShrink: 0,
      overflowY: 'auto'
  },
  drawerPaper: {
      width: 240,
      top: 'inherit'
  },
  card: {
      minWidth: 600,
      maxWidth: 600
  },
  messages: {
      minHeight: 300,
      maxHeight: 300,
      overflow: 'auto'
  },
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
  },
  myMessage: {
      minHeight: '16px',
      minWidth: '16px',
      borderRadius: 6,
      backgroundColor: '#0084ff',
      color: '#ffffff',
      padding: 6,
      margin: 2
  },
  notMyMessage: {
      minHeight: '16px',
      minWidth: '16px',
      borderRadius: 6,
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(0,0,0,0.5)' : '#f6f6f6',
      padding: 6,
      margin: 2
  },
  toolbar: theme.mixins.toolbar
})


const ChatContainer = props => {
  const { classes } = props;


  return (
    <React.Fragment>
            <div className={classes.root}>
                <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                    <div className={classes.toolbar} />
                    {/* Render Participants */}
                </Drawer>
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
                                        value={'Hello'}
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
                                                paddingLeft: '6px',
                                                color: false ? 'rgba(0,0,0,.2)' : '#0084ff'
                                            }}
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </div>
            </div>
      
    </React.Fragment>
  );
};

export default withStyles(styles)(ChatContainer);
