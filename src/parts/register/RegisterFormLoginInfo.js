import React, { useEffect, useState } from 'react'

function RegisterFormLoginInfo({formData, setFormData, errorMessages}) {
    
    const [localFormData, setLocalFormData] = useState({
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword
    });

    const handleChange = (attr, e) => {
        let update;
        if(attr === "username"){
            update = {
                username: e.target.value
            }
        }else if(attr === "password"){
            update = {
                password: e.target.value
            }
        }else if(attr === "confirmPassword"){
            update = {
                confirmPassword: e.target.value
            }
        }

        setLocalFormData({
            ...localFormData,
            ...update
        });
    }

    useEffect(() => {
        setFormData({
            ...formData,
            ...localFormData
        })
    }, [localFormData])

    return (
        <div>
            <span className="or-line mb-3"></span>
            <h5 className="mb-3">User Credentials</h5>
            <div className="form-group form-focus">
                <input type="email" id="username" className="form-control floating" value={localFormData.username} onChange={(e) => handleChange("username", e)}/>
                <label className="focus-label">Email</label>
                <div className="invalid-feedback pb-2">
                    {errorMessages.username}
                </div>
            </div>
            <div className="form-group form-focus">
                <input type="password" id="password" className="form-control floating" value={localFormData.password} onChange={(e) => handleChange("password", e)}/>
                <label className="focus-label">Password</label>
                <div className="invalid-feedback">
                    {errorMessages.password}
                </div>
            </div>
            <div className="form-group form-focus">
                <input type="password" id="confirmPassword" className="form-control floating" value={localFormData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e)}/>
                <label className="focus-label">Confirm Password</label>
                <div className="invalid-feedback">
                    {errorMessages.confirmPassword}
                </div>
            </div>
        </div>
    )
}

export default RegisterFormLoginInfo;