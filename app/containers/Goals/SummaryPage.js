import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
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
import moment from 'moment';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Notification } from 'dan-components';
import {
  Grid, Icon, Select, TextField
} from '@material-ui/core';
import styles from './widget-jss';
import { setTabAction } from './reducers/goalsActions';
import api from '../../redux/api';
import { closeNotifAction, showErrorNotifAction } from './GoalsTable/reducers/goalsTableActions';
const color = ({
  primary: colorfull[6],
  secondary: colorfull[3],
  third: colorfull[2],
  fourth: colorfull[4],
});
const dataSales = [
  {
    name: 'G1',
    percentage: 80,
    color: 'green',
  },
  {
    name: 'G2',
    percentage: 45,
    color: 'orange',
  },
  {
    name: 'G3',
    percentage: 30,
    color: 'red',
  }
];
const otherStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    marginTop: 0,
    '& svg': {
      color: theme.palette.grey[400],
      fontSize: 18,
    }
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});
function SummaryPage(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const title = brand.name + ' - Goals';
  const description = brand.desc;

  const empDataTable = useSelector(state => state.employeeForm.dataTable);
  const loggedUser = useSelector(state => state.auth.user);
  const messageNotif = useSelector(state => state.goalsForm.notifMsg);
  const [searchTerm, setSearchTerm] = useState({
    startDate: moment().clone().startOf('month')
      .format('YYYY-MM-DD'),
    endDate: moment().clone().endOf('month')
      .format('YYYY-MM-DD'),
    empId: loggedUser.empId,
    empManagerId: 'all',
  });

  const inputChange = (event) => {
    if (event.target.id) {
      setSearchTerm({ ...searchTerm, [event.target.id]: event.target.value });
    } else {
      setSearchTerm({ ...searchTerm, [event.target.name]: event.target.value });
    }
  };

  const handleTabChange = (tabNum) => {
    dispatch(setTabAction(tabNum));
  };
  const getColor = (value) => {
    console.log('value', value);
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

  const formatData = (data) => data.map(goal => ({
    ...goal, color: getColor(goal.scorePercentage)
  }));
  const [dataApi, setDataApi] = useState(null);
  const branch = 'goalsForm';
  const fetchGoalsSummary = async () => {
    const url = `/goals/summary?companyId=${loggedUser.companyId}&empId=${searchTerm.empId || loggedUser.empId}&startDate=${searchTerm.startDate}&endDate=${searchTerm.endDate}`;
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${loggedUser.token}` } });
      if (res) {
        const data = formatData(res.data);
        console.log(data);
        setDataApi(data);
      }
    } catch (e) {
      console.log(e);
      dispatch(showErrorNotifAction(e.response.data.message, branch));
    }
  };

  const searchSummary = () => {
    fetchGoalsSummary();
  };
  useEffect(() => {
    fetchGoalsSummary();
  }, []);

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction(branch))} message={messageNotif} />
      <Grid container spacing={3} className={classes.rootTable} style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10
      }}>
        <Grid item xs>
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
        <Grid item xs>
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
        {loggedUser.isManager === 1 && <Grid item xs>
          <FormControl className={classes.field}>
            <InputLabel htmlFor="empId">Select Employee</InputLabel>
            <Select
              id='empId'
              label='Select Employee'
              name="empId"
              className={classes.field}
              value={searchTerm.empId}
              placeholder='Select Employee'
              margin="none"
              onChange={(event) => inputChange(event)}
            >
              {empDataTable.map(item => (searchTerm.empManagerId !== 'all' ? item.empManagerId === searchTerm.empManagerId && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>
                : <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>}
        {loggedUser.isAdmin && <Grid item xs>
          <FormControl className={classes.field}>
            <InputLabel htmlFor="empManagerId">Select Manager</InputLabel>
            <Select
              id='empManagerId'
              label="Select Manager"
              labelId="input-label-empId"
              name="empManagerId"
              className={classes.field}
              value={searchTerm.empManagerId}
              placeholder='Select Employee'
              margin="none"
              onChange={(event) => inputChange(event)}
            >
              <MenuItem selected={true} value={'all'}>All</MenuItem>
              {empDataTable.map(item => item.isManager === 1 && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>}
        <Grid item xs >
          <Button className={classes.button} variant="contained" color="primary" onClick={searchSummary}>
            Submit
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </Grid>
      </Grid>
      <div className={classes.chartWrap}>
        <div className={classes.chartFluid}>
          <ResponsiveContainer width={640} height="80%">
            <BarChart
              data={dataApi}
            >
              <XAxis dataKey="goalType" tickLine={false} />
              <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <CartesianAxis />
              <Tooltip />
              <Bar dataKey="scorePercentage" fill="color" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default withStyles(
  (theme) => ({
    ...styles(theme),
    ...otherStyles(theme),
  }),
  { withTheme: true },
)(SummaryPage);
