import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ComposeAnnouncementForm from './ComposeAnnouncementForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './email-jss';

function ComposeAnnoucement(props) {
  const {
    classes,
    open,
    closeForm,
    sendAnnouncement,
    to,
    subject,
    inputChange,
    compose,
    loggedInUser,
  } = props;
  const branch = '';
  return (
    <div>
      <Tooltip title="Compose Announcement">
        <Fab color="secondary" onClick={() => compose()} className={classes.addBtn}>
          <Add />
        </Fab>
      </Tooltip>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={closeForm}
        title="Compose Announcement"
        extraSize
      >
        <ComposeAnnouncementForm
          subject={subject}
          to={to}
          sendAnnouncement={sendAnnouncement}
          closeForm={closeForm}
          inputChange={inputChange}
          loggedInUser={loggedInUser}
        />
      </FloatingPanel>
    </div>
  );
}

ComposeAnnoucement.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  compose: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  sendAnnouncement: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposeAnnoucement);
