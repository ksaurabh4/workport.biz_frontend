import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import moment from 'moment';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';

function TaskWidget(props) {
  const { classes, todoData, toggleStatus } = props;
  const handleToggle = todo => () => {
    toggleStatus(todo.todoId, todo.todoIsCompleted);
  };

  return (
    <PapperBlock
      title="My Task"
      icon="ion-ios-checkbox-outline"
      noMargin
      whiteBg
      colorMode
      desc="All Your to do list. Just check it whenever You done."
      className={classes.root}
    >
      {todoData?.length > 0 ? <List className={classes.taskList}>
        {todoData.map(todo => (
          <Fragment key={todo.todoId}>
            <ListItem
              key={todo.todoId}
              role={undefined}
              dense
              button
              onClick={handleToggle(todo)}
              className={
                classNames(
                  classes.listItem,
                  todo.todoIsCompleted ? classes.done : ''
                )
              }
            >
              <Checkbox
                checked={todo.todoIsCompleted}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={todo.todoContent} secondary={moment(todo.todoDueDateTime).format('DD-MM-YYYY HH:mm:ss')} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Fragment>
        ))}
      </List> : <h1 className={
        classNames(
          classes.listItem
        )
      }>No task Found</h1>}
    </PapperBlock>
  );
}

TaskWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  todoData: PropTypes.any,
  toggleStatus: PropTypes.func.isRequired,
};

export default withStyles(styles)(TaskWidget);
