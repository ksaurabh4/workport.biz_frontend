import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, Bar,
  AreaChart, Area,
  LineChart, Line,
} from 'recharts';
import { data1 } from 'dan-api/chart/chartMiniData';
import colorfull from 'dan-api/palette/colorfull';
import AssignmentReturned from '@material-ui/icons/AssignmentReturned';
import CounterWidget from '../Counter/CounterWidget';
import styles from './widget-jss';

export const data2 = [
  {
    name: 'Electronics',
    value: 400
  }, {
    name: 'Fashions',
    value: 300
  },
  {
    name: 'Toys',
    value: 300
  }, {
    name: 'Other',
    value: 200
  }
];

export const cryptoData = [
  {
    btc: 7300,
    ltc: 0.2,
    ada: 1.2,
    xrp: 0.9,
    xlm: 0.2,
  },
  {
    btc: 7290,
    ltc: 0.3,
    ada: 1.3,
    xrp: 1.2,
    xlm: 0.4,
  },
  {
    btc: 7120,
    ltc: 0.5,
    ada: 1.4,
    xrp: 1.3,
    xlm: 0.2,
  },
  {
    btc: 7290,
    ltc: 0.3,
    ada: 1.3,
    xrp: 1.2,
    xlm: 0.4,
  },
  {
    btc: 7090,
    ltc: 0.4,
    ada: 2,
    xrp: 5,
    xlm: 0.2,
  },
  {
    btc: 7100,
    ltc: 0.2,
    ada: 1,
    xrp: 7.2,
    xlm: 0.5,
  },
  {
    btc: 7700,
    ltc: 1,
    ada: 4,
    xrp: 7.1,
    xlm: 0.8,
  },
  {
    btc: 7500,
    ltc: 1.6,
    ada: 4.6,
    xrp: 7.7,
    xlm: 1.2,
  },
  {
    btc: 7610,
    ltc: 1,
    ada: 2,
    xrp: 5,
    xlm: 2,
  },
  {
    btc: 7090,
    ltc: 0.4,
    ada: 2,
    xrp: 5,
    xlm: 0.2,
  },
  {
    btc: 7100,
    ltc: 0.2,
    ada: 1,
    xrp: 7.2,
    xlm: 0.5,
  },
  {
    btc: 7500,
    ltc: 1.6,
    ada: 4.6,
    xrp: 7.7,
    xlm: 1.2,
  },
];
function CounterChartWidget(props) {
  const { classes, data } = props;
  return (
    <div className={classes.rootCounter}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={6}>
          <CounterWidget
            color={colorfull[6]}
            start={0}
            end={data?.empCount}
            duration={3}
            title="Total Employees"
            // unitBefore="$ "
            // unitAfter="k"
          >
            <AssignmentReturned className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item md={3} xs={6}>
          <CounterWidget
            color={colorfull[3]}
            start={0}
            end={data?.sameTeamEmpCount}
            duration={3}
            title="Team members"
          >
            <BarChart width={100} height={40} data={data1}>
              <Bar dataKey="uv" fill="#ffffff" />
            </BarChart>
          </CounterWidget>
        </Grid>
        <Grid item md={3} xs={6}>
          <CounterWidget
            color={colorfull[5]}
            start={0}
            end={data?.reporteeCount}
            duration={3}
            title="Your Reportees"
          >
            <AreaChart width={100} height={60} data={data1}>
              <Area type="monotone" dataKey="uv" stroke="#FFFFFF" fill="rgba(255,255,255,.5)" />
            </AreaChart>
          </CounterWidget>
        </Grid>
        <Grid item md={3} xs={6}>
          <CounterWidget
            color={colorfull[4]}
            start={0}
            end={data?.pendingTaskCount}
            duration={3}
            title="Pending Tasks"
          >
            <LineChart width={100} height={80} data={data1}>
              <Line type="monotone" dataKey="pv" stroke="#FFFFFF" strokeWidth={2} />
            </LineChart>
          </CounterWidget>
        </Grid>
      </Grid>
    </div>
  );
}

CounterChartWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CounterChartWidget);
