import React from "react";
import "./style.css";

export default function CurrentWeather(props) {
    return (
        <div>
            <div className="currentweather">
                <h2>Current Weather</h2>
                <h3>Stamford, CT</h3>
                <hr/>
                <p>image</p>
                <p>{props.weatherData.main.temp}°{props.isImperial?"F":"C"}</p>
                <p>Wind Speed</p>
                <p>Humidity</p>
            </div>
        </div>
    )
}