import React, { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

function Calendar({setStartDate, setEndDate}) {
    const [value, setValue] = useState([]);

    useEffect(() => {
        if(value.length === 2){
            setStartDate(value[0])
            setEndDate(value[1])
        }
    }, [value])

    return (
    <div className='calendar-container'>
        <div className='calendar-text'>
            <div className='calendar-checkin'>
                CHECK-IN
            </div>
            <div>
                CHECK-OUT
            </div>
        </div>
        <DateRangePicker
            onChange={setValue}
            value={value}
            rangeDivider=""
            className="date-range-component"
            calendarClassName="calendar-component"
            clearIcon={null}
        />
    </div>
    );
    }

export default Calendar
