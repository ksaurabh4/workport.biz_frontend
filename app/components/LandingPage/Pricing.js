import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PricingCard from '../CardPaper/PricingCard';
import Title from './Title';
import styles from './landingStyle-jss';

function Pricing(props) {
  const { classes, slideMode } = props;
  return (
    <div className={classes.pricing}>
      <div className={slideMode ? classes.fullWidth : classes.container}>
        <Title title="Pricing" desc="Pricing options which no one can match." align="center" monocolor={slideMode && true} />
        <Grid container className={classes.root} spacing={5}>
          <Grid item md={4} xs={12}>
            <PricingCard
              title="Trail"
              price="FREE"
              tier="free"
              feature={['7 days', 'Max 50 Employees', 'Unlimited Task', 'Unlimited Announcement']}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <PricingCard
              title="Standard"
              price="₹1000"
              tier="cheap"
              feature={['Monthly Charges', 'Max 50 Employees', 'Unlimited Task', 'Unlimited Announcement']}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <PricingCard
              title="Pro"
              price="₹2000"
              tier="cheap"
              feature={['Monthly Charges', 'Max 250 Employees', 'Unlimited Task', 'Unlimited Announcement']}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <PricingCard
              title="Enterprise"
              price="Custom"
              tier="expensive"
              feature={['Monthly Charges', 'Special Price', 'Customized Solutions', 'Unlimited Task', 'Unlimited Announcement']}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Pricing.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Pricing);
