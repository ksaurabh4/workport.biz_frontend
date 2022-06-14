import React from 'react';
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
  closeNotifAction
} from './reducers/employeeTableActions';
import { anchorTable, dataApi } from './sampleData';

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
  const branch = 'crudTbFrmDemo';
  const initValues = useSelector(state => state.crudTbFrmDemo.formValues);
  const dataTable = useSelector(state => state.crudTbFrmDemo.dataTable);
  const openForm = useSelector(state => state.crudTbFrmDemo.showFrm);
  const messageNotif = useSelector(state => state.crudTbFrmDemo.notifMsg);

  // Dispatcher
  const fetchData = useDispatch();
  const addNew = useDispatch();
  const closeForm = useDispatch();
  const submit = useDispatch();
  const removeRow = useDispatch();
  const editRow = useDispatch();
  const closeNotif = useDispatch();

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
          fetchData={(payload) => fetchData(fetchAction(payload, branch))}
          addNew={(payload) => addNew(addAction(payload, branch))}
          closeForm={() => closeForm(closeAction(branch))}
          submit={(payload) => submit(submitAction(payload, branch))}
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
            <Field
              name="empManager"
              component={TextFieldRedux}
              placeholder="Employee Manager"
              label="Reporting Manager"
              className={classes.field}
            />
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
