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
} from './reducers/companyTableActions';
import { anchorTable } from './sampleData';
import formatCompaniesList from './helper';
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

function CompaniesTable(props) {
  const { classes } = props;

  // Redux State
  const branch = 'companyForm';
  const initValues = useSelector(state => state.companyForm.formValues);
  const selectedRow = useSelector(state => state.companyForm.selectedRow);
  const dataTable = useSelector(state => state.companyForm.dataTable);
  const openForm = useSelector(state => state.companyForm.showFrm);
  const formTitle = useSelector(state => state.companyForm.formTitle);
  const messageNotif = useSelector(state => state.companyForm.notifMsg);

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
  const [dataApi, setDataApi] = useState(null);

  const fetchCompaniesList = async () => {
    const url = '/companies';
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res.data) {
        const data = formatCompaniesList(res.data);
        setDataApi(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    fetchCompaniesList();
  }, []);

  useEffect(() => () => {
    clearData(clearAction(branch));
  }, []);

  const handleSubmit = async (values) => {
    try {
      const data = { ...values, companyId: user.companyId };
      let res = null;
      if (formTitle.includes('Add')) {
        res = await api.post('/companies/create', data, { headers: { Authorization: `Bearer ${user.token}` } });
      } else {
        res = await api.put(`/companies/${values.compId}`, data, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      if (res.data) {
        submit(submitAction(values, branch));
        fetchCompaniesList();
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
          // additionalIcon={{ name: 'Change Password', element: <ResetForm onSubmit={(values) => resetPasswordSubmitForm(values)} /> }}
          title="Companies"
          formTitle={formTitle}
          fetchData={(payload) => fetchData(fetchAction(payload, branch))}
          addNew={(payload) => addNew(addAction(payload, branch))}
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
              name="compName"
              component={TextFieldRedux}
              placeholder="Company Name"
              label="Name"
              validate={required}
              required
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compWebsite"
              component={TextFieldRedux}
              placeholder="Company Website"
              label="Website"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compEmail"
              component={TextFieldRedux}
              placeholder="Company Email"
              label="Email"
              required
              validate={[required, email]}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compPhone"
              component={TextFieldRedux}
              placeholder="Company Phone"
              label="Phone"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compAddress"
              component={TextFieldRedux}
              placeholder="Company Address"
              label="Address"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compCity"
              component={TextFieldRedux}
              placeholder="Company City"
              label="City"
              required
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compState"
              component={TextFieldRedux}
              placeholder="Company State"
              label="State"
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compCountry"
              component={TextFieldRedux}
              placeholder="Company Country"
              label="country"
              required
              validate={required}
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="compZip"
              component={TextFieldRedux}
              placeholder="Company Zipcode"
              label="Zipcode"
              required
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="compSubsPlanId">Subscription Plan</InputLabel>
              <Field
                name="compSubsPlanId"
                component={SelectRedux}
                placeholder="Selected Plan"
                autoWidth
              >
                {dataTable?.map(item => item.isManager === 1 && <MenuItem key={item.empId} value={item.empId}>{item.empName}</MenuItem>)}
              </Field>
            </FormControl>
          </div>
          <div className={classes.fieldBasic}>
            <div className={classes.inlineWrap}>
              <FormControlLabel control={<Field name="subsIsActive" component={CheckboxRedux} />} label="This is a Active Client" />
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

CompaniesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompaniesTable);
