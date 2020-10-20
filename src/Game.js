import React from "react";
import Map from "./Map";
import israelCities from "./csvjson.json";

export default function Game() {
  const clicked = () => {
    console.log("hello");
  };
  return (
    <div className='game-wrapper'>
      <div className='game-pannel' style={{ height: "20vh" }}>
        <h1>MapGames</h1>
      </div>
      <div onclick={clicked}>
        <Map />
      </div>
    </div>
  );
}
