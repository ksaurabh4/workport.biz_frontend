import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import Computer from '@material-ui/icons/Computer';
import Toys from '@material-ui/icons/Toys';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Style from '@material-ui/icons/Style';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';
import colorfull from 'dan-api/palette/colorfull';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart, Pie, Cell,
  Legend
} from 'recharts';
import {
  Icon, Tooltip as TooltipNew
} from '@material-ui/core';
// import { dataSales } from 'dan-api/chart/chartData';
// import { data2 } from 'dan-api/chart/chartMiniData';
import { cloneDeep } from 'lodash';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';

const color = ({
  primary: colorfull[6],
  secondary: colorfull[3],
  fourth: colorfull[4],
});

// const colorsPie = [purple[500], blue[500], cyan[500], pink[500]];
const getColor = (value) => {
  let barColor;
  if (value >= 80) {
    barColor = 'green';
  } else if (value < 80 && value >= 60) {
    barColor = 'orange';
  } else {
    barColor = 'red';
  }
  return barColor;
};

const pieChartData = [
  {
    name: 'More than 80%',
    value: 0,
    color: 'green'
  },
  {
    name: '80% to 60%',
    value: 0,
    color: 'orange'
  },
  {
    name: 'less than 60%',
    value: 0,
    color: 'red'
  }
];
function SalesChartWidget(props) {
  const { classes, data, calanderOnClick } = props;
  const [dataApi, setDataApi] = useState({
    data: [],
    pieChartData: [...pieChartData]
  });
  const formatData = (_data) => {
    const newData = [];
    const newPieChartData = cloneDeep([...pieChartData]);
    for (let i = 0; i < _data?.length; i += 1) {
      const element = { ..._data[i], color: getColor(_data[i].score) };
      if (_data[i].score >= 80) {
        newPieChartData[0].value += 1;
      } else if (_data[i].score < 80 && _data[i].score >= 60) {
        newPieChartData[1].value += 1;
      } else {
        newPieChartData[2].value += 1;
      }
      newData.push(element);
    }
    setDataApi(prev => ({
      ...prev,
      data: newData,
      pieChartData: newPieChartData
    }));
  };

  useEffect(() => {
    formatData(data);
    return () => {
      setDataApi(prev => ({
        ...prev,
        data: [],
        pieChartData: []
      }));
    };
  }, [data]);
  const titleRender = (<div style={{ display: 'flex', alignItems: 'center' }}>
    <span>Employee Goals Overview </span>
    <span style={{ padding: '10px', marginTop: '8px' }} onClick={calanderOnClick}>
      <TooltipNew title="Select Date Range">
        <Icon className={classes.rightIcon}>calendar_month</Icon>
      </TooltipNew>
    </span>
  </div>);
  return (
    <PapperBlock whiteBg noMargin title={titleRender} icon="ion-ios-stats-outline" desc="">
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <ul className={classes.bigResume}>
            <li>
              <Avatar className={classNames(classes.avatar, classes.indigoAvatar)}>
                <LocalLibrary />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.indigoText}>{dataApi.pieChartData[0].value}</span>
                <Typography>More than 80%</Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={classNames(classes.avatar, classes.tealAvatar)}>
                <Computer />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.tealText}>{dataApi.pieChartData[1].value}</span>
                <Typography>50% to 80%</Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={classNames(classes.avatar, classes.blueAvatar)}>
                <Toys />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.blueText}>{dataApi.pieChartData[2].value}</span>
                <Typography>Less than 50%</Typography>
              </Typography>
            </li>
            {/* <li>
              <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>
                <Style />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.orangeText}>1021</span>
                <Typography>Less than 40%</Typography>
              </Typography>
            </li> */}
          </ul>
          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={640} height="80%">
                <BarChart
                  data={dataApi.data}
                >
                  <XAxis dataKey="empName" tickLine={false} />
                  <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <CartesianAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill={'color'} />
                  {/* <Bar dataKey="Electronics" fill={color.secondary} />
                  <Bar dataKey="Toys" fill={color.third} />
                  <Bar dataKey="Vouchers" fill={color.fourth} /> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <CardGiftcard className={classes.leftIcon} />
            Team Performance Pie Chart
          </Typography>
          <Divider className={classes.divider} />
          <Grid container className={classes.secondaryWrap}>
            <PieChart width={300} height={300}>
              <Pie
                data={dataApi.pieChartData}
                cx={150}
                cy={100}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                fill="#FFFFFF"
                paddingAngle={5}
                label
              >
                {
                  dataApi.pieChartData.map((entry, index) => <Cell key={index.toString()} fill={entry.color} />)
                }
              </Pie>
              <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
            </PieChart>
          </Grid>
        </Grid>
      </Grid>
    </PapperBlock>
  );
}

SalesChartWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SalesChartWidget);
