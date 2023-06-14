import React, { useEffect, useState } from "react";
import ReviewRatings from "../ReviewRatings"
import "./Booking.css"

function Bookings({ currentSpotState }) {

    const clickHandler = (e) => {
        alert("Feature coming soon")
    }
    return (
        <div className="booking-container">
            <div className="booking-div">
                <div className="booking-price-review-div">
                    <div className="booking-price border">
                        <span className="booking-price-num bold">${currentSpotState.spotData.price}</span> night
                    </div>
                    <div className="review-rating-div border">
                        <ReviewRatings currentSpotState={currentSpotState} />
                    </div>
                </div>
                <button className="booking-button bold" onClick={clickHandler}>Reserve</button>
            </div>
        </div>
    )
}

export default Bookings
