import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Flag from '@material-ui/icons/Flag';
import People from '@material-ui/icons/People';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import LabelIcon from '@material-ui/icons/Label';
import FileIcon from '@material-ui/icons/Description';
import Download from '@material-ui/icons/CloudDownload';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import isImage from '../Forms/helpers/helpers.js';
import styles from './email-jss';

const ITEM_HEIGHT = 80;
function AnnouncementList(props) {
  const [anchorElOpt, setAnchorElOpt] = useState(null);
  const [itemToMove, setItemToMove] = useState(null);
  const {
    classes,
    announcementData,
    openAnnouncement,
    filterPage,
    keyword,
    remove,
    loggedInUser
  } = props;

  const handleClickOpt = (event, item) => {
    setAnchorElOpt(event.currentTarget);
    setItemToMove(item);
  };

  const handleCloseOpt = () => {
    setAnchorElOpt(null);
  };

  const handleMoveTo = (item, category) => {
    const { moveTo } = props;
    moveTo(item, category);
    setAnchorElOpt(null);
  };

  const attachmentPreview = filesArray => filesArray.map((file, index) => {
    const base64File = URL.createObjectURL(file);
    if (isImage(file)) {
      return (
        <div key={index.toString()} className={classes.item}>
          <div className="imageContainer col fileIconImg">
            <div className="downloadBtn">
              <IconButton color="secondary" component="a" href={base64File} target="_blank">
                <Download />
              </IconButton>
            </div>
            <figure className="imgWrap"><img className="smallPreviewImg" src={base64File} alt="preview" /></figure>
          </div>
          <Typography noWrap>{file.name}</Typography>
        </div>
      );
    }
    return (
      <div key={index.toString()} className={classes.item}>
        <div className="imageContainer col fileIconImg">
          <div className="fileWrap">
            <div className="downloadBtn">
              <IconButton color="secondary" href={base64File} target="_blank">
                <Download />
              </IconButton>
            </div>
            <FileIcon className="smallPreviewImg" alt="preview" />
          </div>
        </div>
        <Typography noWrap>{file.name}</Typography>
      </div>
    );
  });
  const getAnnouncement = dataArray => dataArray.map(announcement => {
    const renderHTML = { __html: announcement.announcementContent };
    // if (announcement.announcementSubject.toLowerCase().indexOf(keyword) === -1) {
    //   return false;
    // }
    return (
      <Accordion className={classes.emailList} key={announcement.announcementId} onChange={() => openAnnouncement(announcement)}>
        <AccordionSummary
          className={classes.emailSummary}
          expandIcon={<ExpandMoreIcon />}
          classes={{
            expandIcon: classes.arrowIcon
          }}
        >
          <div className={classes.fromHeading}>
            <Typography className={classes.heading} display="block">
              <Typography variant="caption" display="block">{moment(announcement.announcementCreatedAt).format('DD-MM-YYYY HH:mm:ss')}</Typography>
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading} noWrap>{announcement.announcementSubject}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <section>
            <div className={classes.emailContent}>
              <Typography variant="h6" gutterBottom>{announcement.announcementSubject}</Typography>
              <article dangerouslySetInnerHTML={renderHTML} /> {/* eslint-disable-line */}
            </div>
            {/* <div className={classes.preview}>
              {attachmentPreview(announcement.attachment)}
            </div> */}
          </section>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <div className={classes.action}>
            {/* <Button size="small">Delete</Button> */}
            {loggedInUser.isAdmin && loggedInUser.companyId === announcement.comapnyId && <Button size="small" color="secondary" onClick={() => remove(announcement)}>Delete</Button>}
          </div>
        </AccordionActions>
      </Accordion>
    );
  });
  return (
    <main className={classes.content}>
      {announcementData.length > 0 && getAnnouncement(announcementData)}
    </main>
  );
}

AnnouncementList.propTypes = {
  classes: PropTypes.object.isRequired,
  announcementData: PropTypes.array.isRequired,
  openAnnouncement: PropTypes.func.isRequired,
  moveTo: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleStar: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  filterPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  loggedInUser: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnnouncementList);
