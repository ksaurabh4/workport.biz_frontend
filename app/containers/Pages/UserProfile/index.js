import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import dummy from 'dan-api/dummy/dummyContents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import {
  Cover,
  About,
  Connection,
  Favorites,
  Albums
} from 'dan-components';
import bgCover from 'dan-images/petal_bg.svg';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import data from '../../SampleApps/Timeline/api/timelineData';
import api from '../../../redux/api';
// import { fetchAction } from '../../SampleApps/Timeline/reducers/timelineActions';

function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function UserProfile(props) {
  const title = brand.name + ' - Profile';
  const description = brand.desc;
  const { dataProps, classes, fetchData } = props;
  const [value, setValue] = useState(0);
  const [team, setTeam] = useState(null);
  const user = useSelector(state => state.auth.user);
  const featchTeam = async () => {
    const url = `/employees?companyId=${user.companyId}&empManagerId=${user.empId}`;
    try {
      const res = await api.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      if (res) {
        setTeam(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    user.isManager === 1 && featchTeam();
  }, [user]);

  const handleChange = (event, val) => {
    setValue(val);
  };
  const getUserDesc = () => (<>
    <div>{user.empDesignation}</div>
    <h5>{`${user.empSubDept} (${user.empDept})`}</h5>
  </>);
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
      <Cover
        coverImg={bgCover}
        avatar={dummy.user.avatar}
        name={user.empName}
        desc={getUserDesc}
      />
      <AppBar position="static" className={classes.profileTab}>
        <Hidden mdUp>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} />
            <Tab icon={<SupervisorAccount />} />
            {/* <Tab icon={<Favorite />} />
            <Tab icon={<PhotoLibrary />} /> */}
          </Tabs>
        </Hidden>
        <Hidden smDown>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} label="ABOUT" />
            {user.isManager === 1 && <Tab icon={<SupervisorAccount />} label="My Team" />}
            {/* <Tab icon={<Favorite />} label="18 FAVORITES" /> */}
            {/* <Tab icon={<PhotoLibrary />} label="4 ALBUMS" /> */}
          </Tabs>
        </Hidden>
      </AppBar>
      {value === 0 && <TabContainer><About data={user} /></TabContainer>}
      {user.isManager === 1 && value === 1 && <TabContainer><Connection teamList={team}/></TabContainer>}
      {/* {value === 2 && <TabContainer><Favorites /></TabContainer>} */}
      {/* {value === 3 && <TabContainer><Albums /></TabContainer>} */}
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  dataProps: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state, // force state from reducer
  dataProps: state.socmed.dataTimeline
});

const UserProfileMapped = connect(
  mapStateToProps,
)(UserProfile);

export default withStyles(styles)(UserProfileMapped);
