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
import {
  CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  TextAreaFieldRedux,
  SwitchRedux,
  renderDatePicker
} from 'dan-components/Forms/ReduxFormMUI';
import { CrudTableForm, Notification } from 'dan-components';
import moment from 'moment';
import { TextField } from '@material-ui/core';
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

const styles = ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  }
});

function GoalsTable(props) {
  const { classes, tab, type } = props;

  // Redux State
  const branch = 'goalsForm';
  const initValues = useSelector(state => state.goalsForm.formValues);
  const dataTable = useSelector(state => state.goalsForm.dataTable);
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

  const [searchTerm, setSearchTerm] = useState({
    startDate: moment().clone().startOf('month')
      .format('YYYY-MM-DD'),
    endDate: moment().clone().endOf('month')
      .format('YYYY-MM-DD'),
    empId: null,
  });

  const inputChange = (event) => {
    setSearchTerm({ ...searchTerm, [event.target.id]: event.target.value });
  };

  const [dataApi, setDataApi] = useState(null);
  const fetchGoalsList = async (empId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `/goals?companyId=${user.companyId}&empId=${empId || user.empId}&goalType='${type}'&startDate=${searchTerm.startDate}&endDate=${searchTerm.endDate}`;
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        const data = formatGoalsList(res.data);
        console.log(data);
        setDataApi(data);
      }
    } catch (e) {
      console.log(e);
      submit(showErrorNotifAction(e.response.data.message, branch));
    }
  };

  useEffect(async () => {
    fetchGoalsList();
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

  const calculateScore = (event) => {
    setScore(event.target.value);
  };

  const handleCloseForm = () => {
    setDateRange({ startDate: '', endDate: '', weekNum: 0 });
    setScore(0);
    closeForm(closeAction(branch));
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = {
        ...values,
        goalParameter: values.goalParameter || '100',
        goalType: type,
        goalReviewStartDate: dateRange.startDate.format('YYYY-MM-DD'),
        goalReviewEndDate: dateRange.endDate.format('YYYY-MM-DD'),
        goalWeekNum: dateRange.weekNum,
        goalScore: score,
        companyId: user.companyId,
        empId: user.empId,
      };
      console.log(data);
      let res = null;
      if (formTitle.includes('Add')) {
        res = await api.post('/goals/create', data, { headers: { Authorization: `Bearer ${user.token}` } });
      } else {
        res = await api.put(`/goals/${values.goalId}`, data, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      if (res.data) {
        submit(submitAction(values, branch));
        fetchGoalsList(res.data.empId);
        setDateRange({ startDate: '', endDate: '', weekNum: 0 });
        setScore(0);
      }
    } catch (e) {
      console.log(e);
      submit(showErrorNotifAction(e.response.data.message, branch));
    }
  };

  return (
    <div>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <div style={{ display: 'flex' }}>
        <div>
          <TextField
            id="startDate"
            label="From"
            className={classes.field}
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={searchTerm.startDate}
            onChange={(event) => inputChange(event, 'startDate')}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="endDate"
            label="To"
            className={classes.field}
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={searchTerm.endDate}
            onChange={(event) => inputChange(event, 'endDate')}
            margin="normal"
          />
        </div>
      </div>
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
          closeForm={handleCloseForm}
          submit={(payload) => handleSubmit(payload)}
          removeRow={(payload) => removeRow(removeAction(payload, branch))}
          editRow={(payload) => editRow(editAction(payload, branch))}
          branch={branch}
          initValues={initValues}
        >
          {/* Create Your own form, then arrange or custom it as You like */}
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
              disabled
              validate={required}
              className={classes.field}
              normalize={val => (val || '').replace(/[^\d]/g, '')}
              format={value => (value || 100)}
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
              onChange={calculateScore}
              normalize={val => (val || '').replace(/[^\d]/g, '')}
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
              format={value => `${value || score}%`}
              normalize={val => (val || '').replace(/[^\d]/g, '')}
            />
          </div>
          {/* No need create button or submit, because that already made in this component */}
        </CrudTableForm>
      </div>
    </div >
  );
}

GoalsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoalsTable);
