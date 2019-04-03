import React, { useEffect, useContext } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import { Store } from '../store';
import { SET_LOCATION } from '../constants/navigationActions';

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

  /*

  Context API Hooks Example:

  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: SET_LOCATION,
      payload: 'HOMEPAGE'
    });
  }, []);
  */

  return (
    <MuiAppBar position="static" className={classes.topLayer}>
      <MuiToolbar className={classNames(classes.toolbar, classes.topLayer)}>
        <div className={classes.left} />
        <Link variant="h6" underline="none" color="inherit" className={classes.title} href="/">
          ChitChatter
        </Link>
        <div className={classes.right}>
          {/* <Link color="inherit" variant="h6" underline="none" className={classes.rightLink} href="/login">
            {'Sign In'}
          </Link>
          <Link variant="h6" underline="none" className={classNames(classes.rightLink, classes.linkSecondary)} href="/signup">
            {'Sign Up'}
          </Link> */}
        </div>
      </MuiToolbar>
    </MuiAppBar>
  );
};

export default withStyles(styles)(Navbar);
