import axios from "axios";

const URL = "https://ov0whl3p5b.execute-api.us-east-2.amazonaws.com/alpha"


export default async function register(userInfo) {
    try{
        const response = await axios.post(`${URL}/register`, {
            name: userInfo.name,
            username: userInfo.username,
            password: userInfo.password,
            expiry: userInfo.expiry,
        });
        console.log("response: ", response)
        return {
            isError: false,
            response: response
        }
    }catch(error) {
        console.log(error)
        return {
            isError: true,
            response: error.response.data.message
        };
    }
};