import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import RegisterFormLoginInfo from './register/RegisterFormLoginInfo';
import RegisterFormPersonalInfo from './register/RegisterFormPersonalInfo';
import RegisterFormSocialMedia from './register/RegisterFormSocialMedia';
import RegisterFormEducation from './register/RegisterFormEducation';
import RegisterFormProfession from './register/RegisterFormProfession';
import moment from 'moment';
import RegisterFormSendingRequest from './register/RegisterFormSendingRequest';
import { validateRegisterFormEducation, validateRegisterFormLoginInfo, validateRegisterFormPersonalInfo, validateRegisterFormProfession, validateRegisterFormSocialMedia } from '../utils/validation';

const forms = [
    (props) => <RegisterFormLoginInfo {...props} />, 
    (props) => <RegisterFormPersonalInfo {...props} />, 
    (props) => <RegisterFormSocialMedia {...props} />, 
    (props) => <RegisterFormEducation {...props} />,
    (props) => <RegisterFormProfession {...props} />,
    (props) => <RegisterFormSendingRequest {...props} />
];

const validators = [
    validateRegisterFormLoginInfo, 
    validateRegisterFormPersonalInfo, 
    validateRegisterFormSocialMedia, 
    validateRegisterFormEducation,
    validateRegisterFormProfession 
]

function RegisterForm({setLoginForm, PushNotifRef}) {
    const history = useHistory();
    const formsCount = forms.length-1;
    const [currentForm, setCurrentForm] = useState(0);
    const [submitForm, setSubmitForm] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "0",
        phone: "",
        whatsapp: "",
        facebook: "",
        instagram: "",
        twitter: "",
        degree: "",
        university: "",
        graduationDate: "",
        specialty: "0",
        pricing: ""
    });
    
    let FormContent = forms[currentForm];

    const validateForm = () => {
        const validator = validators[currentForm];
        const validation = validator(formData);
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

    const onLeftClick = () => {
        setSubmitForm(false);
        setCurrentForm(state => state > 0 ? state-1 : state);
    }

    const onRightClick = () => {
        setSubmitForm(false);
        const validated = validateForm();
        if(!validated){
            return;
        }

        setCurrentForm(state => state < formsCount-1 ? state+1 : state);
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if(submitForm){
            const validated = validateForm();
            if(!validated){
                return;
            }
            
            setSubmitForm(false);
            const url = "/api/create/medecin";
            const data = {
                id: 0,
                prenom: formData.firstname,
                nom: formData.lastname,
                adresse: formData.address,
                tel: `+212 ${formData.phone}`,
                tarif: formData.pricing,
                // PhD in Dental Studies - University of San Diego (Feb 2016)
                diplome: `${formData.degree} - ${formData.university} (${moment(new Date(formData.graduationDate)).format("MMM YYYY")})`,
                idSpecialite: parseInt(formData.specialty),
                whatsapp: `+212 ${formData.whatsapp}`,
                facebook: `https://www.facebook.com/${formData.facebook}`,
                instagram: `https://www.instagram.com/${formData.instagram}`,
                twitter: `https://www.twitter.com/${formData.twitter}`,
                idVille: parseInt(formData.city),
                username: formData.username,
                password: formData.password
            };

            FormContent = forms[formsCount];
            setCurrentForm(formsCount);

            axios.post(url, data)
                .then(res => {
                    console.log(res);
                    setLoginForm(true);
                    PushNotifRef.current("Profile successfully created");
                })
                .catch(err => {
                    FormContent = forms[formsCount-1];
                    setCurrentForm(formsCount-1);
                });
        }
    }

    useEffect(() => {
        if($('.floating').length > 0 ){
            $('.floating').on('focus blur', function (e) {
                $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
            }).trigger('blur');
        }
    }, [currentForm])

    let formButtons = <div></div>;
    if(currentForm === 0){
        formButtons = <div className="form-row">
                            <div className="col">
                                <button className="btn btn-primary btn-block btn-lg login-btn" onClick={() => onRightClick()}><i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>;
    }else if(currentForm === (formsCount-1)){
        formButtons = <div className="form-row">
                            <div className="col">
                                <button className="btn btn-primary btn-block btn-lg login-btn" onClick={() => onLeftClick()}><i className="fas fa-arrow-left"></i></button>
                            </div>
                            <div className="col">
                                <button className="btn btn-primary btn-block btn-lg login-btn" onClick={() => setSubmitForm(true)}><span style={{fontSize: "15px"}}>Submit</span></button>
                            </div>
                        </div>;
    }else if(currentForm === formsCount) {
        formButtons = <div></div>;
    }else {
        formButtons = <div className="form-row">
                        <div className="col">
                            <button className="btn btn-primary btn-block btn-lg login-btn" onClick={() => onLeftClick()}><i className="fas fa-arrow-left"></i></button>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary btn-block btn-lg login-btn" onClick={() => onRightClick()}><i className="fas fa-arrow-right"></i></button>
                        </div>
                    </div>;
    }

    return (
        <div className="col-md-12 col-lg-6 login-right">
            <div className="login-header text-center">
                <h3>Register <span>Doccure</span></h3>
            </div>
            <form onSubmit={e => handleRegisterSubmit(e)} style={{overflow: "hidden"}} noValidate>
                <FormContent formData={formData} setFormData={setFormData} PushNotifRef={PushNotifRef} errorMessages={errorMessages} />
                {formButtons}
                <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                </div>
                <div className="text-center dont-have">Already have an account? <Link className="forgot-link" to="/login" onClick={() => setLoginForm(true)}>Login</Link></div>
            </form>
        </div>
      );
}

export default RegisterForm;