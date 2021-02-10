import React, { useEffect, useState } from 'react'
import ProfileWidget from '../parts/dashboard/ProfileWidget';
import MenuWidget from '../parts/dashboard/MenuWidget';
import Breadcrumb from '../parts/Breadcrumb';
import axios from 'axios';
import StatisticsWidget from '../parts/dashboard/StatisticsWidget';
import Appointments from '../parts/dashboard/Appointments';
import Calendar from '../parts/dashboard/calendar/Calendar';
import AppointmentWidget from '../parts/dashboard/AppointmentWidget';

function Dashboard({setAuthenticated, PushNotifRef, setModal}) {
	const [breadcrumbTitle, setBreadcrumbTitle] = useState("Dashboard");
	const [dashboardContent, setDashboardContent] = useState(<div></div>);
	const [fetchDoctor, setFetchDoctor] = useState(true);
	const [doctor, setDoctor] = useState({});
	const [currentMenuItem, setCurrentMenu] = useState("dashboard-menu-item");

	const showAppointmentDetails = (id) => {
		setDashboardContent(
			<div className="col-md-7 col-lg-8 col-xl-9">
				<AppointmentWidget appointmentID={id} />
			</div>
		)
	}

	const handleDashboardContentChange = (id) => {
        document.getElementById(currentMenuItem).classList.remove("active");
        document.getElementById(id).classList.add("active");
        setCurrentMenu(id);

        if(id === "dashboard-menu-item"){
			setBreadcrumbTitle("Dashboard");
            setDashboardContent(
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <StatisticsWidget />
                </div>);
        }

		if(id === "appointments-menu-item"){
			setBreadcrumbTitle("Dashboard > Appointments");
			setDashboardContent(
				<div className="col-md-7 col-lg-8 col-xl-9">
					<Appointments doctor={doctor} showAppointmentDetails={showAppointmentDetails} />
				</div>
			);
		}
        
        if(id === "schedule-sessions-menu-item"){
			setBreadcrumbTitle("Dashboard > Schedule Sessions");
            setDashboardContent(
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <Calendar PushNotifRef={PushNotifRef} setModal={setModal} />
                </div>
            )
        }
    }

	useEffect(() => {
		const url = "/api/login/current/medecin?mode=basic";
		if(fetchDoctor){
			axios.get(url)
				.then(res => {
					setDoctor(res.data);
				})
				.catch(err => {
					console.log(err);
				})
		}
		
		setFetchDoctor(false);
	}, [fetchDoctor])

	useEffect(() => {
        if(currentMenuItem === "dashboard-menu-item"){
            setDashboardContent(
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <StatisticsWidget />
                </div>);
        }
    }, [doctor])

    return (
        <div>
			<Breadcrumb title={breadcrumbTitle} />
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							<div className="profile-sidebar">
								<ProfileWidget doctor={doctor} />
								<MenuWidget handleMenuItemClick={handleDashboardContentChange} setAuthenticated={setAuthenticated} />
							</div>
						</div>
						{dashboardContent}
					</div>
				</div>
			</div>
		</div>
    )
}

export default Dashboard;
