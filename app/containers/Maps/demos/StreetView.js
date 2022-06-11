import React from 'react';
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';
import GoogleMapWrapper from './GoogleMapWrapper';

const containerStyle = {
  height: '400px'
};

const MapWithStreetView = props => {
  const center = {
    lat: 51.5320665,
    lng: -0.177203
  };

  return (
    <GoogleMapWrapper>
      <GoogleMap
        {...props}
        id="bicycling-example"
        zoom={14}
        center={center}
      >
        <StreetViewPanorama
          position={center}
          visible
        />
      </GoogleMap>
    </GoogleMapWrapper>
  );
};

function StreetView() {
  return (
    <MapWithStreetView
      loadingElement={<div style={{ height: '100%' }} />}
      mapContainerStyle={containerStyle}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default StreetView;
