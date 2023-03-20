import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/header/header';
import CurrentWeather from './components/currentWeather/currentWeather';
import InputBar from './components/inputBar/inputBar';
import getForecast from './utils/weatherAPI';
import formatOutput from './utils/formatOutput';


function App() {

  const [currentLocation, setCurrentLocation] = useState("New York");
  const [units, setUnits] = useState("imperial");
  const [weatherData, setWeatherData ] = useState({});

  const weatherFormat = (output, units) => {
    const formattedOutput = formatOutput(output, units);
    return (formattedOutput);
  }

  const weatherLookup = (currentLocation, units) => {
    getForecast(currentLocation, units)
    .then((res) =>setWeatherData(weatherFormat(res, units)))
    .catch((err)=>console.log(err));
    console.log(weatherData)
  }
  
  useEffect(() => {
    weatherLookup("New York", "imperial");
  }, []);

  const handleInputChange = (e) => setCurrentLocation(e.target.value);
  const handleUnitChange = (e) => {
    setUnits(e.target.value)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    weatherLookup(currentLocation, units)
    console.log(currentLocation, units)
  }

  return (
    <div className="App">
      <Header />
      <InputBar
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleUnitChange={handleUnitChange}
        currentLocation={currentLocation}
        units={units}/>
      <CurrentWeather
        weatherData= {weatherData}
        units = {units} />
    </div>
  );
}

export default App;
