import axios from "axios";

const URL = "https://ov0whl3p5b.execute-api.us-east-2.amazonaws.com/alpha"

export default async function login(userInfo) {
    try{
        const response = await axios.post(`${URL}/login`, {
            username: userInfo.username,
            password: userInfo.password,
            expiry: userInfo.expiry,
        });
        console.log("response: ", response)
        return {
            isError:false, 
            response: response
        };
    }catch(error) {
        console.log(error)
        console.log(error.response.data.message)
        return {
            isError: true,
            response: error.response.data.message
        };
    }
};

export async function verify(userInfo) {
    try{
        const response = await axios.get(`${URL}/verifytoken`, {
            token: userInfo.header.token,
        });
        console.log("response: ", response)
    }catch(error) {
        console.log(error)
        return [];
    }
}