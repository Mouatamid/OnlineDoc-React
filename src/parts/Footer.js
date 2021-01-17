import React from 'react'
import logo from '../assets/img/footer-logo.png';

function Footer() {
    
    return (
        <footer className="footer">
            <div className="footer-bottom">
                <div className="container-fluid">
                    <div className="copyright">
                        <div className="row">
                            <div className="footer-logo col-sm-6 col-md-6 col-lg-6">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="copyright-text-container col-sm-6 col-md-6 col-lg-6">
                                <div className="copyright-text">
                                    <p className="mb-0">&copy; 2020 Doccure. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
