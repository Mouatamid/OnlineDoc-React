import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAxiosGet(url, token = "") {
    const [request, setRequest] = useState({
        loading: false,
        response: null,
        error: null
    });
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }

        setRequest({
            loading: true,
            data: null,
            error: null
        })
        
        axios.get(url, config)
            .then(response => {
                setRequest({
                    loading: false,
                    response,
                    error: null
                });
            })
            .catch(error => {
                setRequest({
                    loading: false,
                    response: null,
                    error
                })
            })
    }, [url]);

    return request;
}