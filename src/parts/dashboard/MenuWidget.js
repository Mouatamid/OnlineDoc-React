import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import StatisticsWidget from './StatisticsWidget';
import TodayAppointments from './TodayAppointments';
import Calendar from './Calendar';

function MenuWidget({doctor, setAuthenticated, setDashboardContent}) {
    const [currentMenuItem, setCurrentMenu] = useState("dashboard-menu-item");
    const [currentSection, setCurrentSection] = useState();

    const logout = () => {
		localStorage.removeItem("token");
		setAuthenticated(false);
    }

    const handleMenuItemClick = (id) => {
        document.getElementById(currentMenuItem).classList.remove("active");
        document.getElementById(id).classList.add("active");
        setCurrentMenu(id);

        if(id === "dashboard-menu-item"){
            setCurrentSection(
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <StatisticsWidget />
                    <TodayAppointments doctor={doctor} />
                </div>);
        }
        
        if(id === "schedule-sessions-menu-item"){
            setCurrentSection(
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <Calendar />
                </div>
            )
        }
    }

    useEffect(() => {
        if(currentMenuItem === "dashboard-menu-item"){
            setCurrentSection(
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <StatisticsWidget />
                    <TodayAppointments doctor={doctor} />
                </div>);
        }
    }, [doctor])

    useEffect(() => {
        setDashboardContent(currentSection);
    }, [currentSection])
    
    return (
        <div className="dashboard-widget">
            <nav className="dashboard-menu">
                <ul>
                    <li id="dashboard-menu-item" className="active" onClick={() => handleMenuItemClick("dashboard-menu-item")}>
                        <Link to="/dashboard">
                            <i className="fas fa-columns"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="appointments.html">
                            <i className="fas fa-calendar-check"></i>
                            <span>Appointments</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="my-patients.html">
                            <i className="fas fa-user-injured"></i>
                            <span>My Patients</span>
                        </Link>
                    </li>
                    <li id="schedule-sessions-menu-item" onClick={() => handleMenuItemClick("schedule-sessions-menu-item")}>
                        <Link to="/dashboard">
                            <i className="fas fa-hourglass-start"></i>
                            <span>Schedule Sessions</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="invoices.html">
                            <i className="fas fa-file-invoice"></i>
                            <span>Invoices</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="reviews.html">
                            <i className="fas fa-star"></i>
                            <span>Reviews</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={() => logout()}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default  MenuWidget;