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
    })
    .then((res) => setWeatherData(res.data));
  
  useEffect(() => {
    weatherLookup(currentLocation, isImperial);
  }, []);

  const handleInputChange = (e) => setCurrentLocation(e.target.value);
  const handleRadioChange = (e) => setIsImperial(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    weatherLookup(currentLocation, isImperial)
  }

  return (
    <div className="App">
      <Header />
      <InputBar
        value={""}/>
      <CurrentWeather
        weatherData= {weatherData}
        isImperial = {isImperial} />
    </div>
  );
}

export default App;
