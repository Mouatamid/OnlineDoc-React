import React from 'react'
import { withRouter } from 'react-router-dom';

function Dashboard() {

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h5>Dashboard</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Dashboard);
