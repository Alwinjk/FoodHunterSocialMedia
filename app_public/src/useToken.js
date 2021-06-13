import { useState } from 'react';

export default function useToken() {
    

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log("Inside get token: " + userToken);
        if(userToken)
            return userToken;
        else
            return undefined;
    };

    const [ token, setToken ] = useState(getToken());
    
    console.log("Inside use Token: "+ token);
    const saveToken = (userToken) => {
        console.log("inside set token");
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}