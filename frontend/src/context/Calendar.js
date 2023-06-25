import { createContext, useContext, useState } from 'react';

export const CalendarContext = createContext()

export const useShowCalendar = () => useContext(CalendarContext)

export default function CalendarProvider(props) {
    const [showCalendar, setShowCalendar] = useState(false)

    return (
        <CalendarContext.Provider
        value={{
            showCalendar,
            setShowCalendar
        }}
        >
            {props.children}
        </CalendarContext.Provider>
    )
}
