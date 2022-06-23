import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { useDispatch, useSelector } from 'react-redux';
import CenteredTabs from './CenteredTabs';
import { setTabAction } from './reducers/goalsActions';

function Goals() {
  const dispatch = useDispatch();
  const title = brand.name + ' - Goals';
  const description = brand.desc;

  const activeTab = useSelector(state => state.goals.activeTab);
  const handleTabChange = (tabNum) => {
    dispatch(setTabAction(tabNum));
  };

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
      <PapperBlock title="Goals" desc="View and Edit Your goals here">
        <CenteredTabs handleTabChange={tab => handleTabChange(tab)} activeTab={activeTab} />
        {activeTab === 0 && <h1>Page1</h1>}
        {activeTab === 1 && <h1>Page2</h1>}
        {activeTab === 2 && <h1>Page3</h1>}
        {activeTab === 3 && <h1>Page4</h1>}
      </PapperBlock>
    </div>
  );
}

export default Goals;
