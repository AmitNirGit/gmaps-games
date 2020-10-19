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
  // function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  //   let R = 6371; // Radius of the earth in km
  //   let dLat = deg2rad(lat2 - lat1); // deg2rad below
  //   let dLon = deg2rad(lon2 - lon1);
  //   let a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(lat1)) *
  //       Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   let d = R * c; // Distance in km
  //   return d;
  // }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_KEY}>
      <GoogleMap
        mapContainerStyle={{
          height: "80vh",
          width: "100%",
        }}
        zoom={7.7}
        center={{ lat: 31.45, lng: 35 }}
        options={{
          disableDefaultUI: true,
          styles: mapStyles,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "none",
          scrollwheel: false,
        }}
      />
      {israelCities.map((location) => (
        <Marker
          key={"myKey" + location.OBJECTID}
          position={{ lat: location.X, lng: location.Y }}
          color='red'
        />
      ))}

      {/* <Marker position={{ lat: 29, lng: 35 }} />*/}
    </LoadScript>
  );
};
export default MapContainer;
