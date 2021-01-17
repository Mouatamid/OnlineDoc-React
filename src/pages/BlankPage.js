import React from 'react'
import Breadcrumb from '../parts/Breadcrumb'

function BlankPage() {
    return (
        <div>
            <Breadcrumb title="Blank Page"/>
            <div className="content" style={{height: "1000px"}}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<h5>Blank Page</h5>
						</div>
					</div>
				</div>
			</div>
        </div>
    )
}

export default BlankPage;
