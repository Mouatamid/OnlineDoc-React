import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import createEventId from '../../utils/sessions';

function Calendar() {
    const [events, setEvents] = useState([
        {
            id: createEventId(),
            title: 'All-day event',
            start: new Date().toISOString().replace(/T.*$/, '')
        },
        {
            id: createEventId(),
            title: 'Timed event',
            start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
        }
    ]);
    
    const [weekendsVisible, setWeekendsVisible] = useState(true);

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
    
        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    const renderEventContent = (eventInfo) => {
        return (
            <div>
                <i style={{fontSize: "11px"}}>{eventInfo.event.title}</i>
                <br />
                <b style={{fontSize: "10px"}}>{eventInfo.timeText}</b>
            </div>
        )
    }

    const handleEventClick = (clickInfo) => {
        const confirmed = window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`);
        if (confirmed) {
            clickInfo.event.remove()
        }
    }

    const handleEventAdd = (e) => {
        console.log(e);
    }

    const handleEventRemove = (e) => {
        console.log(e);
    }

    const handleEventChange = (e) => {
        console.log(e);
    }

    const handleEventMouseEnter = (e) => {
        console.log(e);
    }

    const handleEventMouseLeave = (e) => {
        console.log(e);
    }

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    }

    const renderSidebar = () => {
        return (
            <div className='calendar-instructions mb-3'>
                <div className='pt-3 pl-3' style={{paddingBottom: "0"}}>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='pb-3 pl-3' style={{paddingTop: "0"}}>
                    <div className='custom-control custom-switch'>
                        <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customSwitches'
                            checked={weekendsVisible}
                            onChange={handleWeekendsToggle}
                        />
                        <label className='custom-control-label' htmlFor='customSwitches'>
                        Toggle weekends
                        </label>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderSidebar()}
            <FullCalendar 
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                initialView="timeGridWeek"
                weekends={weekendsVisible}
                events={events}
                editable={true}
                selectable={true}
                select={handleDateSelect}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                eventMouseEnter={handleEventMouseEnter}
                eventMouseLeave={handleEventMouseLeave}
                eventAdd={handleEventAdd}
                eventChange={handleEventChange}
                eventRemove={handleEventRemove}
            />
        </div>
    )
}

export default Calendar;