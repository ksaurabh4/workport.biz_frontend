import React, { useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import imgData from 'dan-api/images/imgData';
import 'dan-styles/vendors/slick-carousel/slick-carousel.css';
import 'dan-styles/vendors/slick-carousel/slick.css';
import 'dan-styles/vendors/slick-carousel/slick-theme.css';

const styles = ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  formControl: {
    width: '50%',
    margin: '0 auto'
  },
  item: {
    textAlign: 'center',
    '& img': {
      margin: '10px auto'
    }
  }
});

function SingleCarousel(props) {
  const [transition, setTransition] = useState('slide');

  const handleChange = event => {
    setTransition(event.target.value);
  };

  const { classes } = props;
  const settings = {
    dots: true,
    fade: transition === 'fade',
  };
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">Carousel Transition</InputLabel>
        <Select
          value={transition}
          onChange={(e) => handleChange(e)}
          inputProps={{
            name: 'transition',
            id: 'transition-single-carousel',
          }}
        >
          <MenuItem value="slide">Slide</MenuItem>
          <MenuItem value="fade">Fade</MenuItem>
        </Select>
      </FormControl>
      <div className="container">
        <Slider {...settings}>
          {imgData.map((item, index) => (
            <div key={index.toString()} className={classes.item}>
              <img src={item.img} alt={item.title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

SingleCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleCarousel);
