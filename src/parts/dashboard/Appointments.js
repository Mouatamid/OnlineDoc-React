import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

function Appointments({doctor, showAppointmentDetails}) {
    const [tableHeight, setTableHeight] = useState(0);
    const [data, setData] = useState([])

    useEffect(() => {
        const height = document.getElementsByClassName("profile-sidebar")[0].clientHeight;
        setTableHeight(height-89);
    }, [])

    useEffect(() => {
        const url = "/api/rendezvous/search?mode=full";
        let updatedData = [];
        axios.get(url)
            .then(res => {
                res.data.forEach(rdv => {
                    updatedData.push({
                        id: rdv.id,
                        patientFirstname: rdv.patient.prenom,
                        patientLastname: rdv.patient.nom,
                        date: moment(rdv.date, "YYYY-MM-DD"),
                        startTime: moment(rdv.heure_debut, "HH:mm:ss").format("HH:mm"),
                        endTime: moment(rdv.heure_fin, "HH:mm:ss").format("HH:mm"),
                        type: rdv.en_ligne ? "Online" : "In cabinet",
                        amount: "400 DH"
                    });
                });
                
                setData(updatedData);
            })
            .catch(err => {
                console.log(err);
            })
    }, [doctor])

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="appointment-tab">
                
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                        <li className="nav-item">
                            <a className="nav-link active" href="/dashboard" data-target="#today-appointments" data-toggle="tab">Today</a>
                        </li> 
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard" data-target="#upcoming-appointments" data-toggle="tab">Upcoming</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard" data-target="#history-appointments" data-toggle="tab">History</a>
                        </li>
                    </ul>
                    
                    <div className="tab-content">
                        <div className="tab-pane show active" id="today-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive" style={{height: tableHeight}}>
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Patient Name</th>
                                                    <th style={{width: "120px"}}>Appt Date</th>
                                                    <th style={{width: "120px"}}>Appt Time</th>
                                                    <th style={{width: "100px"}}>Type</th>
                                                    <th style={{width: "10px"}}>Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.filter(appointment => appointment.date.isSame(moment().format("YYYY-MM-DD"))).map(appointment => {
                                                    return(
                                                        <tr key={appointment.id}>
                                                            <td>
                                                                <h2 className="table-avatar">
                                                                    <img className="avatar avatar-sm mr-2 avatar-img rounded-circle" src={require("../../assets/img/patients/patient6.jpg").default} alt="User" />
                                                                    {appointment.patientLastname} {appointment.patientFirstname}
                                                                </h2>
                                                            </td>
                                                            <td>{appointment.date.format("DD MMM YYYY")}</td>
                                                            <td>{appointment.startTime} - {appointment.endTime}</td>
                                                            <td>{appointment.type}</td>
                                                            <td>{appointment.amount}</td>
                                                            <td className="text-right">
                                                                <div className="table-action">
                                                                    <Link to="/dashboard" className="btn btn-sm bg-info-light" onClick={() => {showAppointmentDetails(appointment.id)}}>
                                                                        <i className="far fa-eye"></i> View
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

                        <div className="tab-pane" id="upcoming-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive" style={{height: tableHeight}}>
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Patient Name</th>
                                                    <th style={{width: "120px"}}>Appt Date</th>
                                                    <th style={{width: "120px"}}>Appt Time</th>
                                                    <th style={{width: "100px"}}>Type</th>
                                                    <th style={{width: "10px"}}>Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.filter(appointment => appointment.date.isAfter(moment().format("YYYY-MM-DD"))).map(appointment => {
                                                    return(
                                                        <tr key={appointment.id}>
                                                            <td>
                                                                <h2 className="table-avatar">
                                                                    <img className="avatar avatar-sm mr-2 avatar-img rounded-circle" src={require("../../assets/img/patients/patient6.jpg").default} alt="User" />
                                                                    {appointment.patientLastname} {appointment.patientFirstname}
                                                                </h2>
                                                            </td>
                                                            <td>{appointment.date.format("DD MMM YYYY")}</td>
                                                            <td>{appointment.startTime} - {appointment.endTime}</td>
                                                            <td>{appointment.type}</td>
                                                            <td>{appointment.amount}</td>
                                                            <td className="text-right">
                                                                <div className="table-action">
                                                                    <Link to="/dashboard" className="btn btn-sm bg-info-light" onClick={() => {showAppointmentDetails(appointment.id)}}>
                                                                        <i className="far fa-eye"></i> View
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
                        <div className="tab-pane" id="history-appointments">
                            <div className="card card-table mb-0">
                                <div className="card-body">
                                    <div className="table-responsive" style={{height: tableHeight}}>
                                        <table className="table table-hover table-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Patient Name</th>
                                                    <th style={{width: "120px"}}>Appt Date</th>
                                                    <th style={{width: "120px"}}>Appt Time</th>
                                                    <th style={{width: "100px"}}>Type</th>
                                                    <th style={{width: "10px"}}>Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.filter(appointment => appointment.date.isBefore(moment().format("YYYY-MM-DD"))).map(appointment => {
                                                    return(
                                                        <tr key={appointment.id}>
                                                            <td>
                                                                <h2 className="table-avatar">
                                                                    <img className="avatar avatar-sm mr-2 avatar-img rounded-circle" src={require("../../assets/img/patients/patient6.jpg").default} alt="User" />
                                                                    {appointment.patientLastname} {appointment.patientFirstname}
                                                                </h2>
                                                            </td>
                                                            <td>{appointment.date.format("DD MMM YYYY")}</td>
                                                            <td>{appointment.startTime} - {appointment.endTime}</td>
                                                            <td>{appointment.type}</td>
                                                            <td>{appointment.amount}</td>
                                                            <td className="text-right">
                                                                <div className="table-action">
                                                                    <Link to="/dashboard" className="btn btn-sm bg-info-light" onClick={() => {showAppointmentDetails(appointment.id)}}>
                                                                        <i className="far fa-eye"></i> View
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

export default Appointments;