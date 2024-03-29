import axios from "axios";

const URL = "https://ov0whl3p5b.execute-api.us-east-2.amazonaws.com/alpha/userdata/wghistory";


// retrieve search history from API
export async function getHistory(token) {
    let config ={
        headers: {
            token: token
        }
    };
    try{
        const response = await axios.get(`${URL}`, config);
        return response
    }catch(error) {
        return error
    };
    
};

// update history on API
export async function updateHistory(token, searchHistory) {
    let config = {
        headers: {
            token: token
        }
    };
    const newData = {newData: searchHistory};
    try{
        const response = await axios.put(`${URL}`, newData, config)
        return {
            response: response,
            isTokenValid: true
        };
    }catch(error){
        return {
            response: error,
            isTokenValid: false
        }
    }
};