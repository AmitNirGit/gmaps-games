import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles.json";
const { REACT_APP_KEY } = process.env;

const MapContainer = ({
  userPick,
  setUserPick,
  currentLocation,
  setCurrentLocations,
  userPinned,
}) => {
  const userClicked = (e) => {
    const latLng = e.latLng.toJSON();
    const location = {
      lat: latLng.lat,
      lng: latLng.lng,
    };
    setUserPick(location);
    userPinned(location);
  };

  const makeMarker = (location) => {};

  const showLocationsMarker = () => {};

  return (
    <LoadScript googleMapsApiKey={REACT_APP_KEY}>
      <GoogleMap
        onClick={userClicked}
        mapContainerStyle={{
          height: "85vh",
          width: "100%",
        }}
        zoom={8}
        center={{ lat: 31.45, lng: 35 }}
        options={{
          disableDefaultUI: true,
          styles: mapStyles,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "none",
          scrollwheel: false,
        }}>
        {userPick && <Marker position={currentLocation.location} />}
        <Marker position={userPick} />
      </GoogleMap>
    </LoadScript>
  );
};
export default MapContainer;
