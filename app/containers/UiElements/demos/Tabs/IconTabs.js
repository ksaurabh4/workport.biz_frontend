import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';

export default function IconTabs() {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleChange = (event, val) => {
    setValue(val);
  };

  const handleChange2 = (event, val2) => {
    setValue2(val2);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography variant="button" gutterBottom>Without Text</Typography>
          <Paper>
            <Tabs
              value={value2}
              onChange={handleChange2}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<PhoneIcon />} />
              <Tab icon={<FavoriteIcon />} />
              <Tab icon={<PersonPinIcon />} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="button" gutterBottom>With Text</Typography>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab icon={<PhoneIcon />} label="RECENTS" />
              <Tab icon={<FavoriteIcon />} label="FAVORITES" />
              <Tab icon={<PersonPinIcon />} label="NEARBY" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
