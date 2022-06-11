import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Help from '@material-ui/icons/Help';
import Avatar from '@material-ui/core/Avatar';
import dummy from 'dan-api/dummy/dummyContents';
import avatarApi from 'dan-api/images/avatars';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

function LockForm(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleShowHint = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className={classes.lockWrap}>
          <Avatar alt="John Doe" src={avatarApi[6]} className={classes.avatar} />
          <div>
            <Typography className={classes.userName} variant="h5">{dummy.user.name}</Typography>
            <div className={classes.lockForm}>
              <FormControl className={classes.lockField}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type="password"
                  label="Your Password"
                  required
                  validate={required}
                  className={classes.field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Helper Hint"
                          onClick={handleShowHint}
                        >
                          <Help />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
              <Fab size="small" className={classes.unlockBtn} color="secondary" type="submit" disabled={submitting || pristine}>
                <ArrowForward />
              </Fab>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography className={classes.hint}>Hint: Type anything to unlock!</Typography>
              </Popover>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

LockForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const LockFormReduxed = reduxForm({
  form: 'lockForm',
  enableReinitialize: true,
})(LockForm);

export default withStyles(styles)(LockFormReduxed);
