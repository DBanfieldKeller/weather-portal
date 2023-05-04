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

  // format weatherAPI output for writing to page
  const weatherFormat = (output, units) => {
    const formattedOutput = formatOutput(output, units);
    return (formattedOutput);
  }

  //get data from API call, format and write to state 
  const weatherLookup = (currentLocation, units) => {
    getForecast(currentLocation, units)
      .then((res) => setWeatherData(weatherFormat(res, units)))
  };

  // handle city name input
  const handleInputChange = (e) => {
    setCurrentLocation(e.target.value)
  };

  // handle UoM radio buttons
  const handleUnitChange = (e) => {
    setUnits(e.target.value)
  };

  // add recent search to search history array and update database
  const writeSearchHistory = (searchHistory, currentLocation) => {
    const token = window.sessionStorage.getItem("token")
    const searchHistoryArray = searchHistory
    searchHistoryArray.unshift(currentLocation);
    searchHistoryArray.splice(5);
    setSearchHistory(searchHistoryArray);
    updateHistory(token, searchHistory)
      .then((res) => {
        if (res.isTokenValid) {
          console.log(res.response)
        } else {
          handleExpiredToken()
        }
      })
  };

  // handle "bleat your weather" button
  const handleFormSubmit = (e) => {
    e.preventDefault();
    weatherLookup(currentLocation, units);
    if (isLoggedIn) {
      writeSearchHistory(searchHistory, currentLocation)
    };
  };

  // logged in state setter for passing down to login modal
  const handleLoggedInState = (boolean) => setIsLoggedIn(boolean);

  // pull history from API, write to search history if data exists
  const retrieveHistory = () => {
    const token = window.sessionStorage.getItem("token");
    getHistory(token)
      .then((res) => {
        if (res.data.userData.dataValue) {
          setSearchHistory(res.data.userData.dataValue);
        }
      })
  };

  // on token expiration, logout and display logout alert
  const handleExpiredToken = () => {
    setIsLoggedIn(false)
    setShowAlert(true)
  };

  // alert message state handler for passing down to LogoutAlert component
  const handleAlertClose = () => {
    setShowAlert(false)
  }

  // default lookup on page load
  useEffect(() => {
    weatherLookup("New York", "imperial");
  }, []);

  // pull history and write to state on login, clear history state on logout
  useEffect(() => {
    if (isLoggedIn) {
      retrieveHistory()
    } else {
      setSearchHistory([])
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Header />
      <LogoutAlert
        handleAlertClose={handleAlertClose}
        showAlert={showAlert} />
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
