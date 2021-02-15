import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisterFormProfession({formData, setFormData, errorMessages}) {
    const [specialties, setSpecialties] = useState([]);
    const [fetchSpecialties, setFetchSpecialties] = useState(true);
    const [localFormData, setLocalFormData] = useState({
        specialty: formData.specialty,
        pricing: formData.pricing
    })

    useEffect(() => {
        if(fetchSpecialties){
            const url = "/api/specialites?mode=basic";
            axios.get(url)
                .then(res => {
                    setSpecialties(res.data.map(spec => {
                        return {
                            id: spec.id,
                            title: spec.titre
                        };
                    }))
                })
                .catch(err => {
                    console.log(err);
                });
        }
        return () => {
            setFetchSpecialties(false);
        }
    })

    const handleOnChange = (attr, e) => {
        let update;
        if(attr === "specialty"){
            update = {
                specialty: e.target.value
            }
        }else if(attr === "pricing"){
            update = {
                pricing: e.target.value
            }
        }
        
        setLocalFormData({
            ...localFormData,
            ...update
        });
    }

    useEffect(() => {
        document.getElementById("specialty").value = localFormData.specialty;
        setFormData({
            ...formData,
            ...localFormData
        })
    }, [localFormData])

    return (
        <div>
            <span className="or-line mb-3"></span>
            <h5 className="mb-3">Profession</h5>
            <div className="form-group">
                <select className="form-control" id="specialty" onChange={(e) => handleOnChange("specialty", e)}>
                    <option value="0">-- Specialty --</option>
                    {specialties.sort((a,b) => a.title.localeCompare(b.title)).map(spec => <option key={spec.id} value={spec.id}>{spec.title.charAt(0).toUpperCase() + spec.title.slice(1)}</option>)}
                </select>
                <div className="invalid-feedback">
                    {errorMessages.specialty}
                </div>
            </div>
            <h6 style={{fontSize: "11px"}}>* Price of online sessions only</h6>
            <div className="form-group form-focus">
                <input type="number" id="pricing" className="form-control floating" value={localFormData.pricing} onChange={(e) => handleOnChange("pricing", e)} />
                <label className="focus-label">DH/Hour</label>
                <div className="invalid-feedback">
                    {errorMessages.pricing}
                </div>
            </div>
        </div>
    )
}

export default RegisterFormProfession;