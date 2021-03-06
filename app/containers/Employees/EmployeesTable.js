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
  SwitchRedux
} from 'dan-components/Forms/ReduxFormMUI';
import { CrudTableForm, Notification, ResetForm } from 'dan-components';
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
  selectAction,
  closeNotifAction,
  showErrorNotifAction,
  showNotifAction,
  clearAction,
} from './reducers/employeeTableActions';
import { anchorTable } from './sampleData';
import api from '../../redux/api';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

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

function EmployeeTable(props) {
  const { classes } = props;

  // Redux State
  const branch = 'employeeForm';
  const initValues = useSelector(state => state.employeeForm.formValues);
  const selectedRow = useSelector(state => state.employeeForm.selectedRow);
  const dataTable = useSelector(state => state.employeeForm.dataTable);
  const compDataTable = useSelector(state => state.companyForm.dataTable);
  const openForm = useSelector(state => state.employeeForm.showFrm);
  const formTitle = useSelector(state => state.employeeForm.formTitle);
  const messageNotif = useSelector(state => state.employeeForm.notifMsg);

  // Dispatcher
  const fetchData = useDispatch();
  const clearData = useDispatch();
  const addNew = useDispatch();
  const closeForm = useDispatch();
  const submit = useDispatch();
  const removeRow = useDispatch();
  const selectRow = useDispatch();
  const editRow = useDispatch();
  const closeNotif = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  // state

  const [searchTerm, setSearchTerm] = useState({
    compId: user.companyId,
  });
  const inputChange = (event) => {
    if (event.target.id) {
      setSearchTerm({ ...searchTerm, [event.target.id]: event.target.value });
    } else {
      setSearchTerm({ ...searchTerm, [event.target.name]: event.target.value });
    }
  };

  const [dataApi, setDataApi] = useState(null);

  const fetchEmployeeList = async () => {
    let url = `/employees?companyId=${searchTerm.compId || user.companyId}`;
    if (user.userRole === 'manager' && !user.isAdmin) {
      url += `&empManagerId=${user.empId}`;
    }
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        let { data } = res;
        console.log(user.userRole === 'superadmin', searchTerm.compId, user.companyId);
        if (user.userRole === 'superadmin' && searchTerm.compId !== user.companyId) {
          data = data.filter(emp => emp.companyId !== user.companyId);
        }
        setDataApi(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchCompaniesList = async () => {
    const url = '/companies';
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        // setEmpDataApi();
        fetchData(fetchAction(res.data, 'companyForm'));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(async () => {
    fetchCompaniesList();
    fetchEmployeeList();
  }, []);

  useEffect(() => () => {
    clearData(clearAction(branch));
  }, []);

  const handleSubmit = async (values) => {
    try {
      const data = { ...values, companyId: user.companyId };
      delete data.empManagerName;
      let res = null;
      if (formTitle.includes('Add')) {
        res = await api.post('/employees/create', data, { headers: { Authorization: `Bearer ${user.token}` } });
      } else {
        res = await api.put(`/employees/${values.empId}`, data, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      if (res.data) {
        submit(submitAction(values, branch));
        fetchEmployeeList();
      }
    } catch (e) {
      console.log(e);
      submit(showErrorNotifAction(e.response.data.message, branch));
    }
  };
  const resetPasswordSubmitForm = async (values) => {
    try {
      const data = {
        userPswd: values.userPswd,
      };
      const res = await api.put(`/users?empId=${selectedRow.empId}`, data, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res.data) {
        submit(showNotifAction(res.data.message, branch));
        selectRow(selectAction({}, branch));
      }
    } catch (e) {
      console.log(e);
      submit(showErrorNotifAction(e.response.data.message, branch));
    }
  };
  return (
    <div>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <Grid container spacing={3} className={classes.rootTable} style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', marginTop: '5px'
      }}>
        {user.userRole === 'superadmin' && <><Grid item xs>
          <FormControl className={classes.field} style={{ marginBottom: 0 }}>
            <InputLabel htmlFor="compId">Select Company</InputLabel>
            <Select
              labelId="input-label-empId"
              id="compId"
              name="compId"
              value={searchTerm.compId}
              placeholder='Select Company'
              onChange={(event) => inputChange(event)}
            >
              <MenuItem selected={true} value={user.companyId}>Self</MenuItem>
              {compDataTable.map(item => item.compId !== user.companyId && <MenuItem key={item.compId} value={item.compId}>{item.compName}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs >
          <Tooltip title="Submit Request">
            <Button className={classes.button} variant="contained" color="primary" onClick={fetchEmployeeList}>
              Submit
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </Tooltip>
        </Grid></>}
      </Grid>
      <div className={classes.rootTable}>
        <CrudTableForm
          dataTable={dataTable}
          openForm={openForm}
          dataInit={dataApi}
          anchor={anchorTable}
          additionalIcon={{ name: 'Change Password', element: <ResetForm onSubmit={(values) => resetPasswordSubmitForm(values)} /> }}
          title="Employees"
          formTitle={formTitle}
          fetchData={(payload) => fetchData(fetchAction(payload, branch))}
          addNew={(payload) => addNew(addAction(payload, branch))}
          isAddButton={true}
          closeForm={() => closeForm(closeAction(branch))}
          submit={(payload) => handleSubmit(payload)}
          removeRow={(payload) => removeRow(removeAction(payload, branch))}
          editRow={(payload) => editRow(editAction(payload, branch))}
          selectRow={(payload) => selectRow(selectAction(payload, branch))}
          branch={branch}
          initValues={initValues}
        >
          {/* Create Your own form, then arrange or custom it as You like */}
          <div>
            <Field
              name="empName"
              component={TextFieldRedux}
              placeholder="Employee Name"
              label="Name"
              validate={required}
              required
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empCode"
              component={TextFieldRedux}
              placeholder="Employee Code"
              label="Employee Code"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empEmail"
              component={TextFieldRedux}
              placeholder="Employee Email"
              label="Email"
              required
              disabled={formTitle.toLowerCase().includes('edit')}
              validate={[required, email]}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empPhone"
              component={TextFieldRedux}
              placeholder="Employee Phone"
              label="Phone"
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empAddress"
              component={TextFieldRedux}
              placeholder="Employee Address"
              label="Address"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empCity"
              component={TextFieldRedux}
              placeholder="Employee City"
              label="City"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empState"
              component={TextFieldRedux}
              placeholder="Employee State"
              label="State"
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empCountry"
              component={TextFieldRedux}
              placeholder="Employee Country"
              label="Country"
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empZip"
              component={TextFieldRedux}
              placeholder="Employee Zipcode"
              label="Zipcode"
              required
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empDesignation"
              component={TextFieldRedux}
              placeholder="Employee Designation"
              label="Designation"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empDept"
              component={TextFieldRedux}
              placeholder="Employee Department"
              label="Department"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="empSubDept"
              component={TextFieldRedux}
              placeholder="Employee Sub Department"
              label="Sub-Department"
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="empManagerId">Reporting Manager</InputLabel>
              <Field
                name="empManagerId"
                component={SelectRedux}
                placeholder="Reporting Manager"
                autoWidth
              >
                {dataTable?.map(item => item.isManager === 1 && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>)}
              </Field>
            </FormControl>
          </div>
          {<div className={classes.fieldBasic}>
            <div className={classes.inlineWrap}>
              <FormControlLabel control={<Field name="isManager" component={CheckboxRedux} />} label="Will other employees report to him?" />
            </div>
          </div>}
          {/* <div className={classes.fieldBasic}>
            <FormLabel component="label">Choose One Option</FormLabel>
            <Field name="radio" className={classes.inlineWrap} component={renderRadioGroup}>
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            </Field>
          </div>
           <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Selection</InputLabel>
              <Field
                name="selection"
                component={SelectRedux}
                placeholder="Selection"
                autoWidth
              >
                <MenuItem value="option1">Option One</MenuItem>
                <MenuItem value="option2">Option Two</MenuItem>
                <MenuItem value="option3">Option Three</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div className={classes.fieldBasic}>
            <FormLabel component="label">Toggle Input</FormLabel>
            <div className={classes.inlineWrap}>
              <FormControlLabel control={<Field name="onof" component={SwitchRedux} />} label="On/OF Switch" />
              <FormControlLabel control={<Field name="checkbox" component={CheckboxRedux} />} label="Checkbox" />
            </div>
          </div>
          <div className={classes.field}>
            <Field
              name="textarea"
              className={classes.field}
              component={TextFieldRedux}
              placeholder="Textarea"
              label="Textarea"
              multiline
              rows={4}
            />
          </div> */}
          {/* No need create button or submit, because that already made in this component */}
        </CrudTableForm>
      </div>
    </div>
  );
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

EmployeeTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeTable);
