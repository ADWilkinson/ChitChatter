import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  topLayer: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    fontSize: 24
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

const Navbar = props => {
  const { classes } = props;

  return (
    <MuiAppBar position="static" className={classes.topLayer}>
      <MuiToolbar className={classNames(classes.toolbar, classes.topLayer)}>
        <div className={classes.left} />
        <Link variant="h6" underline="none" color="inherit" className={classes.title} href="/">
          ChitChatter
          <img style={{ height: '1.5em', paddingLeft: '0.5em' }} src={require('../assets/conversation.png')} />
        </Link>
        <div className={classes.right} />
      </MuiToolbar>
    </MuiAppBar>
  );
};

export default withStyles(styles)(Navbar);
