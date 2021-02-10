import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisterFormPersonalInfo({formData, setFormData, errorMessages}) {
    const [cities, setCities] = useState([]);
    const [fetchCities, setFetchCities] = useState(true);
    const [localFormData, setLocalFormData] = useState({
        firstname: formData.firstname,
        lastname: formData.lastname,
        address: formData.address,
        city: formData.city,
        phone: formData.phone
    });

    useEffect(() => {
        if(fetchCities){
            const url = "/api/villes?mode=basic"
            axios.get(url)
                .then(res => {
                    setCities(res.data.map(city => {
                        return {
                            id: city.id,
                            name: city.nom
                        };
                    }));
                })
                .catch(err => {
                    console.log(err);
                });
        }

        return () => {
            setFetchCities(false);
        }
    })

    const handleOnChange = (attr, e) => {
        let update;
        if(attr === "firstname"){
            update = {
                firstname: e.target.value
            }
        }else if(attr === "lastname"){
            update = {
                lastname: e.target.value
            }
        }else if(attr === "address"){
            update = {
                address: e.target.value
            }
        }else if(attr === "city"){
            update = {
                city: e.target.value
            }
        }else if(attr === "phone"){
            update = {
                phone: e.target.value
            }
        }

        setLocalFormData({
            ...localFormData,
            ...update
        })
    }

    useEffect(() => {
        document.getElementById("city").value = localFormData.city;
        setFormData({
            ...formData,
            ...localFormData
        })
    }, [localFormData])

    return (
        <div>
            <span className="or-line mb-3"></span>
            <h5 className="mb-3">General Information</h5>
            <div className="form-group form-focus">
                <input type="text" id="firstname" className="form-control floating" value={localFormData.firstname} onChange={(e) => handleOnChange("firstname", e)} />
                <label className="focus-label">Firstname</label>
                <div className="invalid-feedback">
                    {errorMessages.firstname}
                </div>
            </div>
            <div className="form-group form-focus">
                <input type="text" id="lastname" className="form-control floating" value={localFormData.lastname} onChange={(e) => handleOnChange("lastname", e)} />
                <label className="focus-label">Lastname</label>
                <div className="invalid-feedback">
                    {errorMessages.lastname}
                </div>
            </div>
            <div className="form-group form-focus">
                <input type="text" id="address" className="form-control floating" value={localFormData.address} onChange={(e) => handleOnChange("address", e)} />
                <label className="focus-label">Address</label>
                <div className="invalid-feedback">
                    {errorMessages.address}
                </div>
            </div>
            <div className="form-group">
                <select className="form-control" id="city" onChange={(e) => handleOnChange("city", e)}>
                    <option value="0">-- City --</option>
                    {cities.sort((a,b) => a.name.localeCompare(b.name)).map(city => <option key={city.id} value={city.id}>{city.name.charAt(0).toUpperCase() + city.name.slice(1)}</option>)}
                </select>
                <div className="invalid-feedback">
                    {errorMessages.city}
                </div>
            </div>
            <div className="form-group">
                <select className="form-control" disabled defaultValue="1">
                    <option value="1">Morocco</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text" >+212</div>
                </div>
                <input type="text" id="phone" className="form-control floating" value={localFormData.phone} onChange={(e) => handleOnChange("phone", e)} placeholder="Phone Number" />
                <div className="invalid-feedback">
                    {errorMessages.phone}
                </div>
            </div>
        </div>
    )
}

export default RegisterFormPersonalInfo;