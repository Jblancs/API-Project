import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

function Calendar() {
  const [value, onChange] = useState([new Date(), new Date()]);
  console.log(value)

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
        <DateRangePicker onChange={onChange} value={value} rangeDivider="" className="calendar-component" />
    </div>
  );
}

export default Calendar
