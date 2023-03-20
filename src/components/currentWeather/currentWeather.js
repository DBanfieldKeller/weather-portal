import React from "react";
import "./style.css";

export default function CurrentWeather(props) {
    return (
        <div>
            <div className="currentweather">
                <h2>Current Weather</h2>
                <h3>{props.weatherData.cityName}</h3>
                <hr/>
                <p>image</p>
                <p>Temp:{props.weatherData.temp}</p>
                <p>Wind Speed: {props.weatherData.wind}</p>
                <p>Humidity: {props.weatherData.humidity}</p>
            </div>
        </div>
    )
}