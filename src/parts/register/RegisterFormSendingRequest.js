import React from 'react'
import Loader from 'react-loader-spinner';

function RegisterFormSendingRequest() {
    
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "200px"}}>
            <Loader type="Circles" color="#036BEE" height={80} width={80} />
        </div>
    )
}

export default RegisterFormSendingRequest;