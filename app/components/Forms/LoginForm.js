import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Notification } from 'dan-components';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './user-jss';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import api from '../../redux/api';
import { closeNotifAction, loginAction, showErrorNotifAction } from '../../redux/actions/authActions';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showContactAdminAlert, setShowContactAdminAlert] = useState(false);
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.auth.notifMsg);
  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const demoLoginHandler = async () => {
    try {
      const data = {
        email: 'demo@workport.biz',
        pswd: 'password',
      };
      const user = await api.post('/login', data);
      if (user.data.token) {
        const employee = await api.get(`/employees/${user.data.empId}`, { headers: { Authorization: `Bearer ${user.data.token}` } });
        localStorage.setItem('user', JSON.stringify(user.data));
        localStorage.setItem('userId', user.data.userId);
        dispatch(loginAction({ ...user.data, ...employee.data }));
      }
    } catch (e) {
      console.log(e);
      dispatch(showErrorNotifAction(e.response.data.message));
    }
  };
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco,
  } = props;
  return (
    <Fragment>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Login
        </Typography>
        {/* <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Lorem ipsum dolor sit amet
        </Typography> */}
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder="Your Email"
                  label="Your Email"
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type={showPassword ? 'text' : 'password'}
                  label="Your Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  required
                  validate={required}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.optArea}>
              {/* <FormControlLabel className={classes.label} control={<Field name="checkbox" component={CheckboxRedux} />} label="Remember" /> */}
              <div></div>
              <Dialog
                open={showContactAdminAlert}
                onClose={() => setShowContactAdminAlert(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Contact Administrator'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Contact Admin Team to reset your password.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowContactAdminAlert(false)} color="primary" autoFocus>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
              <Button size="small" className={classes.buttonLink} onClick={() => setShowContactAdminAlert(true)}>Forgot Password</Button>
            </div>
            <div style={{ marginTop: 5 }}>
              <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
                <Icon className={classes.icon}>arrow_forward</Icon>
              Not have Account yet! Want to register?
              </Button>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" size="large" type="submit">
                Continue
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>
        <div className={classes.btnArea}>
          <Button variant="outlined" color="secondary" size="large" onClick={demoLoginHandler}>
            Demo Login
            <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
          </Button>
        </div>
        {/* <div style={{ marginTop: '30px', fontSize: '14px' }}>
          <p>Use below credential for demo login</p>
          <Grid>
            <Grid><b>Username:</b> demo@workport.com</Grid>
            <Grid><b>Password:</b> demo@workport</Grid>
          </Grid>
        </div> */}
      </Paper>
    </Fragment>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: 'loginForm',
  enableReinitialize: true,
})(LoginForm);

const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.login.usersLogin,
    deco: state.ui.decoration
  }),
)(LoginFormReduxed);

export default withStyles(styles)(FormInit);
