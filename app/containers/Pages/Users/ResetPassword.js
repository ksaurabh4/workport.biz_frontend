import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm } from 'dan-components';
import { useDispatch } from 'react-redux';
import styles from '../../../components/Forms/user-jss';
import api from '../../../redux/api';
import { logoutAction } from '../../../redux/actions/authActions';

function ResetPassword(props) {
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  const submitForm = async (values) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const data = {
        userPswd: values.userPswd,
      };
      await api.put(`/users/${user.userId}`, data, { headers: { Authorization: `Bearer ${user.token}` } });
      setReset(true);
      localStorage.clear();
      dispatch(logoutAction());
    } catch (e) {
      console.log(e);
      // dispatch(showErrorNotifAction(e.response.data.message));
    }
  };

  const loginAgainHandler = () => {
    window.location.href = '/login';
  };

  const title = brand.name + ' - Reset Password';
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
          <ResetForm onSubmit={(values) => submitForm(values)} loginAgainHandler={loginAgainHandler} isReset={reset}/>
        </div>
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);
