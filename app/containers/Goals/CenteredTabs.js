import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs(props) {
  const classes = useStyles();
  const { handleTabChange, activeTab } = props;
  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="G1" />
        <Tab label="G2" />
        <Tab label="G3" />
        <Tab label="Scorecard" />
      </Tabs>
    </Paper>
  );
}
