import axios from "axios";

const URL = "https://ov0whl3p5b.execute-api.us-east-2.amazonaws.com/alpha"


// login
export async function login(userInfo) {
    try{
        const response = await axios.post(`${URL}/login`, {
            username: userInfo.username,
            password: userInfo.password,
            expiry: userInfo.expiry,
        });
        console.log("response: ", response)
        return {
            isError: false, 
            token: response.data.token,
            username: response.data.login.username
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

// register
export async function register(userInfo) {
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

// verify token
export async function verify(token) {
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
        return error;
    }
}