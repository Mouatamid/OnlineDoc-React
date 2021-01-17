import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function UnauthenticatedRoute({children, ...rest}) {
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
            axios.post(url, null, config)
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
                const childrenWithProps = React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, props);
                    }
                    return child;
                });
                
                return auth === false ? childrenWithProps : <Redirect to={{pathname: "/dashboard"}} />;
            } } />
        )
    }
}

export default UnauthenticatedRoute;