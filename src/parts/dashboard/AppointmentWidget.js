import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AppointmentWidget({appointmentID}) {
    const [appointment, setAppointment] = useState({});
    const [patientInfo, setPatientInfo] = useState(<div></div>);
    const [appointmentInfo, setAppointmentInfo] = useState(<div></div>);

    useEffect(() => {
        const url = `/api/rendezvous/search/${appointmentID}?mode=partial`;

        axios.get(url)
            .then(res => {
                setAppointment(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [appointmentID]);

    useEffect(() => {
        if(Object.keys(appointment).length > 0){
            setPatientInfo(
                <div className="col-md-5 card-body">
                    <div className="pro-widget-content">
                        <div className="profile-info-widget">
                            <div href="/" className="booking-doc-img">
                                <img src={require("../../assets/img/patients/patient.jpg").default} alt="User" />
                            </div>
                            <div className="profile-det-info">
                                <h3>{appointment.patient.nom} {appointment.patient.prenom}</h3>
                                
                                <div className="patient-details">
                                    <h5 className="mb-0"><i className="fas fa-map-marker-alt"></i> {appointment.patient.adresse}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="patient-info">
                        <ul>
                            <li>Email <span>{appointment.patient.username}</span></li>
                            <li>Phone <span>{appointment.patient.tel}</span></li>
                        </ul>
                    </div>
                </div>
            );
            
            setAppointmentInfo(
                <div className="col-md-7 card-body">
                    
                </div>
            );
        }
    }, [appointment])

    return (
        <div className="card widget-profile pat-widget-profile">
            <div className="row">
                {patientInfo}
                {appointmentInfo}
            </div>
        </div>
    )
}

export default AppointmentWidget;