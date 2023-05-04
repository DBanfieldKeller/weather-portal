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
        return {
            isError: false, 
            token: response.data.token,
            username: response.data.login.username
        };
    }catch(error) {
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
        return {
            isError: false,
            response: response
        }
    }catch(error) {
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
        return response
    }catch(error) {
        return error;
    }
}