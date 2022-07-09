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
import { CrudTableForm, Notification } from 'dan-components';
import {
  fetchAction,
  addAction,
  closeAction,
  submitAction,
  removeAction,
  editAction,
  closeNotifAction,
  showErrorNotifAction,
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
  const dataTable = useSelector(state => state.employeeForm.dataTable);
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
  const editRow = useDispatch();
  const closeNotif = useDispatch();

  // state
  const [dataApi, setDataApi] = useState(null);

  const fetchEmployeeList = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `/employees?companyId=${user.companyId}`;
    // if (user.userRole === 'manager') {
    //   url += `&empManagerId=${user.empId}`;
    // }
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        setDataApi(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    fetchEmployeeList();
  }, []);

  useEffect(() => () => {
    clearData(clearAction(branch));
  }, []);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = { ...values, companyId: user.companyId };
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

  return (
    <div>
      <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} />
      <div className={classes.rootTable}>
        <CrudTableForm
          dataTable={dataTable}
          openForm={openForm}
          dataInit={dataApi}
          anchor={anchorTable}
          title="Employees"
          formTitle={formTitle}
          fetchData={(payload) => fetchData(fetchAction(payload, branch))}
          addNew={(payload) => addNew(addAction(payload, branch))}
          closeForm={() => closeForm(closeAction(branch))}
          submit={(payload) => handleSubmit(payload)}
          removeRow={(payload) => removeRow(removeAction(payload, branch))}
          editRow={(payload) => editRow(editAction(payload, branch))}
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
          <div className={classes.fieldBasic}>
            <div className={classes.inlineWrap}>
              <FormControlLabel control={<Field name="isManager" component={CheckboxRedux} />} label="Will other employees report to him?" />
            </div>
          </div>
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
