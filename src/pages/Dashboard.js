import React, { useEffect, useState } from 'react'
import ProfileWidget from '../parts/dashboard/ProfileWidget';
import MenuWidget from '../parts/dashboard/MenuWidget';
import Breadcrumb from '../parts/Breadcrumb';
import axios from 'axios';

function Dashboard({setAuthenticated, PushNotifRef}) {
	const [dashboardContent, setDashboardContent] = useState(<div></div>);
	const [fetchDoctor, setFetchDoctor] = useState(true);
	const [doctor, setDoctor] = useState({});

	const url = "/api/login/current/medecin?mode=full";
	useEffect(() => {
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

    return (
        <div>
			<Breadcrumb title="Dashboard" />
			<div className="content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							<div className="profile-sidebar">
								<ProfileWidget doctor={doctor} />
								<MenuWidget doctor={doctor} setAuthenticated={setAuthenticated} setDashboardContent={setDashboardContent} />
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
