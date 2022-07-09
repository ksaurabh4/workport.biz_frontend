import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import link from 'dan-api/ui/link';
import styles from './landingStyle-jss';
import BannerParallax from './BannerParallax';

function Banner(props) {
  const { classes, slideMode } = props;
  const isloggedInUser = useSelector(state => state.auth.loggedIn);
  const gradient = useSelector(state => state.ui.gradient);
  return (
    <div
      className={
        classNames(
          classes.banner,
          gradient ? classes.gradient : classes.solid,
          slideMode ? classes.out : classes.fit
        )
      }
    >
      {!slideMode && <BannerParallax />}
      <div className={!slideMode ? classes.container : ''}>
        <Typography component="h2" variant="h2" gutterBottom>WorkPort</Typography>
        <Typography component="p" variant="h5" gutterBottom>Employees goals and performance management system</Typography>
        <Typography component="p" variant="h5" gutterBottom>Performance speaks louder than words</Typography>
        <div className={classes.btnArea}>
          {isloggedInUser ? (<Button
            size="large"
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to={link.dashboard}
          >
            Go to dashboard
          </Button>) : (<><Button
            size="large"
            variant="outlined"
            className={classNames(classes.button, classes.btnLight)}
            href={link.register}
            target="_blank"
          >
            Register Now
          </Button>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to={link.login}
          >
              See Demo / Login
          </Button>
          </>)}
        </div>
        <div className={classes.previewApp}>
          <Hidden smDown>
            <div className={classNames(classes.m2, classes.screen, slideMode ? classes.bottom : '')}>
              <img src="/images/screen/banner1.png" alt="workport banner 1" />
            </div>
          </Hidden>
          <div className={classNames(classes.m1, classes.screen)}>
            <img src="/images/screen/banner2.jpg" alt="workport banner 2" />
          </div>
          <Hidden smDown>
            <div className={classNames(classes.m3, classes.screen, slideMode ? classes.bottom : '')}>
              <img src="/images/screen/banner3.jpg" alt="workport banner 3" />
            </div>
          </Hidden>
        </div>
      </div>
    </div>
  );
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool
};

Banner.defaultProps = {
  slideMode: false
};

const MemoedBanner = memo(Banner);
export default (withStyles(styles)(MemoedBanner));
