import React, { useEffect, useState } from "react";
import ReviewRatings from "../ReviewRatings"
import "./Booking.css"
import Calendar from "../Calendar";

function Bookings({ currentSpotState }) {

    return (
        <div className="booking-container">
            <div className="booking-div">
                <div className="booking-price-review-div">
                    <div className="booking-price">
                        <span className="booking-price-num bold">${currentSpotState.spotData.price}</span> night
                    </div>
                    <div className="review-rating-div">
                        <ReviewRatings currentSpotState={currentSpotState} />
                    </div>
                </div>
                <div className="booking-form-container">
                    <Calendar />
                </div>
                <button className="booking-button bold">Reserve</button>
            </div>
        </div>
    )
}

export default Bookings
