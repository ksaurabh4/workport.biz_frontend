import React, { useState } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import GoogleMapWrapper from './GoogleMapWrapper';

const containerStyle = {
  height: '400px'
};

const MapWithDirection = props => {
  const [response, setResponse] = useState(null);
  const [travelMode] = useState('DRIVING');
  const [origin] = useState('41.8507300, -87.6512600');
  const [destination] = useState('41.8525800, -87.6514100');

  const directionsCallback = res => {
    console.log(res);

    if (res !== null) {
      if (res.status === 'OK') {
        setResponse(res);
      } else {
        console.log('response: ', res);
      }
    }
  };

  return (
    <GoogleMapWrapper>
      <GoogleMap
        {...props}
        id="direction-example"
        zoom={8}
        center={{
          lat: 41.8507300,
          lng: -87.6512600
        }}
      >
        <DirectionsService
          // required
          options={{ // eslint-disable-line
            destination,
            origin,
            travelMode
          }}
          // required
          callback={directionsCallback}
        />
        {
          response !== null && (
            <DirectionsRenderer
              // required
              options={{ // eslint-disable-line
                directions: response
              }}
            />
          )
        }
      </GoogleMap>
    </GoogleMapWrapper>
  );
};

function Direction() {
  return (
    <MapWithDirection
      loadingElement={<div style={{ height: '100%' }} />}
      mapContainerStyle={containerStyle}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default Direction;
