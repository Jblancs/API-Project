import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

function CalendarComponent({ setStartDate, setEndDate, startDate, endDate, bookings }) {
    const calendarRef = useRef();
    const [showCalendar, setShowCalendar] = useState(false);
    const [oldStartDate, setOldStartDate] = useState("")
    const [oldEndDate, setOldEndDate] = useState("")

    useEffect(() => {
        if(startDate && endDate && startDate !== oldStartDate && endDate !== oldEndDate){
            setShowCalendar(false)
        }
    }, [startDate, endDate])

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
    // Start Date Calendar -------------------------------------------------------------------------------
    const tileDisabledStart = ({ date }) => {
        // Disable dates prior to tomorrow
        let pastDates = date <= new Date()

        // Disable dates within existing bookings
        let nextBookingDate;
        let isWithinRange;
        if (bookingList.length > 0) {
            // Disable dates within existing bookings
            isWithinRange = bookingList.some((range) => {
                let start = new Date(range.startDate)
                let end = new Date(range.endDate)
                return date >= start && date <= end;
            });

            // disable dates based on closest booking
            if (endDate && bookingList.length === 1){
                let bookingEnd = new Date(bookingList[0].endDate)
                if(bookingEnd < endDate){
                    nextBookingDate = date <= bookingEnd
                }

            } else if (endDate &&  bookingList.length > 1) {
                // sort list if more than 1 booking
                let bookingListSortByEnd = bookingList.sort((a, b) => {
                    let dateA = new Date(a.endDate)
                    let dateB = new Date(b.endDate)
                    return dateB - dateA
                })

                let endDateLastBook = new Date(bookingListSortByEnd[bookingListSortByEnd.length - 1].endDate)
                let startDatefirstBook = new Date(bookingListSortByEnd[0].startDate)

                // find first endDate less than endDate
                if(endDateLastBook < endDate){
                    nextBookingDate = date <= endDateLastBook

                } else if (startDatefirstBook > endDate){
                    nextBookingDate = nextBookingDate

                }else {
                    for (let i = 0; i < bookingListSortByEnd.length; i++) {
                        let bookingEnd = new Date(bookingListSortByEnd[i].endDate)
                        if (bookingEnd < endDate) {
                            nextBookingDate = date <= bookingEnd
                            break
                        }
                    }
                }
            }
        }

        // disable dates based on start/end dates
        let basedOnDatePick;
        if (endDate) {
            basedOnDatePick = date >= endDate
        }

        return pastDates || isWithinRange || basedOnDatePick || nextBookingDate
    };

    // End Date Calendar -------------------------------------------------------------------------------
    const tileDisabledEnd = ({ date }) => {
        // Disable dates prior to tomorrow
        let pastDates = date <= new Date()

        let isWithinRange;
        let nextBookingDate;
        if (bookingList.length > 0) {
            // Disable dates within existing bookings
            isWithinRange = bookingList.some((range) => {
                let start = new Date(range.startDate)
                let end = new Date(range.endDate)
                return date >= start && date <= end;
            });

            // disable dates based on closest booking
            if (startDate && bookingList.length === 1){
                let bookingStart = new Date(bookingList[0].startDate)
                if(bookingStart > startDate){
                    nextBookingDate = date >= bookingStart
                }

            } else if (startDate &&  bookingList.length > 1) {
                // sort list if more than 1 booking
                let bookingListSortByStart = bookingList.sort((a, b) => {
                    let dateA = new Date(a.startDate)
                    let dateB = new Date(b.startDate)
                    return dateA - dateB
                })

                let startDateFirstBook = new Date(bookingListSortByStart[0].startDate)
                let endDateLastBook = new Date(bookingListSortByStart[bookingListSortByStart.length - 1].endDate)

                // find first startDate greater than date
                if (startDateFirstBook > startDate){
                    nextBookingDate = date >= startDateFirstBook

                } else if (endDateLastBook < startDate){
                    nextBookingDate = nextBookingDate

                } else {
                    for (let i = 0; i < bookingListSortByStart.length; i++) {
                        let bookingStart = new Date(bookingListSortByStart[i].startDate)
                        if (bookingStart > startDate) {
                            nextBookingDate = date >= bookingStart
                            break
                        }
                    }
                }
            }
        }

        // disable dates based on start/end dates
        let basedOnDatePick;
        if (startDate) {
            basedOnDatePick = date <= startDate
        }

        return pastDates || isWithinRange || basedOnDatePick || nextBookingDate
    };

    // Event Handler --------------------------------------------------------------------------------------
    const showCalendarClick = () => {
        setShowCalendar(!showCalendar)
        setOldStartDate(startDate)
        setOldEndDate(endDate)
    }

    const startDateOnChange = (date) => {
        setOldStartDate(startDate)
        setStartDate(date)
    }

    const endDateOnChange = (date) => {
        setOldEndDate(endDate)
        setEndDate(date)
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
                        <div className='double-calender-clear' onClick={() => setStartDate("")}>
                            <i className="fas fa-multiply" />
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
                            onChange={startDateOnChange}
                            tileDisabled={tileDisabledStart}
                        />
                    </div>
                    <div className='end-calendar-div'>
                        <Calendar
                            className='end-calendar'
                            onChange={endDateOnChange}
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
                </div>
                <div className='calendar-checkout-div'>
                    <div className='calendar-checkout-text bold'>
                        CHECK-OUT
                    </div>
                    <div className='booking-date-input'>
                        {endDate ? formatDisplayDate(endDate) : "MM / DD / YYYY"}
                    </div>
                </div>
            </div>
            {calendarDisplay}
        </div>

    );
}

export default CalendarComponent
