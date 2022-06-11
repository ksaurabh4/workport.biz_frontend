import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../redux/actions/authActions';
import api from '../../../redux/api';

function Login(props) {
  const dispatch = useDispatch();
  const submitForm = async ({ email, password, remember }) => {
    try {
      const data = {
        email,
        pswd: password,
        remember,
      };
      const res = await api.post('/login', data);
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('userRole', res.data.userId);
        dispatch(loginAction(res.data));
        window.location.href = '/app';
      }
    } catch (e) {
      console.log(e);
    }
  };

  const title = brand.name + ' - Login';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
