import axios from "axios";

const URL = "https://ov0whl3p5b.execute-api.us-east-2.amazonaws.com/alpha/userdata/wghistory";

export async function getHistory(token) {
    let config ={
        headers: {
            token: token
        }
    };
    try{
        const response = await axios.get(`${URL}`, config);
        console.log("response: ", response);
        return response
    }catch(error) {
        console.log(error);
        return error
    };
    
};

export async function updateHistory(token, searchHistory) {
    let config = {
        headers: {
            token: token
        }
    };
    const newData = {newData: searchHistory};
    try{
        const response = await axios.put(`${URL}`, newData, config)
        console.log("history response: ", response)
        return {
            response: response,
            isTokenValid: true
        };
    }catch(error){
        console.log(error)
        return {
            response: error,
            isTokenValid: false
        }
    }
};