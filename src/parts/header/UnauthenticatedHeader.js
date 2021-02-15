import React from 'react'
import { Link } from 'react-router-dom'

function UnauthenticatedHeader({setCloseAction}) {

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
					<ul className="main-nav">
						<li className="login-link">
							<Link to="/login" onClick={() => setCloseAction(true)}>Login / Signup</Link>
						</li>
					</ul>
				</div>
				<ul className="nav header-navbar-rht">
					<li className="nav-item">
						<Link className="nav-link header-login" to="/login">login | Signup </Link>
					</li>
				</ul>
			</nav>
		</header>
    )
}

export default UnauthenticatedHeader;