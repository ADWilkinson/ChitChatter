import React from 'react';
import { withStyles, Drawer, Grid, Typography, Divider } from '@material-ui/core';

const styles = theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
    overflowY: 'auto'
  },
  drawerPaper: {
    width: 240,
    top: 'inherit'
  },
  userBar: {
    color: '#242424e6',
    padding: '5px',
    fontWeight: 'bold'
  },
  toolbar: theme.mixins.toolbar
});

const ParticipantsContainer = props => {
  const { classes } = props;

  const renderParticpants = users => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography style={{ color: '#212e53ed' }} align="center" variant="h6">
            Users
          </Typography>
          <Typography style={{ color: users.length === 0 ? '#ebaca2' : '#4a919e' }} align="center" variant="caption">
            {users.length} total
          </Typography>
          <Divider style={{ margin: '5px 0px 0px 0px' }} />
        </Grid>
        {users.map((user, index) => {
          return (
            <Grid key={index} item xs={12}>
              <Typography
                align="center"
                style={{ backgroundColor: index % 2 === 0 ? '#bed3c399' : 'rgba(74, 145, 158, 0.39)' }}
                variant="caption"
                className={classes.userBar}
              >
                {user.id}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        {renderParticpants(props.participants)}
      </Drawer>
    </React.Fragment>
  );
};

export default withStyles(styles)(ParticipantsContainer);
