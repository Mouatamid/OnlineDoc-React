import React from 'react'
import { Link } from 'react-router-dom';

function MenuWidget({handleMenuItemClick, setAuthenticated}) {
    const logout = () => {
		localStorage.removeItem("token");
		setAuthenticated(false);
    }
    
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
                    <li id="appointments-menu-item" onClick={() => handleMenuItemClick("appointments-menu-item")}>
                        <Link to="/dashboard">
                            <i className="fas fa-calendar-check"></i>
                            <span>Appointments</span>
                        </Link>
                    </li>
                    <li id="schedule-sessions-menu-item" onClick={() => handleMenuItemClick("schedule-sessions-menu-item")}>
                        <Link to="/dashboard">
                            <i className="fas fa-hourglass-start"></i>
                            <span>Schedule Sessions</span>
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