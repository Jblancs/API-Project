import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';

function CalendarComponent({ setStartDate, setEndDate, startDate, endDate, bookings }) {
    const calendarRef = useRef();
    const [value, setValue] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        if (value.length === 2) {
            setStartDate(value[0])
            setEndDate(value[1])
        }
    }, [value])

    // calendar Ref useEffect ----------------------------------------------------------------------------
    useEffect(() => {
        if (!showCalendar) return;

        const closeMenu = (e) => {
            if (!calendarRef.current.contains(e.target)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showCalendar]);

    // create list of bookings if any --------------------------------------------------------------------
    let bookingList;
    if (bookings) {
        bookingList = Object.values(bookings)
    }

    // helper functions ----------------------------------------------------------------------------------
    const formatDisplayDate = (date) => {
        let day = (new Date(date)).getDate()
        let month = (new Date(date)).getMonth() + 1
        let year = (new Date(date)).getFullYear()

        return `${month} / ${day} / ${year}`
    }

    // Disable dates based on bookings and start/end date ------------------------------------------------

    const tileDisabledStart = ({ date }) => {
        // Disable dates prior to tomorrow
        let pastDates = date <= new Date()

        // Disable dates within existing bookings
        let isWithinRange;
        if (bookingList.length > 0) {
            isWithinRange = bookingList.some((range) => {
                let start = new Date(range.startDate)
                let end = new Date(range.endDate)
                return date >= start && date <= end;
            });
        }

        // disable dates based on start/end dates
        let basedOnDatePick;
        if(endDate){
            basedOnDatePick = date >= endDate
        }

        return pastDates || isWithinRange;
    };

    const tileDisabledEnd = ({ date }) => {
        // Disable dates prior to tomorrow
        let pastDates = date <= new Date()

        // Disable dates within existing bookings
        let isWithinRange;
        if (bookingList.length > 0) {
            isWithinRange = bookingList.some((range) => {
                let start = new Date(range.startDate)
                let end = new Date(range.endDate)
                return date >= start && date <= end;
            });
        }

        // disable dates based on start/end dates
        let basedOnDatePick;
        if(startDate){
            basedOnDatePick = date <= startDate
        }

        return pastDates || isWithinRange || basedOnDatePick
    };

    // Event Handler --------------------------------------------------------------------------------------
    const showCalendarClick = () => {
        setShowCalendar(!showCalendar)
    }

    // Double Calendar Display ----------------------------------------------------------------------------
    let calendarDisplay;
    if (showCalendar) {
        calendarDisplay = (
            <div className='double-calendar-container' ref={calendarRef}>
                <div className='calendar-check-container'>
                    <div className='double-calendar-checkin-div'>
                        <div className="double-calendar-text-div">
                            <div className='double-calendar-checkin-text bold'>
                                CHECK-IN
                            </div>
                            <div className='booking-date-input-display'>
                                {startDate ? formatDisplayDate(startDate) : "MM / DD / YYYY"}
                            </div>
                        </div>
                        <div className='double-calender-clear'>
                            <i className="fas fa-multiply" onClick={() => setStartDate("")}/>
                        </div>
                    </div>
                    <div className='double-calendar-checkout-div'>
                        <div className="double-calendar-text-div">
                            <div className='double-calendar-checkout-text bold'>
                                CHECK-OUT
                            </div>
                            <div className='booking-date-input-display'>
                                {endDate ? formatDisplayDate(endDate) : "MM / DD / YYYY"}
                            </div>
                        </div>
                        <div className='double-calender-clear' onClick={() => setEndDate("")}>
                            <i className="fas fa-multiply" />
                        </div>
                    </div>
                </div>
                <div className='double-calendar-div'>
                    <div className='start-calendar-div'>
                        <Calendar
                            className='start-calendar'
                            onChange={setStartDate}
                            tileDisabled={tileDisabledStart}
                        />
                    </div>
                    <div className='end-calendar-div'>
                        <Calendar
                            className='end-calendar'
                            onChange={setEndDate}
                            tileDisabled={tileDisabledEnd}
                        />
                    </div>
                </div>
            </div>
        )
    }

    // Component JSX --------------------------------------------------------------------------------------
    return (
        <div className='calendar-container'>
            <div className='calendar-check-container' onClick={showCalendarClick}>
                <div className='calendar-checkin-div'>
                    <div className='calendar-checkin-text bold'>
                        CHECK-IN
                    </div>
                    <div className='booking-date-input'>
                        {startDate ? formatDisplayDate(startDate) : "MM / DD / YYYY"}
                    </div>
                    {/* <input
                        className='booking-date-input'
                        type='text'
                        value={startDate ? formatDisplayDate(startDate) : ""}
                        placeholder="MM / DD / YYYY"
                        // onChange={startOnChange}
                        // onClick={onClickShowCalender}
                        // disabled={disableField}
                        readOnly
                    /> */}
                </div>
                <div className='calendar-checkout-div'>
                    <div className='calendar-checkout-text bold'>
                        CHECK-OUT
                    </div>
                    <div className='booking-date-input'>
                        {endDate ? formatDisplayDate(endDate) : "MM / DD / YYYY"}
                    </div>
                    {/* <input
                        className='booking-date-input'
                        type='text'
                        value={endDate ? formatDisplayDate(endDate) : ""}
                        placeholder="MM / DD / YYYY"
                        // onChange={startOnChange}
                        // onClick={onClickShowCalender}
                        // disabled={disableField}
                        readOnly
                    /> */}
                </div>
            </div>
            {calendarDisplay}
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
