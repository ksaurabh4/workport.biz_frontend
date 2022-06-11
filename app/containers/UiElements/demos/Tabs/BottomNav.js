import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = theme => ({
  root: {
    width: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  }
});

function BottomNav(props) {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState('recents');

  const handleChange = (event, val) => {
    setValue(val);
  };

  const handleChange2 = (event, val2) => {
    setValue2(val2);
  };

  const { classes } = props;

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="flex-start"
      direction="row"
      spacing={2}
    >
      <Grid item md={6} xs={12}>
        <Typography variant="button" className={classes.divider}>With Label</Typography>
        <div>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </div>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant="button" className={classes.divider}>Without Label</Typography>
        <div>
          <BottomNavigation value={value2} onChange={handleChange2} className={classes.root}>
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Folder" value="folder" icon={<Icon>folder</Icon>} />
          </BottomNavigation>
        </div>
      </Grid>
    </Grid>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
