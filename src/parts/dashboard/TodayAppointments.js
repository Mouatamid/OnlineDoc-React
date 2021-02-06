import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function TodayAppointments({doctor}) {
    const [data, setData] = useState([])

    useEffect(() => {
        let updatedData = [];
        if(doctor.rendezVous !== undefined){
            doctor.rendezVous.map(rdv => {
                updatedData.push({
                    id: rdv.id,
                    patientFirstname: rdv.patient.prenom,
                    patientLastname: rdv.patient.nom,
                    date: rdv.date,
                    startTime: rdv.heure_debut,
                    endTime: rdv.heure_fin,
                    type: rdv.en_ligne ? "Online" : "In cabinet",
                    amount: "400 DH"
                });
            });
        }
        setData(updatedData);
    }, [doctor])

    return (
        <div className="row">
            <div className="col-md-12">
                <h4 className="mb-4">Today's Appoinments</h4>
                <div className="appointment-tab">
                    
                    <div className="tab-content">
                        <div className="tab-pane active" id="today-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Patient Name</th>
                                                    <th>Appt Date</th>
                                                    <th>Type</th>
                                                    <th className="text-center">Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {data.map(appointment => {
                                                return(
                                                    <tr key={appointment.id}>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <Link to="patient-profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src={require("../../assets/img/patients/patient6.jpg").default} alt="User Image" /></Link>
                                                                <Link to="patient-profile.html">{appointment.patientLastname} {appointment.patientFirstname}</Link>
                                                            </h2>
                                                        </td>
                                                        <td>{appointment.date} <span className="d-block text-info">{appointment.startTime}</span></td>
                                                        <td>{appointment.type}</td>
                                                        <td className="text-center">{appointment.amount}</td>
                                                        <td className="text-right">
                                                            <div className="table-action">
                                                                <Link to="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                                    <i className="far fa-eye"></i> View
                                                                </Link>
                                                                <Link to="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                                    <i className="fas fa-times"></i> Cancel
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>		
                                    </div>	
                                </div>	
                            </div>	
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodayAppointments;