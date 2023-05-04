import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header';
import CurrentWeather from './components/currentWeather/currentWeather';
import InputBar from './components/inputBar/inputBar';
import LoginModal from './components/loginModal/loginModal';
import LogoutAlert from './components/logoutAlert/logoutAlert';
import getForecast from './utils/weatherAPI';
import formatOutput from './utils/formatOutput';
import { getHistory, updateHistory } from './utils/historyAPI';


function App() {

  const [currentLocation, setCurrentLocation] = useState("New York");
  const [units, setUnits] = useState("imperial");
  const [weatherData, setWeatherData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const [showAlert, setShowAlert] = useState(false)

  const weatherFormat = (output, units) => {
    const formattedOutput = formatOutput(output, units);
    return (formattedOutput);
  }

  // TODO: Confirm if catch actually does anything
  const weatherLookup = (currentLocation, units) => {
    getForecast(currentLocation, units)
      .then((res) => setWeatherData(weatherFormat(res, units)))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    weatherLookup("New York", "imperial");
  }, []);

  useEffect(() => {
    if (!isLoggedIn) setSearchHistory([]);
    console.log(searchHistory)
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(searchHistory)
  }, [searchHistory])

  const handleInputChange = (e) => setCurrentLocation(e.target.value);

  const handleUnitChange = (e) => {
    setUnits(e.target.value)
  };

  const writeSearchHistory = (searchHistory, currentLocation) => {
    const token = window.sessionStorage.getItem("token")
    const searchHistoryArray = searchHistory
    searchHistoryArray.unshift(currentLocation);
    searchHistoryArray.splice(5);
    setSearchHistory(searchHistoryArray);
    updateHistory(token, searchHistory)
    .then((res)=>{
      if(res.isTokenValid){
        console.log(res.response)
      }else{
        handleExpiredToken()
      }
    })
  };



  const handleFormSubmit = (e) => {
    e.preventDefault();
    weatherLookup(currentLocation, units);
    if(isLoggedIn) {
      writeSearchHistory(searchHistory, currentLocation)
    };
  };

  // logged in state setter for passing down to login modal
  const handleLoggedInState = (boolean) => setIsLoggedIn(boolean);

  const retrieveHistory = () => {
    const token = window.sessionStorage.getItem("token");
    getHistory(token)
      .then((res) => {
        console.log(res);
        if (res.data.userData.dataValue) {
          setSearchHistory(res.data.userData.dataValue);
        }
      })
  };

  const handleExpiredToken = () => {
    setIsLoggedIn(false)
    setShowAlert(true)
  };

  const handleAlertClose = () =>{
    setShowAlert(false)
  }

  useEffect(() => {
    if (isLoggedIn) retrieveHistory()
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Header />
      <LogoutAlert
        handleAlertClose={handleAlertClose}
        showAlert={showAlert}/>
      <LoginModal
        handleLoggedInState={handleLoggedInState}
        isLoggedIn={isLoggedIn} />
      <InputBar
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleUnitChange={handleUnitChange}
        currentLocation={currentLocation}
        units={units}
        isLoggedIn={isLoggedIn}
        weatherLookup={weatherLookup}
        searchHistory={searchHistory} />
      <CurrentWeather
        weatherData={weatherData}
        units={units} />
    </div>
  );
}

export default App;
