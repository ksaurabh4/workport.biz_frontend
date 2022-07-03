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
import styles from './widget-jss';
import { setTabAction } from './reducers/goalsActions';
const dataSales = [
  {
    name: 'Week 1',
    G1: 40,
    G2: 100,
    G3: 17
  },
  {
    name: 'Week 2',
    G1: 45,
    G2: 100,
    G3: 90
  },
  {
    name: 'Week 3',
    G1: 27,
    G2: 20,
    G3: 70
  },
  {
    name: 'Week 4',
    G1: 50,
    G2: 100,
    G3: 80
  }
];
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
              <Bar dataKey="G1" fill={color.primary} />
              <Bar dataKey="G2" fill={color.secondary} />
              <Bar dataKey="G3" fill={color.fourth} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(SummaryPage);
