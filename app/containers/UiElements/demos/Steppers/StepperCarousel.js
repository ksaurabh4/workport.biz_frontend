import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import imgApi from 'dan-api/images/photos';

const tutorialSteps = [
  {
    label: 'How to be happy :)',
    imgPath: imgApi[45],
  },
  {
    label: '1. Work with something that you like, like…',
    imgPath: imgApi[33],
  },
  {
    label: '2. Keep your friends close to you and hangout with them',
    imgPath: imgApi[14],
  },
  {
    label: '3. Travel everytime that you have a chance',
    imgPath: imgApi[9],
  },
  {
    label: '4. And contribute to Material-UI :D',
    imgPath: imgApi[44],
  },
];

const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
    margin: '0 auto'
  },
  figure: {
    maxWidth: 400,
    overflow: 'hidden',
    margin: '0 auto'
  },
  mobileStepper: {
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    margin: '0 auto',
    textAlign: 'center'
  }
});

function StepperCarousel(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepSwipe, setActiveStepSwipe] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNextSwipe = () => {
    setActiveStepSwipe(activeStepSwipe + 1);
  };

  const handleBackSwipe = () => {
    setActiveStepSwipe(activeStepSwipe - 1);
  };

  const handleStepChangeSwipe = step => {
    setActiveStepSwipe(step);
  };

  const { classes, theme } = props;

  const maxSteps = tutorialSteps.length;
  const maxStepsSwipe = tutorialSteps.length;

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="center" direction="column" md={6}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <img
          className={classes.img}
          src={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
        />
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={(
            <Button size="small" onClick={() => handleNext()} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )}
          backButton={(
            <Button size="small" onClick={() => handleBack()} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          )}
        />
      </Grid>
      <Grid item container justifyContent="center" direction="column" md={6}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStepSwipe].label}</Typography>
        </Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStepSwipe}
          onChangeIndex={handleStepChangeSwipe}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div className={classes.figure} key={index.toString()}>
              <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="text"
          steps={maxStepsSwipe}
          position="static"
          activeStep={activeStepSwipe}
          className={classes.mobileStepper}
          nextButton={(
            <Button size="small" onClick={() => handleNextSwipe()} disabled={activeStepSwipe === maxStepsSwipe - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )}
          backButton={(
            <Button size="small" onClick={() => handleBackSwipe()} disabled={activeStepSwipe === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          )}
        />
      </Grid>
    </Grid>
  );
}

StepperCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(StepperCarousel);
