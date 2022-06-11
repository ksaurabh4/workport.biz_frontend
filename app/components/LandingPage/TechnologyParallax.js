import React from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './landingStyle-jss';

function TechnologyParallax(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <Parallax
          y={[-20, 20]}
          tagOuter="figure"
        >
          <svg
            fill="#fff"
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide3
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide3.svg#Line-Side3" />
          </svg>
        </Parallax>
        <Parallax
          y={[-20, 20]}
          tagOuter="figure"
        >
          <svg
            fill="#fff"
            className={
              classNames(
                classes.parallaxVertical,
                classes.parallaxLineSide4
              )
            }
          >
            <use xlinkHref="/images/decoration/lineSide4.svg#Line-Side4" />
          </svg>
        </Parallax>
      </ParallaxProvider>
    </div>
  );
}

TechnologyParallax.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TechnologyParallax);
