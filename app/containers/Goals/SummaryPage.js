import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import { useDispatch, useSelector } from 'react-redux';
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
import { dataSales } from 'dan-api/chart/chartData';
import styles from './widget-jss';
import { setTabAction } from './reducers/goalsActions';

function SummaryPage(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const title = brand.name + ' - Goals';
  const description = brand.desc;

  const activeTab = useSelector(state => state.goals.activeTab);
  const handleTabChange = (tabNum) => {
    dispatch(setTabAction(tabNum));
  };
  const color = ({
    primary: colorfull[6],
    secondary: colorfull[3],
    third: colorfull[2],
    fourth: colorfull[4],
  });

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
      {/* <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} /> */}
      <div className={classes.chartWrap}>
        <div className={classes.chartFluid}>
          <ResponsiveContainer width={640} height="80%">
            <BarChart
              data={dataSales}
            >
              <XAxis dataKey="name" tickLine={false} />
              <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <CartesianAxis />
              <Tooltip />
              <Bar dataKey="Fashions" fill={color.primary} />
              <Bar dataKey="Electronics" fill={color.secondary} />
              <Bar dataKey="Toys" fill={color.third} />
              <Bar dataKey="Vouchers" fill={color.fourth} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(SummaryPage);
