import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocationOn from '@material-ui/icons/LocationOn';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import styles from './widget-jss';

const MapWithAMarker = props => {
  const position = {
    lat: -34.300,
    lng: 119.344
  };
  return (
    <GoogleMap
      {...props}
      center={position}
      onLoad={map => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
      }}
    >
      <Marker position={position} />
    </GoogleMap>
  );
};

function MapWidget(props) {
  const { classes } = props;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBdYeVetW8SdWB7Tkfyu7tfMf2NiMgDh-M'
  });
  return (
    <Paper>
      {isLoaded ? (
        <div className={classes.mapWrap}>
          <MapWithAMarker
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '200px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
      ) : <p>Loading...</p>}
      <div className={classes.address}>
        <Card className={classes.card}>
          <CardContent>
            <ListItem>
              <Avatar className={classes.avatar}>
                <LocationOn />
              </Avatar>
              <ListItemText primary="Your Location" secondary="Town Hall Building no.45 Block C - ABC Street" />
            </ListItem>
          </CardContent>
        </Card>
      </div>
    </Paper>
  );
}

MapWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapWidget);
