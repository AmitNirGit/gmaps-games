import React, { useState, useEffect } from "react";
import Map from "./Map";
import israelCities from "./csvjson.json";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Switch from "@material-ui/core/Switch";

export default function Game() {
  const [currentLocation, setCurrentLocation] = useState({});
  const [userPick, setUserPick] = useState(null);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(1);
  const [easyMode, setEasyMonde] = useState(false);
  const [lastPointScore, setLastPointScore] = useState(0);

  //*calculations
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const calcPoints = (usersLocation) => {
    const distance = getDistanceFromLatLonInKm(
      currentLocation.location.lat,
      currentLocation.location.lng,
      usersLocation.lat,
      usersLocation.lng
    );
    setLastPointScore(Math.floor(Math.max(0, 100 - distance * 2)));
    setScore((curr) => Math.floor(curr + Math.max(0, 100 - distance * 2)));
  };

  //*actions
  const userPinned = async (location) => {
    // setUserPick(location);
    calcPoints(location);
    //stopper after game ending
    if (stage === 6) {
      setTimeout(() => {
        handleOpen();
      }, 1500);
      return;
    }

    setTimeout(() => {
      setUserPick(null);
      setStage((currStage) => currStage + 1);
    }, 1500);
  };
  const rollLocation = () => {
    const rdm = Math.floor(Math.random() * Math.floor(1239));
    const rolledLocation = israelCities[rdm];
    if (!rolledLocation.MGLSDE_LOC) {
      rollLocation();
      return;
    }
    if (rolledLocation.MGLSDE_L_1 < (easyMode ? 5000 : 200)) {
      rollLocation();
      return;
    }
    setCurrentLocation({
      name: rolledLocation.MGLSDE_LOC,
      location: {
        lat: rolledLocation.Y,
        lng: rolledLocation.X,
      },
    });
  };

  const resetGame = () => {
    setUserPick(null);
    setScore(0);
    setStage(0);
    setLastPointScore(0);
    handleClose();
  };

  //*MODAL
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //*buttons
  const useStylesButton = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Game Over</h2>
      <p id='simple-modal-description' style={{ fontSize: "22 px" }}>
        WOW! you scored {score} points on{" "}
        {easyMode ? <b>easy mode</b> : <b>hard mode!</b>}.. want to try and beat
        that score?
      </p>
      <button type='button' onClick={resetGame}>
        New Game
      </button>
    </div>
  );

  useEffect(() => {
    rollLocation();
  }, [stage]);

  const handleChange = (event) => {
    resetGame();
    setEasyMonde(!easyMode);
    console.log("changed");
  };

  return (
    <div className='game-wrapper'>
      <Modal
        open={open}
        onClose={resetGame}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'>
        {body}
      </Modal>
      <div
        className='game-pannel'
        style={{ height: "15vh", textAlign: "center" }}>
        {/* <h1>MapGames</h1> */}
        {currentLocation && (
          <h1 style={{ fontSize: "50px" }}>{currentLocation.name}</h1>
        )}
        <h2>ניקוד : {score}</h2>
        <h3>ניקוד בנקודה האחרונה: {lastPointScore}</h3>
        <span>
          <Switch
            checked={easyMode}
            onChange={handleChange}
            name='checkedA'
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <b> :מצב קל</b>
        </span>
      </div>
      <Map
        userPick={userPick}
        setUserPick={setUserPick}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        userPinned={userPinned}
      />
    </div>
  );
}
