import axios from "axios";

// TODO: Set up dotenv for apiKey

const URL = "https://api.openweathermap.org/data/2.5/weather?q="
const apiKey = "b442f7cbd3dba47d0df28083d882bce6"

export default async function getForecast(currentLocation, units) {
    try{
        const response = await axios.get(`${URL}${currentLocation}&units=${units}&appid=${apiKey}`);
        console.log("response: ", response) 
        return response
    }catch(error) {
        console.log(error)
        return []
    }
}