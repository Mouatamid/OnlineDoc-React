import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { validateLoginForm } from '../utils/validation';

function LoginForm({history, fromLocation, setAuthenticated, setLoginForm, PushNotifRef}) {
    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        if($('.floating').length > 0 ){
            $('.floating').on('focus blur', function (e) {
                $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
            }).trigger('blur');
        }
    }, [])

    const validateForm = (formData) => {
        const validation = validateLoginForm(formData);
        validation.filter(input => !input.invalid).forEach(input => document.getElementById(input.key).classList.remove("is-invalid"));
        const invalid = validation.filter(input => input.invalid);
        
        if(invalid.length !== 0){
            const errors = {};
            invalid.forEach(err => {
                document.getElementById(err.key).classList.add("is-invalid");
                errors[err.key] = err.message
            });
            setErrorMessages({
                ...errorMessages,
                ...errors
            })
            return false;
        }

        return true;
    }
    const HandleLoginSubmit = (e) => {
        e.preventDefault();
        document.getElementById("incorrect-login").classList.add("d-none");
        e.target[0].classList.remove("is-invalid");
        e.target[1].classList.remove("is-invalid");

        const data = {
            username: e.target[0].value,
            password: e.target[1].value 
        }
        
        const validated = validateForm(data);
        if(!validated){
            return;
        }
        
        const url = "/api/login";
        axios.post(url, data)
            .then(res => {
                localStorage.setItem("token", res.data.jwt);
                history.push(fromLocation?.pathname || '/dashboard');
                setAuthenticated(true);
                PushNotifRef.current("Welcome back!");
            })
            .catch(err => {
                document.getElementById("incorrect-login").classList.remove("d-none");
            });
    }

    return (
        <div className="col-md-12 col-lg-6 login-right">
            <div className="login-header text-center">
                <h3>Login <span>Doccure</span></h3>
            </div>
            <p className="text-center text-danger d-none" id="incorrect-login"><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Email or password incorrect</p>
            <form onSubmit={(e) => HandleLoginSubmit(e)} noValidate>
                <div className="form-group form-focus">
                    <input type="email" id="username" className="form-control floating" />
                    <label className="focus-label">Email</label>
                    <div className="invalid-feedback">
                        {errorMessages.username}
                    </div>
                </div>
                <div className="form-group form-focus">
                    <input type="password" id="password" className="form-control floating" />
                    <label className="focus-label">Password</label>
                    <div className="invalid-feedback">
                        {errorMessages.password}
                    </div>
                </div>
                <button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Login</button>
                <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                </div>
                <div className="text-center dont-have">Don’t have an account? <Link to="/login" onClick={() => setLoginForm(false)}>Register</Link></div>
            </form>
        </div>
    )
}

export default LoginForm;