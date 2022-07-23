import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Tooltip, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SummaryPage from './SummaryPage';
import GoalsTable from './GoalsTable/GoalsTable';
import { setTabAction } from './reducers/goalsActions';
import CenteredTabs from './CenteredTabs';

function Goals() {
  const dispatch = useDispatch();
  const title = brand.name + ' - Goals';
  const description = brand.desc;

  const activeTab = useSelector(state => state.goals.activeTab);
  const handleTabChange = (tabNum) => {
    dispatch(setTabAction(tabNum));
  };
  const [showHelp, setShowHelp] = useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const helpButtonClick = (scrollType) => {
    setShowHelp(true);
    setScroll(scrollType);
  };

  const titleRender = (<div style={{ display: 'flex', alignItems: 'center' }}>
    <span>Goals</span>
    <span style={{ padding: '10px', marginTop: '8px' }} onClick={() => helpButtonClick('paper')}>
      <Tooltip title="How to fill goals?">
        <Icon fontSize='large'>help_center</Icon>
      </Tooltip>
    </span>
  </div>);

  useEffect(() => () => {
    dispatch(setTabAction(0));
  }, []);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (showHelp) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showHelp]);

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
      {/* <Notification close={() => closeNotif(closeNotifAction(branch))} message={messageNotif} /> */}
      <Dialog
        open={showHelp}
        onClose={() => { setShowHelp(false); }}
        scroll={scroll}
        maxWidth={'md'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">How To Fill Goals?</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* <Typography component="h1" variant='h5' gutterBottom>How to fill goals</Typography> */}
            <Typography component="h4" variant='h6' gutterBottom>G1</Typography>
            <Typography component="p" gutterBottom>Goal 1 is for goals where target is in number (value,volume or any other number target).
            </Typography>
            <Typography component="p" gutterBottom>You call fill achievement as per actual and score is auto calculated in percent.</Typography>
            <Typography component="h4" variant='h6' gutterBottom>G2</Typography>
            <Typography component="p" gutterBottom>Goal 2 parameter is anything related to employee quality of contribution ( it can be number,it can be
              subjective or a mix of both).</Typography>
            <Typography component="p" gutterBottom>You can fill achievement on the scale of 1 to 10 and score is auto calculated in percent</Typography>
            <Typography component="h4" variant='h6' gutterBottom>G2</Typography>
            <Typography component="p" gutterBottom>Goal 3 parameter is anything related to employee quality of contribution ( it can be number,it can be
              subjective or a mix of both ) , here you can take team target as well.</Typography>
            <Typography component="p" gutterBottom>You can fill achievement on the scale of 1 to 10 and score is auto calculated in percent</Typography>
            <Typography component="h4" variant='h4' style={{ marginTop: '20px' }} gutterBottom>Guidelines</Typography>
            <li>Goals can be filled by both employee and reporting manager/Line manager</li>
            <li> Goals can be edited and deleted by both employee and reporting manager/Line manager</li>
            <li> One can fill goals for last month/current month/last week/this week</li>
            <li> We recommend to fill the data regularly to get best analysis</li>
            <li> In summary section you gets the scorecard of your performance as per date range</li>
            <li> In dashboard you can see overall performance of all employees as per date range</li>
            <li> It also increases healthy competition between team members across company</li>
            <li> You can see your area of improvement and work towards it accordingly to score better</li>
            <li> It’s a transparent way to monitor regularly and do appraisal</li>
            <Typography component="h4" variant='h5' style={{ marginTop: '20px' }} gutterBottom>Happy Workporting!!</Typography>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setShowHelp(false); }} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <PapperBlock title={titleRender} desc="View and Edit Your goals here">
        <CenteredTabs handleTabChange={tab => handleTabChange(tab)} activeTab={activeTab} />
        {activeTab === 0 && <GoalsTable tab='Goal 1' type='g1' />}
        {activeTab === 1 && <GoalsTable tab='Goal 2' type='g2' />}
        {activeTab === 2 && <GoalsTable tab='Goal 3' type='g3' />}
        {activeTab === 3 && <SummaryPage tab='Scorecard' />}
      </PapperBlock>
    </div>
  );
}

export default Goals;
