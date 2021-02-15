import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ProfileWidget({doctor}) {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        degree: ""
    });

    useEffect(() => {
        setData({
            firstname: doctor.prenom,
            lastname: doctor.nom,
            degree: doctor.diplome
        })
    }, [doctor])

    return (
        <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
                <Link to="#" className="booking-doc-img">
                    <img src={require("../../assets/img/user.png").default} alt="User" />
                </Link>
                <div className="profile-det-info">
                    <h3>Dr. {data.lastname} {data.firstname}</h3>
                    
                    <div>
                        <h5 className="mb-0" style={{fontWeight: "normal", fontSize: "13px", color: "#757575"}}>{data.degree}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileWidget;