import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GoogleMapWrapper from './GoogleMapWrapper';

const containerStyle = {
  height: '400px'
};

const MapWithAMarker = props => (
  <GoogleMapWrapper>
    <GoogleMap
      {...props}
      zoom={7}
      center={{
        lat: -34.300,
        lng: 119.344
      }}
    >
      <Marker
        position={{
          lat: -34.300,
          lng: 119.344
        }}
      />
    </GoogleMap>
  </GoogleMapWrapper>
);

function BasicMarker() {
  return (
    <MapWithAMarker
      loadingElement={<div style={{ height: '100%' }} />}
      mapContainerStyle={containerStyle}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default BasicMarker;
