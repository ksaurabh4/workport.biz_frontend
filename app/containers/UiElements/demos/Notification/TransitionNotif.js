import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  close: {
    width: theme.spacing(4),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  button: {
    margin: theme.spacing(1)
  }
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

function TransitionNotif(props) {
  const [transitionState, setTransition] = useState({
    open: false,
    open2: false,
    open3: false,
    transition: null,
    messageInfo: {},
  });

  const queue = [];

  const processQueue = () => {
    if (queue.length > 0) {
      setTransition({
        ...transitionState,
        messageInfo: queue.shift(),
        open3: true,
      });
    }
  };

  const handleClickQueue = message => {
    const { open3 } = transitionState;
    queue.push({
      message,
      key: new Date().getTime(),
    });

    if (open3) {
      // immediately begin dismissing current message
      // to start showing new one
      setTransition({
        ...transitionState,
        open3: false
      });
    } else {
      processQueue();
    }
  };

  const handleCloseQueue = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setTransition({
      ...transitionState,
      open3: false
    });
  };

  const handleExited = () => {
    processQueue();
  };

  const handleClick = transition => {
    setTransition({
      ...transitionState,
      open: true,
      transition
    });
  };

  const handleClose = () => {
    setTransition({
      ...transitionState,
      open: false
    });
  };

  const handleClick2 = () => {
    setTransition({
      ...transitionState,
      open2: true
    });
  };

  const handleClose2 = () => {
    setTransition({
      ...transitionState,
      open2: false
    });
  };

  const { classes } = props;
  const {
    messageInfo,
    open,
    open2,
    open3,
    transition
  } = transitionState;
  const { message, key } = messageInfo;
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
      >
        <Typography variant="button" className={classes.divider}>Transition</Typography>
        <div>
          <Button variant="contained" className={classes.button} onClick={() => handleClick(TransitionLeft)}>Right</Button>
          <Button variant="contained" className={classes.button} onClick={() => handleClick(TransitionUp)}>Up</Button>
          <Button variant="contained" className={classes.button} onClick={() => handleClick(TransitionRight)}>Left</Button>
          <Button variant="contained" className={classes.button} onClick={() => handleClick(TransitionDown)}>Down</Button>
          <Snackbar
            open={open}
            onClose={() => handleClose()}
            TransitionComponent={transition}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span>I love snacks</span>}
          />
        </div>
      </Grid>
      <Grid
        item
        md={4}
      >
        <Typography variant="button" className={classes.divider}>Change Transition</Typography>
        <div>
          <Button variant="contained" className={classes.button} onClick={() => handleClick2()}>Open with Fade Transition</Button>
          <Snackbar
            open={open2}
            onClose={() => handleClose2()}
            TransitionComponent={Fade}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span>I love snacks</span>}
          />
        </div>
      </Grid>
      <Grid
        item
        md={4}
      >
        <Typography variant="button" className={classes.divider}>Consecutive Snackbars</Typography>
        <div>
          <Button variant="contained" className={classes.button} onClick={() => handleClickQueue('message a')}>Show message A</Button>
          <Button variant="contained" className={classes.button} onClick={() => handleClickQueue('message b')}>Show message B</Button>
          <Snackbar
            key={key}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open3}
            autoHideDuration={6000}
            onClose={() => handleCloseQueue()}
            TransitionProps={{
              onExited: handleExited
            }}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span>{message}</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={() => handleClose2()}>
                UNDO
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={() => handleCloseQueue()}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </Grid>
    </Grid>
  );
}

TransitionNotif.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransitionNotif);
