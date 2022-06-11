import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { BreadCrumb } from 'dan-components';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: '10px',
    position: 'relative'
  },
});

function ClassicBreadcrumbs(props) {
  const { classes } = props;
  const location = { pathname: '/grand-parent/parent/children' };
  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="flex-start"
      direction="row"
      spacing={2}
    >
      <Grid
        item
        md={4}
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Typography variant="button" className={classes.divider}>Arrow Separator</Typography>
        <div className={classes.field}>
          <BreadCrumb theme="dark" separator=" › " location={location} />
        </div>
      </Grid>
      <Grid
        item
        md={4}
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Typography variant="button" className={classes.divider}>Slash Separator</Typography>
        <div className={classes.field}>
          <BreadCrumb theme="dark" separator=" / " location={location} />
        </div>
      </Grid>
      <Grid
        item
        md={4}
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Typography variant="button" className={classes.divider}>Greater Than Separator</Typography>
        <div className={classes.field}>
          <BreadCrumb theme="dark" separator=" > " location={location} />
        </div>
      </Grid>
    </Grid>
  );
}

ClassicBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassicBreadcrumbs);
