import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { clearState, getAllSpots } from '../../store/spotsReducer';
import { clearBookingState, getBookings } from '../../store/booking';
import "./index.css"

function ManageBookings() {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getBookings())
        return () => {
            clearState()
            clearBookingState()
        }
    }, [dispatch])

    const userInfo = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings.bookings)
    const spots = useSelector(state => state.spots.allSpots)

    if (!userInfo) history.push("/")

    let bookingsList;
    if (bookings) {
        let bookinglistUnsorted = Object.values(bookings)
        bookingsList = bookinglistUnsorted.sort((a, b) => {
            return b.id - a.id
        })
    }

    // Helper Functions ---------------------------------------------------------------------------
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };

        let dateInput = new Date(date)
        let dateString = dateInput.toLocaleDateString(undefined, options)
        return dateString
    }

    // Booking Display ----------------------------------------------------------------------------
    let bookingDisplay;
    if (!bookings) {
        bookingDisplay = (
            <div className='no-book-text bold'>
                You do not have any scheduled bookings.
            </div>
        )
    } else {
        bookingDisplay = (
            <>
                {bookingsList.map((booking) => (
                    <div key={booking.id} className='booking-card'>
                        <div className='booking-spot-img-div'>
                            <img className='booking-spot-img' src={spots[booking?.spotId]?.previewImage} alt='house image' />
                        </div>
                        <div className='booking-card-info'>
                            <div className='booking-spot-name bold'>
                                {spots[booking?.spotId]?.name}
                            </div>
                            <div className='booking-spot-dates'>
                                Booked from {formatDate(booking?.startDate)} to {formatDate(booking?.endDate)}.
                            </div>
                        </div>
                        <div className='delete-book-div'>
                            <button className='delete-book-btn bold'>Delete</button>
                        </div>
                    </div>
                ))}
            </>
        )
    }

    // Component JSX ------------------------------------------------------------------------------
    return (
        <div className='manage-book-container'>
            <div className='manage-book-div'>
                <h2 className='manage-book-header'>
                    Current Bookings
                </h2>
                {bookingDisplay}
            </div>
        </div>
    )
}

export default ManageBookings
