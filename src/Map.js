import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import israelCities from "./csvjson.json";
import mapStyles from "./mapStyles.json";

const MapContainer = () => {
  const userClicked = () => {
    console.log("hello");
  };
  const makeMarker = (e) => {};

  const showLocationsMarker = () => {};

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_KEY}>
      <GoogleMap
        onClick={userClicked}
        mapContainerStyle={{
          height: "80vh",
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
        {/* {israelCities.map((location) => (
          <Marker
            key={"myKey" + location.OBJECTID}
            position={{ lat: location.X, lng: location.Y }}
            color='red'
          />
        ))} */}
        {/* <Marker position={{ lat: 29, lng: 35 }} color='green' /> */}
        {/* {userPicked && <Marker key={"user"} position={userPick.location} />}
          {isBreak && (
            <Marker
              key={"currObjective"}
              position={currObjective.location}
              color="green"
              options={{ icon: greenPin }}
            />
          )} */}
      </GoogleMap>
    </LoadScript>
  );
};
export default MapContainer;
