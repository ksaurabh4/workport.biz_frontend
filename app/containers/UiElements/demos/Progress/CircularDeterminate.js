import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing(2),
  },
});

function CircularDeterminate(props) {
  const [completed, setComplete] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setComplete((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 20);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const { classes } = props;
  return (
    <div>
      <CircularProgress
        className={classes.progress}
        variant="determinate"
        value={completed}
      />
      <CircularProgress
        className={classes.progress}
        variant="determinate"
        size={50}
        value={completed}
      />
      <CircularProgress
        className={classes.progress}
        color="secondary"
        variant="determinate"
        value={completed}
      />
      <CircularProgress
        className={classes.progress}
        color="secondary"
        variant="determinate"
        size={50}
        value={completed}
      />
    </div>
  );
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularDeterminate);
