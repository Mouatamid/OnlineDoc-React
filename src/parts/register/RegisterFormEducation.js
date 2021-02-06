import React, { useEffect, useState } from 'react'

function RegisterFormEducation({formData, setFormData, errorMessages}) {
    const [localFormData, setLocalFormData] = useState({
        degree: formData.degree,
        university: formData.university,
        graduationDate: formData.graduationDate
    });

    const handleOnChange = (attr, e) => {
        let update;
        if(attr === "degree"){
            update = {
                degree: e.target.value
            }
        }else if(attr === "university"){
            update = {
                university: e.target.value
            }
        }else if(attr === "graduationDate"){
            update = {
                graduationDate: e.target.value
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
            <h5 className="mb-3">Education</h5>
            <div className="form-group form-focus">
                <input type="text" id="degree" className="form-control floating" value={localFormData.degree} onChange={(e) => handleOnChange("degree", e)} />
                <label className="focus-label">Degree</label>
                <div className="invalid-feedback">
                    {errorMessages.degree}
                </div>
            </div>
            <div className="form-group form-focus">
                <input type="text" id="university" className="form-control floating" value={localFormData.university} onChange={(e) => handleOnChange("university", e)} />
                <label className="focus-label">University</label>
                <div className="invalid-feedback">
                    {errorMessages.university}
                </div>
            </div>
            <div className="form-group">
                <input type="date" id="graduationDate" className="form-control floating" value={localFormData.graduationDate} onChange={(e) => handleOnChange("graduationDate", e)} />
                <div className="invalid-feedback">
                    {errorMessages.graduationDate}
                </div>
            </div>
        </div>
    )
}

export default  RegisterFormEducation;