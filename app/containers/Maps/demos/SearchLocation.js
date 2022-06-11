import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import GoogleMapWrapper from './GoogleMapWrapper';

const styles = theme => ({
  searchBox: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '240px',
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: '32px',
    marginTop: '7px',
    marginLeft: '10px',
    padding: '0 12px',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipsis',
    zIndex: 10,
    position: 'absolute'
  }
});

const containerStyle = {
  height: '400px'
};

const MapWithASearchBox = (props) => {
  const { classes } = props;
  const [libraries] = useState(['places']);
  const center = {
    lat: 38.685,
    lng: -115.234
  };
  let autocomplete = null;
  const onLoad = autocompleteVal => {
    console.log('autocomplete: ', autocompleteVal);
    autocomplete = autocompleteVal;
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <GoogleMapWrapper libraries={libraries}>
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={containerStyle}
        zoom={8}
        center={center}
      >
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            className={classes.searchBox}
          />
        </Autocomplete>
      </GoogleMap>
    </GoogleMapWrapper>
  );
};

MapWithASearchBox.propTypes = {
  classes: PropTypes.object.isRequired
};

const MapStyled = withStyles(styles)(MapWithASearchBox);

function SearchLocation() {
  return (
    <MapStyled />
  );
}

export default SearchLocation;
