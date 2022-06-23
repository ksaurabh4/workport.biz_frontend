import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ComposeTodoForm from './ComposeTodoForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

function ComposeTodo(props) {
  const {
    classes,
    open,
    closeForm,
    addTodo,
    date,
    content,
    inputChange,
    compose
  } = props;
  const branch = '';
  return (
    <div>
      <Tooltip title="Add New Task">
        <Fab color="secondary" onClick={() => compose()} className={classes.addBtn}>
          <Add />
        </Fab>
      </Tooltip>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={closeForm}
        title="Add new task"
        extraSize
      >
        <ComposeTodoForm
          content={content}
          date={date}
          addTodo={addTodo}
          closeForm={closeForm}
          inputChange={inputChange}
        />
      </FloatingPanel>
    </div>
  );
}

ComposeTodo.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  compose: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ComposeTodo);
