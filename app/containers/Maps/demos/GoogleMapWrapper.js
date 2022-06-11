import React from 'react';
import PropTypes from 'prop-types';
import { LoadScript } from '@react-google-maps/api';

function GoogleMapWrapper(props) {
  const { children } = props;
  return (
    <LoadScript
      {...props}
      googleMapsApiKey="AIzaSyBdYeVetW8SdWB7Tkfyu7tfMf2NiMgDh-M"
    >
      {children}
    </LoadScript>
  );
}

GoogleMapWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default GoogleMapWrapper;
