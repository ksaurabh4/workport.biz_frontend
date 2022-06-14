/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import history from '../utils/history';
import uiReducer from './modules/ui';
import initval from './modules/initForm';
import login from './modules/login';
import auth from './modules/auth';
import treeTable from '../containers/Tables/reducers/treeTbReducer';
import crudTable from '../containers/Tables/reducers/crudTbReducer';
import crudTableForm from '../containers/Tables/reducers/crudTbFrmReducer';
import ecommerce from '../containers/SampleApps/Ecommerce/reducers/ecommerceReducer';
import employees from '../containers/Employees/reducers/employeesReducer';
import todos from '../containers/Todos/reducers/todosReducer';
import contact from '../containers/SampleApps/Contact/reducers/contactReducer';
import chat from '../containers/SampleApps/Chat/reducers/chatReducer';
import email from '../containers/SampleApps/Email/reducers/emailReducer';
import socmed from '../containers/SampleApps/Timeline/reducers/timelineReducer';
import calendar from '../containers/SampleApps/Calendar/reducers/calendarReducer';
import taskboard from '../containers/SampleApps/TaskBoard/reducers/taskboardReducer';

/**
 * Branching reducers to use one reducer for many components
 */

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    initval,
    login,
    socmed,
    auth,
    ecommerce,
    employees,
    todos,
    contact,
    chat,
    email,
    calendar,
    taskboard,
    treeTableArrow: branchReducer(treeTable, 'treeTableArrow'),
    treeTablePM: branchReducer(treeTable, 'treeTablePM'),
    crudTableDemo: branchReducer(crudTable, 'crudTableDemo'),
    crudTableForm,
    crudTbFrmDemo: branchReducer(crudTableForm, 'crudTbFrmDemo'),
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
