import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/header/header';
import CurrentWeather from './components/currentWeather/currentWeather';
import InputBar from './components/inputBar/inputBar';
import LoginModal from './components/loginModal/loginModal';
import getForecast from './utils/weatherAPI';
import formatOutput from './utils/formatOutput';
import {getHistory, updateHistory} from './utils/historyAPI';


function App() {

  const [currentLocation, setCurrentLocation] = useState("New York");
  const [units, setUnits] = useState("imperial");
  const [weatherData, setWeatherData ] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const weatherFormat = (output, units) => {
    const formattedOutput = formatOutput(output, units);
    return (formattedOutput);
  }

  // TODO: Confirm if catch actually does anything
  const weatherLookup = (currentLocation, units) => {
    getForecast(currentLocation, units)
    .then((res) =>setWeatherData(weatherFormat(res, units)))
    .catch((err)=>console.log(err));
  }
  
  useEffect(() => {
    weatherLookup("New York", "imperial");
  }, []);

  useEffect(()=> {
    console.log(isLoggedIn)
  },[isLoggedIn]);

  useEffect(()=> {
    console.log(searchHistory)
    console.log(typeof searchHistory)
  },[searchHistory])

  const handleInputChange = (e) => setCurrentLocation(e.target.value);
  const handleUnitChange = (e) => {
    setUnits(e.target.value)
  };

  const writeSearchHistory = (searchHistory, currentLocation) => {
    const searchHistoryArray = searchHistory
    searchHistoryArray.unshift(currentLocation);
    searchHistoryArray.splice(5);
    setSearchHistory(searchHistoryArray);
  };



  const handleFormSubmit = (e) => {
    const token = window.sessionStorage.getItem("token");
    e.preventDefault();
    weatherLookup(currentLocation, units)
    console.log(currentLocation, units)
    writeSearchHistory(searchHistory,currentLocation);
    updateHistory(token, searchHistory);
  };

  const handleLoggedInState = (boolean) => setIsLoggedIn(boolean);

  const retrieveHistory = () => {
    const token = window.sessionStorage.getItem("token");
    console.log(token);
    getHistory(token)
      .then((res) => {
        setSearchHistory(res.data.userData.dataValue);
      })

  };

  useEffect(()=> {
    if (isLoggedIn) retrieveHistory()
  },[isLoggedIn])

  return (
    <div className="App">
      <Header />
      <LoginModal 
      handleLoggedInState={handleLoggedInState}
      isLoggedIn={isLoggedIn}/>
      <InputBar
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleUnitChange={handleUnitChange}
        currentLocation={currentLocation}
        units={units}
        isLoggedIn={isLoggedIn}/>
      <CurrentWeather
        weatherData= {weatherData}
        units = {units} />
    </div>
  );
}

export default App;
