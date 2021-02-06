import React, { useEffect, useState } from 'react'

function RegisterFormSocialMedia({formData, setFormData, errorMessages}) {
    const [localFormData, setLocalFormData] = useState({
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        instagram: formData.instagram,
        twitter: formData.twitter
    })

    const handleOnChange = (attr, e) => {
        let update;
        if(attr === "whatsapp"){
            update = {
                whatsapp: e.target.value
            }
        }else if(attr === "facebook"){
            update = {
                facebook: e.target.value
            }
        }else if(attr === "instagram"){
            update = {
                instagram: e.target.value
            }
        }else if(attr === "twitter"){
            update = {
                twitter: e.target.value
            }
        }

        setLocalFormData({
            ...localFormData,
            ...update
        })
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
            <h5 className="mb-3">Social Media</h5>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text" >+212</div>
                </div>
                <input type="text" id="whatsapp" className="form-control floating" value={localFormData.whatsapp} onChange={(e) => handleOnChange("whatsapp", e)} placeholder="Whatsapp" />
                <div className="invalid-feedback">
                    {errorMessages.whatsapp}
                </div>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">Facebook.com/</div>
                </div>
                <input type="text" className="form-control floating" value={localFormData.facebook} onChange={(e) => handleOnChange("facebook", e)} placeholder="Username" />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">Instagram.com/</div>
                </div>
                <input type="text" className="form-control floating" value={localFormData.instagram} onChange={(e) => handleOnChange("instagram", e)} placeholder="Username" />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">Twitter.com/</div>
                </div>
                <input type="text" className="form-control floating" value={localFormData.twitter} onChange={(e) => handleOnChange("twitter", e)} placeholder="Username" />
            </div>
        </div>
    )
}

export default RegisterFormSocialMedia;