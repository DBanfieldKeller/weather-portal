import './App.css';
import Header from './components/header/header';
import CurrentWeather from './components/currentWeather/currentWeather';
import getForecast from './utils/weatherAPI';



function App() {

  getForecast({
    cityName: "Stamford",
    imperial: true
  })

  return (
    <div className="App">
      <Header />
      <CurrentWeather />
    </div>
  );
}

export default App;
