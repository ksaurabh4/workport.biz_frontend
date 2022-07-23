import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  // CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  // TextAreaFieldRedux,
  // SwitchRedux,
  // renderDatePicker
} from 'dan-components/Forms/ReduxFormMUI';
import { CrudTableForm, Notification } from 'dan-components';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import {
  Grid, Icon, Select, TextField, Tooltip
} from '@material-ui/core';
import {
  fetchAction,
  addAction,
  closeAction,
  submitAction,
  removeAction,
  editAction,
  closeNotifAction,
  showErrorNotifAction
} from './reducers/goalsTableActions';
import { anchorTable } from './sampleData';
import api from '../../../redux/api';
import formatGoalsList from './helper';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const styles = theme => ({
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});
const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);
function GoalsTable(props) {
  const { classes, tab, type } = props;

  // Redux State
  const branch = 'goalsForm';
  const initValues = useSelector(state => state.goalsForm.formValues);
  const loggedUser = useSelector(state => state.auth.user);
  const dataTable = useSelector(state => state.goalsForm.dataTable);
  const empDataTable = useSelector(state => state.employeeForm.dataTable);
  const openForm = useSelector(state => state.goalsForm.showFrm);
  const formTitle = useSelector(state => state.goalsForm.formTitle);
  const messageNotif = useSelector(state => state.goalsForm.notifMsg);

  // Dispatcher
  const fetchData = useDispatch();
  const addNew = useDispatch();
  const closeForm = useDispatch();
  const submit = useDispatch();
  const removeRow = useDispatch();
  const editRow = useDispatch();
  const closeNotif = useDispatch();

  // state
  // const [empDataApi, setEmpDataApi] = useState(null);
  const fetchEmployeeList = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let url = `/employees?companyId=${user.companyId}`;
    if (user.userRole === 'manager' && !user.isAdmin) {
      url += `&empManagerId=${user.empId}`;
    }
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        // setEmpDataApi();
        fetchData(fetchAction(res.data, 'employeeForm'));
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  const [dataApi, setDataApi] = useState(null);
  const fetchGoalsList = async () => {
    const url = `/goals?companyId=${loggedUser.companyId}&empId=${searchTerm.empId || loggedUser.empId}&goalType='${type}'&startDate=${searchTerm.startDate}&endDate=${searchTerm.endDate}`;
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${loggedUser.token}` } });
      if (res) {
        const data = formatGoalsList(res.data);
        setDataApi(data);
      }
    } catch (e) {
      console.log(e);
      submit(showErrorNotifAction(e.response.data.message, branch));
    }
  };

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    fetchGoalsList();
    if (user.userRole === 'manager' || user.isAdmin) {
      fetchEmployeeList();
    }
  }, []);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '', weekNum: 0 });

  const goalTermChangeHandler = (event) => {
    switch (event.target.value) {
      case 'lastWeek': {
        const currentDate = moment();
        const weekStart = currentDate.clone().subtract(1, 'weeks').weekday(1);
        const weekEnd = currentDate.clone().subtract(1, 'weeks').weekday(6);
        const weekNum = Math.ceil(moment(weekStart).date() / 7);
        setDateRange({ startDate: weekStart, endDate: weekEnd, weekNum });
      }
        break;
      case 'thisWeek': {
        const currentDate = moment();
        const weekStart = currentDate.clone().weekday(1);
        const weekEnd = currentDate.clone().weekday(6);
        const weekNum = Math.ceil(moment(weekStart).date() / 7);
        setDateRange({ startDate: weekStart, endDate: weekEnd, weekNum });
      }
        break;
      case 'lastMonth': {
        const currentDate = moment();
        const monthStart = currentDate.clone().subtract(1, 'months').startOf('month');
        const monthEnd = currentDate.clone().subtract(1, 'months').endOf('month');
        setDateRange({ ...dateRange, startDate: monthStart, endDate: monthEnd });
      }

        break;
      case 'thisMonth': {
        const currentDate = moment();
        const monthStart = currentDate.clone().startOf('month');
        const monthEnd = currentDate.clone().endOf('month');
        setDateRange({ ...dateRange, startDate: monthStart, endDate: monthEnd });
      }
        break;
      default:
        break;
    }
  };
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(0);
  const [achieved, setAchieved] = useState(0);
  const updateState = (payload) => {
    setTarget(parseInt(payload.goalParameter, 10));
    setAchieved(payload.goalAchieved);
    setDateRange({ startDate: moment(payload.goalReviewStartDate), endDate: moment(payload.goalReviewEndDate), weekNum: payload.goalWeekNum });
  };
  const calculateScore = (_target = target, _achieved = achieved) => {
    let _score = 0;
    if (type === 'g1') {
      _score = (_achieved / _target) * 100;
    } else {
      _score = (_achieved / 10) * 100;
    }
    setScore(_score.toFixed(2));
  };

  const changeTarget = (event) => {
    setTarget(event.target.value);
    calculateScore(event.target.value, undefined);
  };
  const changeAchieved = (event) => {
    setAchieved(event.target.value);
    calculateScore(undefined, event.target.value);
  };

  const [goalOwner, setGoalOwner] = useState('self');
  const radioButtonOnChange = (input) => {
    setGoalOwner(input);
  };
  const handleCloseForm = () => {
    setDateRange({ startDate: '', endDate: '', weekNum: 0 });
    setScore(0);
    setTarget(0);
    setAchieved(0);
    closeForm(closeAction(branch));
  };

  const handleSubmit = async (values) => {
    try {
      // const user = JSON.parse(localStorage.getItem('user'));
      const addData = {
        ...values,
        goalParameter: values.goalParameter || '100',
        goalType: type,
        goalReviewStartDate: dateRange.startDate.format('YYYY-MM-DD'),
        goalReviewEndDate: dateRange.endDate.format('YYYY-MM-DD'),
        goalWeekNum: dateRange.weekNum,
        goalScore: score,
        companyId: loggedUser.companyId,
        empId: values.empId || loggedUser.empId,
      };
      delete addData.goalOwner;
      const editData = {
        ...values,
        goalParameter: values.goalParameter || '100',
        goalScore: score,
        companyId: loggedUser.companyId,
        empId: values.empId || loggedUser.empId,
      };
      delete editData.goalOwner;
      delete editData.goalReviewEndDate;
      delete editData.goalReviewStartDate;
      delete editData.goalWeekNum;
      delete editData.goalType;
      delete editData.goalTerm;
      let res = null;
      if (formTitle.includes('Add')) {
        res = await api.post('/goals/create', addData, { headers: { Authorization: `Bearer ${loggedUser.token}` } });
      } else {
        res = await api.put(`/goals/${values.goalId}`, editData, { headers: { Authorization: `Bearer ${loggedUser.token}` } });
      }
      if (res.data) {
        submit(submitAction(values, branch));
        fetchGoalsList(res.data.empId);
        setDateRange({ startDate: '', endDate: '', weekNum: 0 });
        setScore(0);
        setTarget(0);
        setAchieved(0);
      }
    } catch (e) {
      console.log(e);
      submit(showErrorNotifAction(e.response.data.message, branch));
    }
  };
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteGoalId, setDeleteGoalId] = useState('');

  const onDeleteButtonClick = (payload) => {
    setShowDeleteAlert(true);
    setDeleteGoalId(payload.goalId);
  };
  const deleteConfirmClickHandler = async (payload) => {
    try {
      await api.delete(`/goals/${deleteGoalId}`, { headers: { Authorization: `Bearer ${loggedUser.token}` } });
      removeRow(removeAction(payload, branch));
      setShowDeleteAlert(false);
      setShowDeleteAlert('');
    } catch (e) {
      console.log(e);
      submit(showErrorNotifAction(e.response.data.message, branch));
    }
  };
  const searchReporteeGoals = () => {
    fetchGoalsList();
  };
  return (
    <div>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <Dialog
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this Goal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteConfirmClickHandler} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={() => setShowDeleteAlert(false)} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
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
          <FormControl className={classes.field} style={{ marginBottom: 0 }}>
            <InputLabel htmlFor="empId">Select Employee</InputLabel>
            <Select
              labelId="input-label-empId"
              id="empId"
              name="empId"
              value={searchTerm.empId}
              placeholder='Select Employee'
              onChange={(event) => inputChange(event)}
            >
              {/* <MenuItem selected={true} value={loggedUser.empId}>Self</MenuItem> */}
              {empDataTable.map(item => (searchTerm.empManagerId !== 'all' ? item.empManagerId === searchTerm.empManagerId && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>
                : item.empId === loggedUser.empId ? <MenuItem key={item.empId} value={item.empId}>{'Self'}</MenuItem> : <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>}
        {loggedUser.isAdmin && <Grid item xs>
          <FormControl className={classes.field} style={{ marginBottom: 0 }}>
            <InputLabel htmlFor="empId">Select Manager</InputLabel>
            <Select
              labelId="input-label-empId"
              id="empManagerId"
              name="empManagerId"
              value={searchTerm.empManagerId}
              placeholder='Select Employee'
              onChange={(event) => inputChange(event)}
            >
              <MenuItem selected={true} value={'all'}>All</MenuItem>
              {empDataTable.map(item => item.isManager === 1 && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>}
        <Grid item xs >
          <Tooltip title="Submit Request">
            <Button className={classes.button} variant="contained" color="primary" onClick={searchReporteeGoals}>
              Submit
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <div className={classes.rootTable}>
        <CrudTableForm
          dataTable={dataTable}
          openForm={openForm}
          dataInit={dataApi}
          anchor={anchorTable}
          title={tab}
          formTitle={formTitle}
          fetchData={(payload) => fetchData(fetchAction(payload, branch))}
          addNew={(payload) => addNew(addAction(payload, branch))}
          isAddButton={true}
          closeForm={handleCloseForm}
          submit={(payload) => handleSubmit(payload)}
          removeRow={(payload) => onDeleteButtonClick(payload)}
          canRemove={true}
          editRow={(payload) => {
            updateState(payload);
            editRow(editAction(payload, branch));
          }}
          branch={branch}
          initValues={initValues}
        >
          {/* Create Your own form, then arrange or custom it as You like */}
          {!formTitle.toLowerCase().includes('edit') && loggedUser.isManager === 1 && <><div className={classes.fieldBasic}>
            <FormLabel component="label">Submitting for</FormLabel>
            <Field name="goalOwner" className={classes.inlineWrap} component={renderRadioGroup} onChange={radioButtonOnChange}>
              <FormControlLabel value="reportee" control={<Radio />} label="Reportee" />
              <FormControlLabel checked={goalOwner === 'self'} value="self" control={<Radio />} label="Self" />
            </Field>
          </div>
          {goalOwner !== 'self' && <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="empId">Employee*</InputLabel>
              <Field
                name="empId"
                component={SelectRedux}
                placeholder="Employee Name"
                autoWidth
                required
                onChange={goalTermChangeHandler}
              >
                {empDataTable.map(item => (searchTerm.empManagerId !== 'all' ? item.empManagerId === searchTerm.empManagerId && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>
                  : item.empId !== loggedUser.empId && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>))}
              </Field>
            </FormControl>
          </div>}
          </>}
          {!formTitle.toLowerCase().includes('edit') && <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="goalTerm">Term*</InputLabel>
              <Field
                name="goalTerm"
                component={SelectRedux}
                placeholder="Goal Term"
                autoWidth
                required
                onChange={goalTermChangeHandler}
              >
                <MenuItem value="lastWeek">Last Week</MenuItem>
                <MenuItem value="thisWeek">This Week</MenuItem>
                <MenuItem value="lastMonth">Last Month</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
              </Field>
            </FormControl>
          </div>}
          <div>
            <Field
              name="goalReviewStartDate"
              component={TextFieldRedux}
              placeholder="Review Term Start"
              label="Term Start"
              required
              disabled
              validate={required}
              className={classes.field}
              format={value => (value || (dateRange.startDate !== '' ? moment(dateRange.startDate).format('DD-MM-YYYY') : ''))}
            />
          </div>
          <div>
            <Field
              name="goalReviewEndDate"
              component={TextFieldRedux}
              placeholder="Review Term End"
              label="Term End"
              required
              disabled
              validate={required}
              className={classes.field}
              format={value => (value || (dateRange.endDate !== '' ? moment(dateRange.endDate).format('DD-MM-YYYY') : ''))}
            />
          </div>
          <div>
            {type === 'g1' ? (<Field
              name="goalParameter"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              component={TextFieldRedux}
              placeholder="Target"
              label="Target"
              required
              validate={required}
              onChange={changeTarget}
              className={classes.field}
              normalize={val => (val || '').replace(/[^\d]/g, '')}
              format={value => (value || target)}
            />) : <Field
              name="goalParameter"
              type="textarea"
              component={TextFieldRedux}
              multiline
              rows={2}
              maxRows={4}
              placeholder="Parameters"
              label="Parameters"
              required
              validate={required}
              className={classes.field}
            />}
          </div>
          <div>
            <Field
              name="goalAchieved"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              component={TextFieldRedux}
              placeholder="Goals Achieved"
              label="Achieved"
              required
              validate={[required]}
              className={classes.field}
              onChange={changeAchieved}
              normalize={val => (val || '').replace(/[^\d]/g, '')}
              format={value => (value || achieved)}
            />
          </div>
          <div>
            <Field
              name="goalScore"
              component={TextFieldRedux}
              placeholder="Goal Score"
              label="Score"
              className={classes.field}
              disabled
              format={value => `${score || value}%`}
            // normalize={val => (val || '').replace(/[^\d]/g, '')}
            />
          </div>
          {/* No need create button or submit, because that already made in this component */}
        </CrudTableForm>
      </div >
    </div >
  );
}
renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

GoalsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoalsTable);
