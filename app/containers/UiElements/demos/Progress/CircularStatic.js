import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing(2),
  },
});

function CircularStatic(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} variant="determinate" value={5} />
      <CircularProgress className={classes.progress} variant="determinate" value={25} />
      <CircularProgress className={classes.progress} variant="determinate" value={50} />
      <CircularProgress className={classes.progress} variant="determinate" value={75} />
      <CircularProgress className={classes.progress} variant="determinate" value={100} />
    </div>
  );
}

CircularStatic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularStatic);
