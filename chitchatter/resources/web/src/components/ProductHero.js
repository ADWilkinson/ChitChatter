import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';

const backgroundImage = require('../assets/Hero.jpg');

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
    height: 500
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4
  },
  more: {
    marginTop: theme.spacing.unit * 2
  }
});

const ProductHero = props => {
  const { classes } = props;

  return (
    <section className={classes.background}>
      <MuiTypography color="inherit" align="center" variant="h2" marked="center" />
      <MuiTypography color="inherit" align="center" variant="h5" className={classes.h5} />
      <MuiButton color="secondary" variant="contained" size="large" className={classes.button} href="/signup">
        Register
      </MuiButton>
      <MuiTypography variant="body2" color="inherit" className={classes.more} />
    </section>
  );
};

export default withStyles(styles)(ProductHero);
