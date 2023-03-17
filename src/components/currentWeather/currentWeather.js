import React from "react";
import "./style.css";

// TODO: Fix NaN rendering for split second

export default function CurrentWeather(props) {
    return (
        <div>
            <div className="currentweather">
                <h2>Current Weather</h2>
                <h3>{props.weatherData.name??"Loading"}</h3>
                <hr/>
                <p>image</p>
                <p>Temp: {Math.round(props.weatherData.main?.temp)}°{props.isImperial?"F":"C"}</p>
                <p>Wind Speed: {Math.round(props.weatherData.wind?.speed)} {props.isImperial?"mph":"m/s"??"Loading"}</p>
                <p>Humidity: {props.weatherData.main?.humidity??"Loading"}%</p>
            </div>
        </div>
    )
}