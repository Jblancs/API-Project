import React, { useEffect, useState } from "react";
import ReviewRatings from "../ReviewRatings"

function Bookings({currentSpotState}) {

    const clickHandler = (e) => {
        alert("Feature coming soon")
    }
    return (
        <div className="booking__div">
            <span className="booking__price">
                ${currentSpotState.spotData.price} night
            </span>
            <div className="review-rating-div">
                <ReviewRatings currentSpotState={currentSpotState} />
            </div>
            <button className="booking__button" onClick={clickHandler}>Reserve</button>
        </div>
    )
}

export default Bookings
