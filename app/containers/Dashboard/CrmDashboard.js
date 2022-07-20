import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  CounterChartWidget,
  SalesChartWidget,
  LatestTransactionWidget,
  CarouselWidget,
  HistoryWidget,
  TableWidget,
  NewsWidget,
  CalculatorWidget,
} from 'dan-components';
import api from '../../redux/api';
import styles from './dashboard-jss';

function CrmDahboard(props) {
  const title = brand.name + ' - CRM Dashboard';
  const description = brand.desc;
  const { classes } = props;
  const [dataApi, setDataApi] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const fetchDashboardData = async () => {
    const url = '/reports';
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      console.log(res.data);
      if (res.data) {
        setDataApi(res.data);
      }
    } catch (e) {
      console.log(e);
    }
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
        <CounterChartWidget data={dataApi.counter}/>
      </Grid>
      <Divider className={classes.divider} />
      {user.userRole !== 'superadmin' ? <SalesChartWidget data={dataApi.empWiseScore} /> : <LatestTransactionWidget />}
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
