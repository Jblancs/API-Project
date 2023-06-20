import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

function CalendarComponent({ setStartDate, setEndDate, startDate, endDate, bookings }) {
    const [value, setValue] = useState([]);

    useEffect(() => {
        if (value.length === 2) {
            setStartDate(value[0])
            setEndDate(value[1])
        }
    }, [value])

    // create list of bookings if any --------------------------------------------------------------------
    let bookingList;
    if (bookings) {
        bookingList = Object.values(bookings)
    }

    // helper functions ----------------------------------------------------------------------------------
    const formatDisplayDate = (date) => {
        let day = (new Date(date)).getDate()
        let month = (new Date(date)).getMonth() + 1
        let year = (new Date(date)).getYear()

        return `${month} / ${day} / ${year}`
    }

    const tileDisabled = ({ date }) => {
        // Disable dates prior to tomorrow
        let pastDates = date <= new Date()

        // Disable dates within existing bookings
        if (bookingList.length > 0) {
            const isWithinRange = bookingList.some((range) => {
                let start = new Date(range.startDate)
                let end = new Date(range.endDate)
                return date >= start && date <= end;
            });

            return pastDates || isWithinRange;
        }
        return pastDates
    };



    // Component JSX --------------------------------------------------------------------------------------
    return (
        <div className='calendar-container'>
            <div className='calendar-check-container'>
                <div className='calendar-checkin-div'>
                    <div className='calendar-checkin-text bold'>
                        CHECK-IN
                    </div>
                    <input
                        className='booking-date-input'
                        type='text'
                        value={startDate ? formatDisplayDate(startDate) : ""}
                        placeholder="MM / DD / YYYY"
                        // onChange={startOnChange}
                        // onClick={onClickShowCalender}
                        // disabled={disableField}
                        readOnly
                    />
                </div>
                <div className='calendar-checkout-div'>
                    <div className='calendar-checkout-text bold'>
                        CHECK-OUT
                    </div>
                    <input
                        className='booking-date-input'
                        type='text'
                        value={endDate ? formatDisplayDate(endDate) : ""}
                        placeholder="MM / DD / YYYY"
                        // onChange={startOnChange}
                        // onClick={onClickShowCalender}
                        // disabled={disableField}
                        readOnly
                    />
                </div>
            </div>
            <div className='double-calendar-container'>
                <div className='calendar-check-container'>
                    <div className='calendar-checkin-div'>
                        <div className='double-calendar-checkin-text bold'>
                            CHECK-IN
                        </div>
                        <div className='booking-date-input-display'>
                            {startDate ? formatDisplayDate(startDate) : "MM / DD / YYYY"}
                        </div>
                    </div>
                    <div className='calendar-checkout-div'>
                        <div className='double-calendar-checkout-text bold'>
                            CHECK-OUT
                        </div>
                        <div className='booking-date-input-display'>
                            {endDate ? formatDisplayDate(endDate) : "MM / DD / YYYY"}
                        </div>
                    </div>
                </div>
                <div className='double-calendar-div'>
                    <div className='start-calendar-div'>
                        <Calendar
                            className='start-calendar'
                        />
                    </div>
                    <div className='end-calendar-div'>
                        <Calendar
                            className='end-calendar'
                        />
                    </div>
                </div>
            </div>
            {/* <DateRangePicker
                onChange={setValue}
                value={value}
                rangeDivider=""
                className="date-range-component"
                calendarClassName="calendar-component"
                clearIcon={null}
                tileDisabled={tileDisabled}
                /> */}
        </div>

    );
}

export default CalendarComponent
