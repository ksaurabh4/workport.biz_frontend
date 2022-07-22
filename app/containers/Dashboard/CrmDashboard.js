import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, TextField
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  CounterChartWidget,
  SalesChartWidget,
  LatestTransactionWidget,
  // CarouselWidget,
  // HistoryWidget,
  // TableWidget,
  // NewsWidget,
  // CalculatorWidget,
} from 'dan-components';
import moment from 'moment';
import api from '../../redux/api';
import styles from './dashboard-jss';

function CrmDahboard(props) {
  const title = brand.name + ' - CRM Dashboard';
  const description = brand.desc;
  const { classes } = props;
  const [dataApi, setDataApi] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  const [showDialog, setShowDialog] = useState(false);
  const calanderOnClick = () => { setShowDialog(true); };
  const [searchTerm, setSearchTerm] = useState({
    startDate: moment().clone().startOf('year')
      .format('YYYY-MM-DD'),
    endDate: moment().clone().endOf('year')
      .format('YYYY-MM-DD'),
  });
  const inputChange = (event) => {
    if (event.target.id) {
      setSearchTerm({ ...searchTerm, [event.target.id]: event.target.value });
    } else {
      setSearchTerm({ ...searchTerm, [event.target.name]: event.target.value });
    }
  };
  const fetchDashboardData = async () => {
    let reportType;
    if (user.userRole === 'superadmin') {
      reportType = 'superadmin_dashboard';
    } else if (user.userRole === 'manager') {
      reportType = 'manager_dashboard';
    } else {
      reportType = 'user_dashboard';
    }
    if (user.userRole !== 'superadmin' && user.isAdmin) {
      reportType = 'admin_dashboard';
    }
    let url = `/reports?reportType=${reportType}`;
    if (reportType !== 'superadmin_dashboard') {
      url += `&startDate=${searchTerm.startDate}&endDate=${searchTerm.endDate}`;
    }

    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res.data) {
        setDataApi(prev => ({ ...prev, ...res.data }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = () => {
    fetchDashboardData();
    setShowDialog(false);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid container className={classes.root}>
        <CounterChartWidget data={dataApi.counter && Object.values(dataApi.counter)} userType={user.userRole === 'superadmin' ? 'superadmin' : 'others'} />
      </Grid>
      <Divider className={classes.divider} />
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ padding: '10px' }}
      >
        <DialogTitle id="alert-dialog-title">
          {'Select Date Range'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={3} className={classes.rootTable} style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
              <Grid item xs style={{ width: '100%' }}>
                <TextField
                  id="startDate"
                  label="From"
                  className={classes.field}
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={searchTerm.startDate}
                  onChange={(event) => inputChange(event)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs style={{ width: '100%' }}>
                <TextField
                  id="endDate"
                  label="To"
                  className={classes.field}
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={searchTerm.endDate}
                  onChange={(event) => inputChange(event)}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {user.userRole === 'superadmin' ? <LatestTransactionWidget data={dataApi.compDashboardData} /> : <SalesChartWidget data={dataApi.empWiseScore} calanderOnClick={calanderOnClick} />}
      {/* <Divider className={classes.divider} />
      <TableWidget />
      <Divider className={classes.divider} /> */}
      {/* <Grid container spacing={3} className={classes.root}>
        <Grid item md={4} xs={12}>
          <CarouselWidget />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <NewsWidget />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <CalculatorWidget />
        </Grid>
      </Grid> */}
    </div>
  );
}

CrmDahboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrmDahboard);
