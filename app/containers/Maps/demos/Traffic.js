import React from 'react';
import { GoogleMap, TrafficLayer } from '@react-google-maps/api';
import GoogleMapWrapper from './GoogleMapWrapper';

const containerStyle = {
  height: '400px'
};

const MapWithATrafficLayer = props => {
  const center = {
    lat: 42.3726399,
    lng: -71.1096528
  };

  const onLoad = trafficLayer => {
    console.log('trafficLayer: ', trafficLayer);
  };

  return (
    <GoogleMapWrapper>
      <GoogleMap
        {...props}
        id="bicycling-example"
        zoom={14}
        center={center}
      >
        <TrafficLayer onload={onLoad} />
      </GoogleMap>
    </GoogleMapWrapper>
  );
};

function Traffic() {
  return (
    <MapWithATrafficLayer
      loadingElement={<div style={{ height: '100%' }} />}
      mapContainerStyle={containerStyle}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default Traffic;
