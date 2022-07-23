import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { useDispatch, useSelector } from 'react-redux';
import CenteredTabs from './CenteredTabs';
import { setTabAction } from './reducers/goalsActions';
import GoalsTable from './GoalsTable/GoalsTable';
import SummaryPage from './SummaryPage';

function Goals() {
  const dispatch = useDispatch();
  const title = brand.name + ' - Goals';
  const description = brand.desc;

  const activeTab = useSelector(state => state.goals.activeTab);
  const handleTabChange = (tabNum) => {
    dispatch(setTabAction(tabNum));
  };

  useEffect(() => () => {
    dispatch(setTabAction(0));
  }, []);

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
      <PapperBlock title="Goals" desc="View and Edit Your goals here">
        <CenteredTabs handleTabChange={tab => handleTabChange(tab)} activeTab={activeTab} />
        {activeTab === 0 && <GoalsTable tab='Goal 1' type='g1' />}
        {activeTab === 1 && <GoalsTable tab='Goal 2' type='g2' />}
        {activeTab === 2 && <GoalsTable tab='Goal 3' type='g3' />}
        {activeTab === 3 && <SummaryPage tab='Summary' />}
      </PapperBlock>
    </div>
  );
}

export default Goals;
