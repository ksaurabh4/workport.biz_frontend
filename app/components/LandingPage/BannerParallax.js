import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import styles from './landingStyle-jss';

function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <ParallaxProvider>
      <div className={classes.bannerParallaxWrap}>
        <Parallax
          y={[-60, 10]}
          tagOuter="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner1)} />
        </Parallax>
        <Parallax
          y={[-50, 15]}
          tagOuter="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.lineBanner2)} />
        </Parallax>
        <Parallax
          y={[-1, 70]}
          tagOuter="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner1)} />
        </Parallax>
        <Parallax
          y={[-30, 60]}
          tagOuter="figure"
        >
          <span className={classNames(classes.paralaxFull, classes.petalBanner2)} />
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const BannerParallax = withStyles(styles)(ParallaxDeco);

export default BannerParallax;
