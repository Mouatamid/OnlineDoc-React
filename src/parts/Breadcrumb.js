import React from 'react'

function Breadcrumb({title}) {
    return (
        <div className="breadcrumb-bar">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-12 col-12">
                        <h2 className="breadcrumb-title">{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;