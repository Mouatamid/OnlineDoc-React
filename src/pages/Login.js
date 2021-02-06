import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginBanner from '../assets/img/login-banner.png';
import LoginForm from '../parts/LoginForm';
import RegisterForm from '../parts/RegisterForm';

function Login({location: {from}, setAuthenticated, PushNotifRef}) {
    const history = useHistory();
    const [loginForm, setLoginForm] = useState(true);

    let form = <form></form>;
    if(loginForm){
        form = <LoginForm history={history} fromLocation={from} setAuthenticated={setAuthenticated} setLoginForm={setLoginForm} PushNotifRef={PushNotifRef} />
    }else{
        form = <RegisterForm setLoginForm={setLoginForm} PushNotifRef={PushNotifRef} />
    }

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7 col-lg-6 login-left">
                                    <img src={LoginBanner} className="img-fluid" alt="Doccure Login" />	
                                </div>
                                {form}
                            </div>
                        </div>
                                                        
                    </div>
                </div>

            </div>
        </div>	
    )
}

export default Login;