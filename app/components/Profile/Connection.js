import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import datas from 'dan-api/apps/connectionData';
import ProfileCard from '../CardPaper/ProfileCard';
import styles from './profile-jss';

function Connection(props) {
  const { classes, teamList } = props;
  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="space-between"
      direction="row"
      spacing={2}
      className={classes.rootx}
    >
      {
        teamList.map((data, index) => (
          <Grid item md={4} sm={6} xs={12} key={index.toString()}>
            <ProfileCard
              cover={data.cover}
              avatar={data.avatar}
              name={data.empName}
              title={data.empDesignation}
              email= {data.empEmail}
              phone={data.empPhone}
              // connection={data.connection}
              // isVerified={data.verified}
              // btnText="See Profile"
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

Connection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Connection);
