import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import $ from "jquery";

export default function Header() {
	const [closeAction, setCloseAction] = useState(false);

	if(closeAction && document.getElementById("menu_close") != null){
		document.getElementById("menu_close").click();
		setCloseAction(false);
	}

	function subMenuClickHandler(e) {
		if($(window).width() <= 991){
			if($(e.target).parent().hasClass('has-submenu')) {
				e.nativeEvent.preventDefault();
			}
			if(!$(e.target).hasClass('submenu')) {
				$('ul', $(e.target).parents('ul:first')).slideUp(350);
				$('a', $(e.target).parents('ul:first')).removeClass('submenu');
				$(e.target).next('ul').slideDown(350);
				$(e.target).addClass('submenu');
			} else if($(e.target).hasClass('submenu')) {
				$(e.target).removeClass('submenu');
				$(e.target).next('ul').slideUp(350);
			}
		}
	}

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
						<img src={logo} className="img-fluid" alt="Logo" />
					</Link>
				</div>
				<div className="main-menu-wrapper">
					<div className="menu-header">
						<Link to="/" className="menu-logo" onClick={() => setCloseAction(true)}>
							<img src={logo} className="img-fluid" alt="Logo" />
						</Link>
						<Link id="menu_close" className="menu-close" to="#" onClick={() => setCloseAction(false)}>
							<i className="fas fa-times"></i>
						</Link>
					</div>
					<ul className="main-nav">
						<li>
							<Link to="/" onClick={() => setCloseAction(true)}>Home</Link>
						</li>
						<li>
							<Link to="/blank" onClick={() => setCloseAction(true)}>Blank</Link>
						</li>
						<li className="has-submenu">
							<Link to="#" onClick={(elm) => subMenuClickHandler(elm)}>Doctors <i className="fas fa-chevron-down"></i></Link>
							<ul className="submenu">
								<li><Link to="/doctor-dashboard" onClick={() => setCloseAction(true)}>Doctor Dashboard</Link></li>
								<li><Link to="/appointments" onClick={() => setCloseAction(true)}>Appointments</Link></li>
							</ul>
						</li>
						<li className="login-link">
							<Link to="/login">Login / Signup</Link>
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
