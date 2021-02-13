import React from 'react'
import { Link, Route } from 'react-router-dom';

function Home() {
    return (
        <section className="section section-search">
            <div className="container-fluid">
                <div className="banner-wrapper">
                    <div className="banner-header text-center">
                        <h1>Manage Patients, Program your Schedule</h1>
                        <hr />
                        <p>Are you looking for top qualified Doctors ? Use our Android Application.</p>

                        <Link to={{ pathname: "https://www.google.com" }} target="_blank"><img src={require("../assets/img/google-play-badge.png").default} width="200px" style={{marginTop: "20px"}} /></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;
