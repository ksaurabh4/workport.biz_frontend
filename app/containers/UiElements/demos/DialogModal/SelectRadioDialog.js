import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ConfirmationDialog from './ConfirmationDialog';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
});

function SelectRadioDialog(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');

  const handleClose = val => {
    setValue(val);
    setOpen(false);
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <List>
        <ConfirmationDialog
          classes={{
            paper: classes.dialog,
          }}
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </div>
  );
}

SelectRadioDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectRadioDialog);
