import React from 'react'

function CalendarInstructions({weekendsVisible, handleWeekendsToggle}) {
    return (
        <div className='calendar-instructions mb-3'>
            <div className='pt-3 pl-3' style={{paddingBottom: "0"}}>
                <h3>Instructions</h3>
                <ul>
                    <li>Select empty slots to create new sessions</li>
                    <li>Drag, drop, and resize events</li>
                    <li>Click an event to delete it after confirmation</li>
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

export default CalendarInstructions;