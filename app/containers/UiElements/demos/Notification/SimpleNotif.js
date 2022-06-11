import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  button: {
    margin: theme.spacing(1)
  }
});

function SimpleNotif(props) {
  const [notifState, setNotif] = useState({
    open: false,
    open2: false,
    vertical: 'bottom',
    horizontal: 'left',
  });

  const handleClick = () => {
    setNotif({
      ...notifState,
      open: true
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotif({
      ...notifState,
      open: false
    });
  };

  const handleClick2 = state => {
    setNotif({
      ...notifState,
      open2: true,
      ...state
    });
  };

  const handleClose2 = () => {
    setNotif({
      ...notifState,
      open2: false
    });
  };

  const { classes } = props;
  const {
    vertical,
    horizontal,
    open,
    open2
  } = notifState;

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="flex-start"
      direction="row"
      spacing={2}
    >
      <Grid item md={6}>
        <Typography variant="button" className={classes.divider}>Simple Notification</Typography>
        <div>
          <Button variant="contained" onClick={() => handleClick()}>Open simple snackbar</Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={() => handleClose()}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Note archived</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={() => handleClose()}>
                UNDO
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={() => handleClose()}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      </Grid>
      <Grid item md={6}>
        <Typography variant="button" className={classes.divider}>Positioning</Typography>
        <div>
          <Button className={classes.button} variant="contained" onClick={() => handleClick2({ vertical: 'top', horizontal: 'center' })}>
            Top-Center
          </Button>
          <Button className={classes.button} variant="contained" onClick={() => handleClick2({ vertical: 'top', horizontal: 'right' })}>
            Top-Right
          </Button>
          <Button className={classes.button} variant="contained" onClick={() => handleClick2({ vertical: 'bottom', horizontal: 'right' })}>
            Bottom-Right
          </Button>
          <Button className={classes.button} variant="contained" onClick={() => handleClick2({ vertical: 'bottom', horizontal: 'center' })}>
            Bottom-Center
          </Button>
          <Button className={classes.button} variant="contained" onClick={() => handleClick2({ vertical: 'bottom', horizontal: 'left' })}>
            Bottom-Left
          </Button>
          <Button className={classes.button} variant="contained" onClick={() => handleClick2({ vertical: 'top', horizontal: 'left' })}>
            Top-Left
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open2}
            onClose={() => handleClose2()}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">I love snacks</span>}
          />
        </div>
      </Grid>
    </Grid>
  );
}

SimpleNotif.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleNotif);
