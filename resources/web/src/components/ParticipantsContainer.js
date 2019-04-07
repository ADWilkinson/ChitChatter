import React, { useState } from 'react';
import { withStyles, Drawer, Grid, Typography, Divider, Hidden, Icon, IconButton, MenuItem, Fab } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import Arrow from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 240,
      flexShrink: 0,
      overflowY: 'auto'
    }
  },
  fab: {
    margin: theme.spacing.unit
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    paddingTop: '4em',
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
  const [mobile, setMobile] = useState({ mobileOpen: false });

  const handleDrawerToggle = () => {
    setMobile(mobile => ({ mobileOpen: !mobile.mobileOpen }));
  };

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
      <div>
        <Fab color="secondary" aria-label="People" style={{
          position: 'absolute',
          transform: 'translateY(-50px)',
          zIndex: '1250'}} onClick={handleDrawerToggle} className={classNames(classes.fab, classes.menuButton)}>
          <PeopleIcon />
        </Fab>
      </div>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobile.mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div style={{
            marginLeft: 'auto', marginRight: 'auto', marginBottom: '1em'}}>
            <Fab color="primary" aria-label="Back" align="center"  onClick={handleDrawerToggle} className={classNames(classes.fab, classes.menuButton)}>
              <Arrow />
            </Fab>
          </div>
          {renderParticpants(props.participants)}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {renderParticpants(props.participants)}
        </Drawer>
      </Hidden>

      {/* <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        {renderParticpants(props.participants)}
      </Drawer> */}
    </React.Fragment>
  );
};

export default withStyles(styles)(ParticipantsContainer);
