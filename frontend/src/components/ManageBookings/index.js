import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { clearState, getAllSpots } from '../../store/spotsReducer';
import { clearBookingState, getBookings } from '../../store/booking';
import OpenModalButton from '../OpenModalButton';
import "./index.css"
import DeleteBooking from '../BookingModal/DeleteBooking';

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

    if (!bookings) return <div className='loading-div'><img src='/images/loading.gif' alt='loading' /></div>

    let bookingsList;
    if (bookings && !bookings.error) {
        let bookinglistUnsorted = Object.values(bookings)
        bookingsList = bookinglistUnsorted.sort((a, b) => {
            return b.id - a.id
        })
    }

    // Helper Functions ---------------------------------------------------------------------------
    const formatDate = (date) => {
        const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };

        let dateInput = new Date(date)
        let dateString = dateInput.toLocaleDateString(undefined, options)
        return dateString
    }

    // Booking Display ----------------------------------------------------------------------------
    let bookingDisplay;
    if (bookings.error) {
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
                            <img className='booking-spot-img' src={spots[booking?.spotId]?.previewImage} alt='house image' onClick={() => history.push(`/spots/${booking?.spotId}`)}/>
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
                            <OpenModalButton
                                buttonText="Delete"
                                nameClass="delete-book-btn bold"
                                modalComponent={<DeleteBooking spots={spots} formatDate={formatDate} booking={booking} dispatch={dispatch}/>}
                            />
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
