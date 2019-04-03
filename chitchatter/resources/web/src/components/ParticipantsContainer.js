import React from "react";
import { withStyles, Drawer } from "@material-ui/core";

const styles = theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
    overflowY: "auto"
  },
  drawerPaper: {
    width: 240,
    top: "inherit"
  },
  toolbar: theme.mixins.toolbar
});

const ParticipantsContainer = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        {/* Render Participants */}
      </Drawer>
    </React.Fragment>
  );
};

export default withStyles(styles)(ParticipantsContainer);
