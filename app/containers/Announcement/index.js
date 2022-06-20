import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  AnnouncementHeader,
  AnnouncementList,
  AnnouncementSidebar,
  ComposeAnnoucement,
  AnnouncementsList,
  Notification
} from 'dan-components';
import styles from 'dan-components/Email/email-jss';
import {
  fetchAnnouncementAction,
  openAnnouncementAction,
  filterAction,
  composeAction,
  discardAction,
  searchAction,
  sendAction,
  moveAction,
  deleteAction,
  toggleStaredAction,
  closeNotifAction,
  errorNotifAction
} from './reducers/announcementActions';
import data from './api/emailData';
import api from '../../redux/api';

// validation functions
const announcement = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid announcement'
    : ''
);

function Announcement(props) {
  const [field, setField] = useState({
    to: '',
    subject: ''
  });
  const [validAnnouncement, setValidAnnouncement] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redux State
  const keyword = useSelector(state => state.announcement.keywordValue);
  const announcementData = useSelector(state => state.announcement.inbox);
  const currentPage = useSelector(state => state.announcement.currentPage);
  const openFrm = useSelector(state => state.announcement.openFrm);
  const messageNotif = useSelector(state => state.announcement.notifMsg);
  const loggedInUser = useSelector(state => state.auth.user);

  // Dispatcher
  const dispatch = useDispatch();
  const fetchData = useDispatch();
  const openAnnouncement = useDispatch();
  const goto = useDispatch();
  const search = useDispatch();
  const moveTo = useDispatch();
  const remove = useDispatch();
  const toggleStar = useDispatch();
  const compose = useDispatch();
  const discard = useDispatch();
  const sendAnnouncement = useDispatch();
  const closeNotif = useDispatch();

  const fetchAnnouncementList = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `/announcements?companyId=${user.companyId}`;
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        // setDataApi(res.data);
        fetchData(fetchAnnouncementAction(res.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // fetchData(fetchAnnouncementAction(data));
    fetchAnnouncementList();
  }, []);

  const handleChange = (event, name) => {
    const { value } = event.target;
    setField(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReply = mail => {
    compose(composeAction);
    setField({
      to: mail.name,
      subject: 'Reply: ' + mail.subject,
    });
  };

  const handleCompose = () => {
    compose(composeAction);
    setField({
      to: ' ',
      subject: ' ',
    });
  };

  const handleSubmit = async (toPayload, subjectPayload, content, attachment) => {
    const payloadData = { announcementTo: toPayload, announcementSubject: subjectPayload, announcementContent: content };
    console.log();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await api.post('/announcements/create', { ...payloadData, companyId: user.companyId }, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res.data) {
        sendAnnouncement(sendAction(toPayload, subjectPayload, content, attachment));
        fetchAnnouncementList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (payload) => {
    console.log(payload);
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await api.delete(`/announcements/${payload.announcementId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res.data) {
        remove(deleteAction());
        fetchAnnouncementList();
      }
    } catch (error) {
      console.log(error);
      dispatch(errorNotifAction('You not have access to remove this announcement!'));
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { classes } = props;

  const title = brand.name + ' - Announcement';
  const description = brand.desc;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification close={() => closeNotif(closeNotifAction)} message={messageNotif} />
      <div className={classes.root}>
        <AnnouncementsList
          announcementData={announcementData}
          openAnnouncement={(payload) => openAnnouncement(openAnnouncementAction(payload))}
          filterPage={currentPage}
          keyword={keyword}
          moveTo={(mail, category) => moveTo(moveAction(mail, category))}
          remove={(payload) => handleDelete(payload)}
          toggleStar={(payload) => toggleStar(toggleStaredAction(payload))}
          reply={handleReply}
          canDelete={loggedInUser.isAdmin}
        />
      </div>
      {loggedInUser.isAdmin && <ComposeAnnoucement
        to={field.to}
        subject={field.subject}
        compose={handleCompose}
        validAnnouncement={validAnnouncement}
        sendAnnouncement={(toPayload, subjectPayload, content, attachment) => handleSubmit(toPayload, subjectPayload, content, attachment)}
        inputChange={(e, name) => handleChange(e, name)}
        open={openFrm}
        closeForm={() => discard(discardAction)}
      />}
    </div>
  );
}

Announcement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Announcement);
