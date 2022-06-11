import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Rating } from 'dan-components';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
});

function RatingNormal(props) {
  const [rating, setRating] = useState(3);

  const handleChange = value => {
    setRating(value);
  };

  const { classes } = props;

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="space-around"
      direction="row"
      spacing={2}
    >
      <Grid
        item
        md={4}
        className={classes.demo}
      >
        <Typography variant="button" component="p">Ratting Normal</Typography>
        <FormControl className={classes.formControl}>
          <Rating
            value={rating}
            max={5}
            onChange={(value) => handleChange(value)}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        md={4}
        className={classes.demo}
      >
        <Typography variant="button" component="p">Read Only</Typography>
        <FormControl className={classes.formControl}>
          <Rating
            value={2}
            max={5}
            readOnly
          />
        </FormControl>
      </Grid>
      <Grid
        item
        md={4}
        className={classes.demo}
      >
        <Typography variant="button" component="p">Disabled</Typography>
        <FormControl className={classes.formControl}>
          <Rating
            value={4}
            max={5}
            disabled
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

RatingNormal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RatingNormal);
