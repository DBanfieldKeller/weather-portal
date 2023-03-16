import React from "react";
import "./style.css";

export default function CurrentWeather(props) {
    return (
        <div>
            <div className="currentweather">
                <h2>Current Weather</h2>
                <h3>{props.weatherData.name}</h3>
                <hr/>
                <p>image</p>
                <p>Temp: {Math.round(props.weatherData.main?.temp)}°{props.isImperial?"F":"C"}</p>
                <p>Wind Speed: {Math.round(props.weatherData.wind?.speed)} {props.isImperial?"mph":"kph"??"Loading"}</p>
                <p>Humidity: {props.weatherData.main?.humidity??"Loading"}%</p>
            </div>
        </div>
    )
}