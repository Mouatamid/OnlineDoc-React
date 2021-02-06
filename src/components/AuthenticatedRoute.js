import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function AuthenticatedRoute({children, ...rest}) {
    const [auth, setAuth] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // send jwt to API to see if it's valid
        const token = localStorage.getItem("token");
        if (token) {
            const url = "/api/login/authenticated/medecin";
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };
            axios.get(url, config)
                .then(response => {
                    setAuth(true);
                })
                .catch(error => {
                    setAuth(false);
                    localStorage.removeItem("token");
                })
                .then(() => setCompleted(true));
        } else {
            setCompleted(true); // in case there is no token
        }
    }, [])
    
    if (!completed){
        return <div />;
    }else{
        return (
            <Route {...rest} render={(props) => {
                return auth === true ? children : <Redirect to={{pathname: "/login", from: props.location}} />;
            } } />
        )
    }
}

export default AuthenticatedRoute;