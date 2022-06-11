import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import brand from 'dan-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PricingCard, PapperBlock } from 'dan-components';
import styles from '../HelpSupport/helpSupport-jss';

function Pricing(props) {
  const { classes } = props;
  const [expanded, setExpanded] = useState(null);

  const handleChange = useCallback(panel => {
    const expandedValue = expanded !== panel ? panel : false;
    setExpanded(expandedValue);
  }, [expanded]);

  const title = brand.name + ' - Pricing';
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
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Basic"
            price="$0"
            tier="free"
            feature={['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec']}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Recomended"
            price="$24"
            tier="cheap"
            feature={['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec', 'Pellentesque ac bibendum', 'Vivamus sit amet']}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Extended"
            price="$200"
            tier="expensive"
            feature={['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec', 'Pellentesque ac bibendum', 'Vivamus sit amet']}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Enterprise"
            price="$600"
            tier="more-expensive"
            feature={['Vel fermentum', 'Aenean facilisis vitae', 'Vestibulum nec', 'Pellentesque ac bibendum', 'Vivamus sit amet']}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <PapperBlock title="Question and Answer" icon="ion-ios-help-circle-outline" whiteBg desc="Sed imperdiet enim ligula, vitae viverra justo porta vel.">
        <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Pellentesque ac bibendum tortor?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Vivamus sit amet interdum elit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Vestibulum nec mi suscipit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Cras convallis lacus orci?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={() => handleChange('panel5')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Quisque ut metus sit amet?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              enean sit amet magna vel magna fringilla fermentum. Donec sit amet nulla sed arcu pulvinar ultricies commodo id ligula.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={() => handleChange('panel6')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Nulla vehicula leo ut augue tincidunt?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Curabitur egestas consequat lorem, vel fermentum augue porta id. Aliquam lobortis magna neque, gravida consequat velit venenatis at.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel7'} onChange={() => handleChange('panel7')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Vivamus sit amet interdum elit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec dignissim, odio ac imperdiet luctus, ante nisl accumsan justo, et venenatis ante metus pellentesque sem.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel8'} onChange={() => handleChange('panel8')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Maecenas nisl libero, tincidunt id odio id?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat hendrerit lacus. In id nisi id neque venenatis molestie.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel9'} onChange={() => handleChange('panel9')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Vestibulum nec mi suscipit?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel10'} onChange={() => handleChange('panel10')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Cras convallis lacus orci?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </PapperBlock>
    </div>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);
