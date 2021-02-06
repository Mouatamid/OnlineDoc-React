import axios from 'axios';
import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import moment from 'moment';

export default function StatisticsWidget() {
    const [totalPatients, setTotalPatients] = useState(0);
    const [todayPatients, setTodayPatients] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);
    let totalPatientsImg = <div></div>;

    const animateElements = () => {
		$('.circle-bar1').each((_,e) => {
			//var elementPos = $(e).offset().top;
			//var topOfWindow = $(window).scrollTop();
			var percent = $(e).find('.circle-graph1').attr('data-percent');
			//var animate = $(e).data('animate');
			//if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
            $(e).data('animate', true);
            $(e).find('.circle-graph1').circleProgress({
                value: percent / 100,
                size : 400,
                thickness: 30,
                fill: {
                    color: '#da3f81'
                }
            });
			//}
		});

		$('.circle-bar2').each((_,e) => {
			//var elementPos = $(e).offset().top;
			//var topOfWindow = $(window).scrollTop();
			var percent = $(e).find('.circle-graph2').attr('data-percent');
			//var animate = $(e).data('animate');
			//if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
            $(e).data('animate', true);
            $(e).find('.circle-graph2').circleProgress({
                value: percent / 100,
                size : 400,
                thickness: 30,
                fill: {
                    color: '#68dda9'
                }
            });
			//}
		});

		$('.circle-bar3').each((_,e) => {
			//var elementPos = $(e).offset().top;
			//var topOfWindow = $(window).scrollTop();
			var percent = $(e).find('.circle-graph3').attr('data-percent');
			//var animate = $(e).data('animate');
			//if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
            $(e).data('animate', true);
            $(e).find('.circle-graph3').circleProgress({
                value: percent / 100,
                size : 400,
                thickness: 30,
                fill: {
                    color: '#1b5a90'
                }
            });
			//}
		});
	}	

    useEffect(() => {
        const url_patients = "/api/patients/count";
        const url_patients_today = `/api/patients/count?date=${moment(Date.now()).format("yyyy-MM-DD")}`;
        const url_appointments = "/api/rendezvous/count";

        axios.get(url_appointments)
            .then(res => {
                setTotalAppointments(res.data.total);
            })
            .catch(err => {
                console.log(err);
            })
        
        axios.get(url_patients)
            .then(res => {
                setTotalPatients(res.data.total);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(url_patients_today)
            .then(res => {
                setTodayPatients(res.data.total);
            })
            .catch(err => {
                console.log(err);
            })

        if($('.circle-bar').length > 0) {
            animateElements();
        }
        $(window).scroll(animateElements);
    })

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card dash-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 col-lg-4">
                                <div className="dash-widget dct-border-rht">
                                    <div className="circle-bar circle-bar1"> 
                                        <div className="circle-graph1" data-percent={totalPatients === 0 ? 0 : 100}>
                                            <img src={require("../../assets/img/icon-01.png").default} className="img-fluid" alt="Patient" />
                                        </div>
                                    </div>
                                    <div className="dash-widget-info">
                                        <h6>Total Patient</h6>
                                        <h3>{totalPatients}</h3>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-12 col-lg-4">
                                <div className="dash-widget dct-border-rht">
                                    <div className="circle-bar circle-bar2">
                                        <div className="circle-graph2" data-percent={todayPatients*100 / (totalPatients === 0 ? 1 : totalPatients)}>
                                            <img src={require("../../assets/img/icon-02.png").default} className="img-fluid" alt="Patient" />
                                        </div>
                                    </div>
                                    <div className="dash-widget-info">
                                        <h6>Today Patient</h6>
                                        <h3>{todayPatients}</h3>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-12 col-lg-4">
                                <div className="dash-widget">
                                    <div className="circle-bar circle-bar3">
                                        <div className="circle-graph3" data-percent={totalAppointments === 0 ? 0 : 100}>
                                            <img src={require("../../assets/img/icon-03.png").default} className="img-fluid" alt="Patient" />
                                        </div>
                                    </div>
                                    <div className="dash-widget-info">
                                        <h6>Appoinments</h6>
                                        <h3>{totalAppointments}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
