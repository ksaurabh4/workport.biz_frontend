import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearStatic(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={20} />
      <br />
      <LinearProgress variant="determinate" value={60} color="secondary" />
    </div>
  );
}

LinearStatic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearStatic);
