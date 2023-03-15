import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/header/header';
import CurrentWeather from './components/currentWeather/currentWeather';
import getForecast from './utils/weatherAPI';
import InputBar from './components/inputBar/inputBar';
import userEvent from '@testing-library/user-event';


function App() {

  const [currentLocation, setCurrentLocation] = useState("New York");
  const [isImperial, setIsImperial] = useState(true);
  const [weatherData, setWeatherData ] = useState({});

  const weatherLookup = (location, unitValue) =>
    getForecast({
      cityName: location,
      isImperial: unitValue
    });
  
  useEffect(() => {
    weatherLookup(currentLocation,isImperial);
  }, [])

  // getForecast({
  //   cityName: "Stamford",
  //   imperial: true
  // })

  return (
    <div className="App">
      <Header />
      <InputBar
        value={""}/>
      <CurrentWeather
        weatherData= {weatherData} />
    </div>
  );
}

export default App;
