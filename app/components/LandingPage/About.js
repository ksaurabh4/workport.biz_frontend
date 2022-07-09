import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import reactLogo from 'dan-images/logo/react.png';
import reduxLogo from 'dan-images/logo/redux.png';
import muiLogo from 'dan-images/logo/mui.png';
import routerLogo from 'dan-images/logo/react_router.png';
import webpackLogo from 'dan-images/logo/webpack.png';
import jssLogo from 'dan-images/logo/jss.png';
import TechnologyParallax from './TechnologyParallax';
import Title from './Title';
import styles from './landingStyle-jss';
import AboutParallax from './AboutParallax';

function About(props) {
  const { classes, slideMode } = props;

  return (
    <div className={classes.tech}>
      {!slideMode && (<AboutParallax />)}
      <div className={slideMode ? classes.fullWidth : classes.container}>
        <Title title="About us" desc="Who we are and what we are doing." align="center" monocolor={slideMode && true} />
        <Grid container className={classes.root} spacing={3}>
          Workport SAAS is an  effective tool to monitor employee performance at all levels and boost productivity with timely intervention
          Right direction and timely feedback can make the output green and an employee more productive
          We are passionate about people,management and technology
          Workport is step towards combining human capability and technology to boost productivity

        </Grid>
      </div>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

About.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(About);
