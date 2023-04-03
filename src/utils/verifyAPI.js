import axios from "axios";

const URL = "https://ov0whl3p5b.execute-api.us-east-2.amazonaws.com/alpha"

export default async function verify(token) {
    let config ={
        headers: {
            token: token
        }
    }
    try{
        const response = await axios.get(`${URL}/verifytoken`, config);
        console.log("response: ", response);
        return response
    }catch(error) {
        console.log(error)
        return [error];
    }
}