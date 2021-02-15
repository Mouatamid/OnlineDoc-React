import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import createEventId from '../../../utils/sessions';
import axios from 'axios';
import moment from 'moment';
import { Tooltip } from 'bootstrap';
import CalendarInstructions from './CalendarInstructions';

function Calendar({PushNotifRef, setModal}) {
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const [fetchEvents, setFetchEvents] = useState(true);

    // customize session content
    const renderEventContent = (eventInfo) => {
        return (
            <div>
                <i style={{fontSize: "11px"}}>{eventInfo.event.title}{eventInfo.event.title.length === 0 ? "" : <br/>}</i>
                <b style={{fontSize: "10px"}}>{eventInfo.timeText}</b>
            </div>
        )
    }

    // valid dates range
    const validDatesRange = () => {
        const todayDOW = (parseInt(moment().format("e"))+6)%7; // 0(MON) - 6 (SUN)
        let actual = moment().subtract(todayDOW, "days");
        return {
            start: actual.format("YYYY-MM-DD"),
            end: actual.add(3, 'weeks').format("YYYY-MM-DD")
        }
    }

    // add tooltip to session on hover
    const handleEventDidMount = (eventInfo) => {;
        new Tooltip(eventInfo.el, {
            title: eventInfo.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body',
        })
    }

    // create new session
    const handleDateSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        const url = "/api/sessions/create";
        const data = {
            id: 0,
            weekday: (parseInt(moment(selectInfo.startStr).format("e"))+6)%7,
            heureDebut: moment.utc(selectInfo.startStr).format("HH:mm"),
            heureFin: moment.utc(selectInfo.endStr).format("HH:mm"),
            disponible: true
        }

        axios.post(url, data)
            .then(res => {
                setFetchEvents(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteSession = (clickInfo) => {
        const url = `/api/sessions/delete/${clickInfo.event.extendedProps.key}`
        axios.delete(url)
            .then(res => {
                clickInfo.event.remove()
                setFetchEvents(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    // delete session
    const handleEventClick = (clickInfo) => {
        setModal({
            id: "sessionControlModal", 
            title: "Delete Session", 
            body: <div className="modal-body">
                    Are you sure you want to delete this session ?
                </div>, 
            footer: <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deleteSession(clickInfo)}>Delete</button>
                    </div>
        })
        document.getElementById("modalBtnTrigger").click();
    }

    // update session
    const handleEventChange = (e) => {
        const url = "/api/sessions/update"
        const data = {
            id: e.event.extendedProps.key,
            weekday: (parseInt(moment(e.event._instance.range.start).format("e"))+6)%7,
            heureDebut: moment.utc(e.event._instance.range.start).format("HH:mm"),
            heureFin: moment.utc(e.event._instance.range.end).format("HH:mm"),
            disponible: true
        }
        
        axios.put(url, data, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
            .then(res => {
                setFetchEvents(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    // toggle weekends visibility
    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    }

    // mouse leave event handler
    const handleMouseLeaveEvent = (e) => {
        const elements = document.getElementsByClassName("tooltip");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    // select all sessions
    const fetchEventsFromDatabase = () => {
        const url = "/api/sessions/search?mode=full";
        axios.get(url)
            .then(res => {
                const todayDOW = (parseInt(moment().format("e"))+6)%7; // 0(MON) - 6 (SUN)
                let updated_events = [];
                res.data.forEach(session => {
                    let diffDOW = (todayDOW - session.weekday + 7)%7;
                    let actual = moment().subtract(diffDOW, "days");
                    let nbrWeeks = 3;
                    while(nbrWeeks-- > 0){
                        updated_events.push({
                            id: createEventId(),
                            key: session.id,
                            description: session.disponible ? "Some description" : "Inactive session", 
                            start: actual.format("YYYY-MM-DD") + `T${session.heureDebut}`,
                            end: actual.format("YYYY-MM-DD") + `T${session.heureFin}`,
                            backgroundColor: session.disponible ? "#58A8D7" : "#BACEDA"
                        });
                        actual.add(7, "days");
                    }
                });

                setEvents(updated_events);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        if(fetchEvents){
            setFetchEvents(false);
            fetchEventsFromDatabase();
        }
    }, [fetchEvents]);

    return (
        <div>
            <CalendarInstructions weekendsVisible={weekendsVisible} handleWeekendsToggle={handleWeekendsToggle} />
            <FullCalendar 
                plugins={[ momentTimezonePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                timeZone="UTC"
                initialView="timeGridWeek"
                allDaySlot={false}
                selectMirror={false}
                firstDay={1}
                weekends={weekendsVisible}
                events={events}
                editable={true}
                selectable={true}
                select={handleDateSelect}
                eventContent={renderEventContent}
                validRange={validDatesRange}
                eventDidMount={handleEventDidMount}
                eventClick={handleEventClick}
                eventChange={handleEventChange}
                eventColor="#BACEDA"
                eventMouseLeave={handleMouseLeaveEvent}
            />
            <button
                id="modalBtnTrigger"
                style={{display: "none"}}
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target={`#sessionControlModal`}>
                Launch demo modal
            </button>
        </div>
    )
}

export default Calendar;