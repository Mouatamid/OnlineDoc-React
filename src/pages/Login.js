import React, { useEffect } from 'react'
import $ from 'jquery';
import { Link, useHistory } from 'react-router-dom';
import LoginBanner from '../assets/img/login-banner.png';
import axios from 'axios';

function Login({location: {from}, setAuthenticated}) {
    const history = useHistory();

    useEffect(() => {
        if($('.floating').length > 0 ){
            $('.floating').on('focus blur', function (e) {
            $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
            }).trigger('blur');
        }
    })

    const HandleSubmit = (e) => {
        e.preventDefault();
        
        const url = "/api/login";
        const data = {
            username: e.target[0].value,
            password: e.target[1].value 
        }

        axios.post(url, data)
            .then(res => {
                localStorage.setItem("token", res.data.jwt);
                history.push(from?.pathname || '/');
                setAuthenticated(true);
            })
            .catch(err => {
                console.log(err);
            });
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
                                <div className="col-md-12 col-lg-6 login-right">
                                    <div className="login-header">
                                        <h3>Login <span>Doccure</span></h3>
                                    </div>
                                    <form onSubmit={(e) => HandleSubmit(e)}>
                                        <div className="form-group form-focus">
                                            <input type="email" className="form-control floating" />
                                            <label className="focus-label">Email</label>
                                        </div>
                                        <div className="form-group form-focus">
                                            <input type="password" className="form-control floating" />
                                            <label className="focus-label">Password</label>
                                        </div>
                                        <button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Login</button>
                                        <div className="login-or">
                                            <span className="or-line"></span>
                                            <span className="span-or">or</span>
                                        </div>
                                        <div className="text-center dont-have">Don’t have an account? <Link to="/register">Register</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                                                        
                    </div>
                </div>

            </div>
        </div>	
    )
}

export default Login;