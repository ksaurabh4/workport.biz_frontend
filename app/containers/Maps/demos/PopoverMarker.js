import React, { useState } from 'react';
import LocalDining from '@material-ui/icons/LocalDining';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import GoogleMapWrapper from './GoogleMapWrapper';

const containerStyle = {
  height: '400px'
};

const divStyle = {
  background: 'white',
  padding: 15
};

const MapWithAMakredInfoWindow = props => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <GoogleMapWrapper>
      <GoogleMap
        {...props}
        zoom={7}
        center={{
          lat: -34.300,
          lng: 119.344
        }}
      >
        <Marker position={{ lat: -34.300, lng: 119.344 }} onClick={handleToggle}>
          {open && (
            <InfoWindow>
              <div style={divStyle}>
                <LocalDining />
                &nbsp;A marked place
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </GoogleMapWrapper>
  );
};

function PopoverMarker() {
  return (
    <MapWithAMakredInfoWindow
      loadingElement={<div style={{ height: '100%' }} />}
      mapContainerStyle={containerStyle}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default PopoverMarker;
