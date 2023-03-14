import './App.css';
import Header from './components/header/header';
import CurrentWeather from './components/currentWeather/currentWeather';
import getForecast from './utils/weatherAPI';
import InputBar from './components/inputBar/inputBar';



function App() {

  getForecast({
    cityName: "Stamford",
    imperial: true
  })

  return (
    <div className="App">
      <Header />
      <InputBar />
      <CurrentWeather />
    </div>
  );
}

export default App;
