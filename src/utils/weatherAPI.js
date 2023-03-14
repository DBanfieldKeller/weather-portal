import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/forecast?q="
const apiKey = "b442f7cbd3dba47d0df28083d882bce6"

export default async function getForecast(request) {
    try{
        const units = request.imperial?"imperial":"metric"

        const response = await axios.get(`${URL}${request.cityName}&units=${units}&appid=${apiKey}`);
        console.log("response: ", response)
    }catch(error) {
        console.log(error)
        return []
    }
}