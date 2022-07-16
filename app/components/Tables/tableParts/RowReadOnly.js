import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import css from 'dan-styles/Table.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/BorderColor';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(0, 1)
  }
});

function RowReadOnly(props) {
  const {
    anchor,
    classes,
    item,
    removeRow,
    editRow,
    selectRow,
    branch,
    additionalIcon,
  } = props;
  const [showAlert, setShowAlert] = useState(false);
  const eventDel = useCallback(() => {
    removeRow(item, branch);
  }, [removeRow, item, branch]);
  const eventSelect = useCallback(() => {
    selectRow(item, branch);
  }, [removeRow, item, branch]);
  const eventEdit = useCallback(() => {
    editRow(item, branch);
  }, [editRow, item, branch]);

  const renderCell = dataArray => dataArray.map((itemCell, index) => {
    if (itemCell.name !== 'action' && !itemCell.hidden) {
      return (
        <TableCell className={classes.padding} key={index.toString()}>
          {item[itemCell.name] ? item[itemCell.name].toString() : ''}
        </TableCell>
      );
    }
    return false;
  });
  const handleSettingClick = () => {
    eventSelect(this);
    setShowAlert(true);
  };
  return (
    <tr>
      {renderCell(anchor)}
      <TableCell className={classes.padding}>
        <IconButton
          onClick={() => eventEdit(this)}
          className={classNames((item.edited ? css.hideAction : ''), classes.button)}
          aria-label="Edit"
        >
          <EditIcon />
        </IconButton>
        {additionalIcon && <IconButton
          onClick={handleSettingClick}
          className={classes.button}
          aria-label="Setting"
        >
          <SettingsIcon />
        </IconButton>}
        <Dialog
          open={showAlert}
          onClose={() => setShowAlert(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`${additionalIcon?.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {additionalIcon?.element}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAlert(false)} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* <IconButton
          onClick={() => eventDel(this)}
          className={classes.button}
          aria-label="Delete"
        >
          <DeleteIcon />
        </IconButton> */}
      </TableCell>
    </tr>
  );
}

RowReadOnly.propTypes = {
  anchor: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  removeRow: PropTypes.func,
  editRow: PropTypes.func.isRequired,
  selectRow: PropTypes.func,
  branch: PropTypes.string.isRequired,
  additionalIcon: PropTypes.any
};

export default withStyles(styles)(RowReadOnly);
