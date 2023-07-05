import { csrfFetch } from "./csrf"

const CLEAR_BOOKINGS = 'reviews/CLEAR_BOOKINGS'
const LOAD_BOOKINGS = 'reviews/LOAD_BOOKINGS'
const ADD_BOOKING = 'reviews/ADD_BOOKING'

export const clearBookingState = () => ({
    type: CLEAR_BOOKINGS
})

const loadBookings = bookingList => ({
    type: LOAD_BOOKINGS,
    bookingList
})


// Load spot bookings -----------------------------------------------------
export const getBookings = (spotId) => async dispatch => {
    const res = await csrfFetch((spotId ? `/api/spots/${spotId}/bookings` : "/api/bookings/current"));

    if (res.ok) {
        const bookingsList = await res.json()
        dispatch(loadBookings(bookingsList))
    }
}

// Create spot bookings ---------------------------------------------------
export const createBooking = (bookingData, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    })

    if (res.ok) {
        const booking = await res.json()
        dispatch(getBookings(spotId))
    }
}

// Create spot bookings ---------------------------------------------------
export const deleteBooking = (bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
        const booking = await res.json()
        dispatch(getBookings())
    }
}

// bookings reducer -------------------------------------------------------
const initialState = {
    bookings: null
}

const bookingReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case CLEAR_BOOKINGS:
            return initialState

        case LOAD_BOOKINGS:
            const bookingList = {}
            if(!action.bookingList.Bookings.error){
                action.bookingList.Bookings.forEach(booking => {
                    bookingList[booking?.id] = booking
                })
                newState.bookings = bookingList
            }else{
                newState.bookings = action.bookingList.Bookings
            }

            return newState

        default:
            return state
    }
}

export default bookingReducer
