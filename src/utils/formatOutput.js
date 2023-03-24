export default function formatOutput(response, units) {
    const tempData = response.data.main.temp;
    const windData = response.data.wind.speed;
    const humidityData = response.data.main.humidity;
    const iconCode = response.data.weather[0].icon;
    const description = response.data.weather[0].description;
    
    
    let tempUnit
    let windUnit
    if(units==="imperial") {
        tempUnit = "°F";
        windUnit = "mph";
    }else {
        tempUnit = "°C";
        windUnit = "m/s";
    };

    let temp
    if(tempData){
        temp = Math.round(tempData)+tempUnit;
    }else{
        temp = ""
    };

    let wind
    if(windData) {
        wind = Math.round(windData)+windUnit;
    }else{
        wind = ""
    };

    let humidity
    if(humidityData) {
        humidity = humidityData+"%";
    }else{
        humidity = ""
    }

    const formattedOutput = {
        cityName: response.data.name||"loading",
        temp: temp,
        wind: wind,
        humidity: humidity,
        iconCode: iconCode||"",
        description: description
    };

    return ( formattedOutput)
};