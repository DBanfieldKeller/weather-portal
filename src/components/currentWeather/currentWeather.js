import React from "react";
import "./style.css";

export default function CurrentWeather(props) {
    return (
        <div>
            <div className="currentweather">
                <h2>Current Weather</h2>
                <h3>{props.weatherData.cityName}</h3>
                <hr/>
                <div>
                    {props.weatherData.iconCode&&<img src={"http://openweathermap.org/img/wn/"+props.weatherData.iconCode+"@2x.png"} alt={props.weatherData.description}/>}
                </div>
                <p>Temp:{props.weatherData.temp}</p>
                <p>Wind Speed: {props.weatherData.wind}</p>
                <p>Humidity: {props.weatherData.humidity}</p>
            </div>
        </div>
    )
}