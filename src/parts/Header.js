import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import AuthenticatedHeader from './header/AuthenticatedHeader';
import UnauthenticatedHeader from './header/UnauthenticatedHeader';

export default function Header({authenticated, setAuthenticated}) {
	const [auth, setAuth] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [closeAction, setCloseAction] = useState(false);
	const [subMenu, setSubMenu] = useState(null);

	useEffect(() => {
		if(closeAction && document.getElementById("menu_close") != null){
			
			document.getElementById("menu_close").click();

			if(subMenu != null && subMenu.hasClass('submenu')) {
				subMenu.removeClass('submenu');
				subMenu.next('ul').slideUp(350);
			}

			setCloseAction(false);
		}
	}, [closeAction, subMenu])

    useEffect(() => {
		setAuth(false);
		setCompleted(false);
        // send jwt to API to see if it's valid
        const token = localStorage.getItem("token");
        if (token) {
            const url = "/api/login/authenticated/medecin";
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };
            axios.get(url, config)
                .then(response => {
                    setAuth(true);
                })
                .catch(error => {
                    setAuth(false);
                    localStorage.removeItem("token");
                })
                .then(() => setCompleted(true));
        } else {
            setCompleted(true); // in case there is no token
        }
	}, [authenticated])
	
	const subMenuClickHandler = (e) => {
		if($(window).width() <= 991){
			if($(e.target).parent().hasClass('has-submenu')) {
				e.nativeEvent.preventDefault();
			}
			if(!$(e.target).hasClass('submenu')) {
				setSubMenu($(e.target));
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
    
    if (!completed){
        return (
			<header className="header">
				<nav className="navbar navbar-expand-lg header-nav">
					<div className="navbar-header">
						<Link id="mobile_btn" to="#">
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
							<Link to="/" className="menu-logo">
								<img src={logo} className="img-fluid" alt="Logo" />
							</Link>
							<Link id="menu_close" className="menu-close" to="#">
								<i className="fas fa-times"></i>
							</Link>
						</div>
					</div>
				</nav>
			</header>
		)
    }else{
		return (auth === true ? 
			<AuthenticatedHeader 
				subMenuClickHandler = {(e) => subMenuClickHandler(e)}
				setCloseAction = {(e) => setCloseAction(e)}
				setAuthenticated = {(e) => setAuthenticated(e)} /> : 
			<UnauthenticatedHeader 
				subMenuClickHandler = {(e) => subMenuClickHandler(e)}
				setCloseAction = {(e) => setCloseAction(e)} />);
	}
}
