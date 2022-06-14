import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import { RegisterForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { useDispatch } from 'react-redux';
import api from '../../../redux/api';
import { loginAction } from '../../../redux/actions/authActions';

function Register(props) {
  const [valueForm, setValueForm] = useState(null);
  const dispatch = useDispatch();
  const submitForm = async ({ userEmail, userPswd, companyName }) => {
    try {
      const data = {
        userEmail,
        userPswd,
        companyName,
      };
      const res = await api.post('/signUp', data);
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('userRole', res.data.userId);
        dispatch(loginAction(res.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const title = brand.name + ' - Register';
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
          <RegisterForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
