import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AuthenticatedHeader({subMenuClickHandler, setCloseAction, setAuthenticated}) {
	const [logoutClick, setLogoutClick] = useState(false);
	
	useEffect(() => {
		if(logoutClick){
			localStorage.removeItem("token");
			setAuthenticated(false);
		}
	}, [logoutClick, setAuthenticated])
    
    return (
        <header className="header">
			<nav className="navbar navbar-expand-lg header-nav">
				<div className="navbar-header">
					<Link id="mobile_btn" to="#" onClick={() => setCloseAction(false)}>
						<span className="bar-icon">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</Link>
					<Link to="/" className="navbar-brand logo">
						<span style={{fontSize: "40px", fontWeight: "bold", color: "#15558d"}}>OnlineDoc</span>
					</Link>
				</div>
				<div className="main-menu-wrapper">
					<div className="menu-header">
						<Link to="/" className="menu-logo" onClick={() => setCloseAction(true)}>
							<span style={{fontSize: "40px", fontWeight: "bold", color: "#15558d"}}>OnlineDoc</span>
						</Link>
						<Link id="menu_close" className="menu-close" to="#" onClick={() => setCloseAction(false)}>
							<i className="fas fa-times"></i>
						</Link>
					</div>
				</div>
				<ul className="nav header-navbar-rht">
					<li className="nav-item dropdown has-arrow logged-item">
						<Link to="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
							<span className="user-img">
								<img className="rounded-circle" src={require("../../assets/img/user.png").default} width="31" alt="Darren Elder" />
							</span>
						</Link>
						<div className="dropdown-menu dropdown-menu-right">
							<div className="user-header">
								<div className="avatar avatar-sm">
									<img src={require("../../assets/img/user.png").default} alt="Doctor" className="avatar-img rounded-circle" />
								</div>
								<div className="user-text">
									<h6>Darren Elder</h6>
									<p className="text-muted mb-0">Doctor</p>
								</div>
							</div>
							<Link className="dropdown-item" to="/dashboard">Dashboard</Link>
							<Link className="dropdown-item" to="/login" onClick={() => setLogoutClick(true)}>Logout</Link>
						</div>
					</li>						
				</ul>
			</nav>
		</header>
    )
}

export default AuthenticatedHeader;