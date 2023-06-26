import React from 'react';
import { useModal } from "../../context/Modal";
import "./DeleteBooking.css"
import { deleteBooking } from '../../store/booking';

function DeleteBooking({spots, formatDate, booking, dispatch}) {
    const { closeModal } = useModal();

    const deleteOnClick = async (e) => {
        e.preventDefault()
        await dispatch(deleteBooking(booking?.id))
        closeModal()
    }

    const cancelOnClick = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className='delete-book-container'>
            <div className='delete-book-div'>
                <h2 className='delete-book-title'>
                    Are you want to delete this booking?
                </h2>
                <div className='delete-book-body'>
                    {spots[booking?.spotId]?.name} booked from {formatDate(booking?.startDate)} to {formatDate(booking?.endDate)}.
                </div>
                <div className='delete-book-button-div'>
                    <button className='delete-book-btn-modal bold' onClick={deleteOnClick}>
                        Yes, delete booking.
                    </button>
                    <button className='delete-book-btn-modal delete-cancel-btn-modal bold' onClick={cancelOnClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBooking
