import React, { useEffect, useState } from "react";
import ReviewRatings from "../ReviewRatings"
import "./Booking.css"
import Calendar from "../Calendar";

function Bookings({ currentSpotState }) {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    // Helper functions ------------------------------------------------------------------------
    const getDayDiff = (start, end) => {
        let startMS = Date.parse(start)
        let endMS = Date.parse(end)

        let diff = endMS - startMS
        let dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24))
        return dayDiff
    }


    // Cost Display ----------------------------------------------------------------------------
    let nightTotal = Number(currentSpotState.spotData.price * getDayDiff(startDate, endDate)).toFixed(2)
    let cleaningFee = Number(nightTotal * .1).toFixed(2)
    let serviceFee = Number(nightTotal * .14).toFixed(2)
    let totalCost = Number(+nightTotal + +cleaningFee + +serviceFee).toFixed(2)


    let costDisplay = (
        <div className={startDate && endDate ? "booking-cost-container show-booking-detail" : "booking-cost-container"}>
            <div className="booking-cost-div">
                <div className="booking-cost-type">
                    {currentSpotState.spotData.price} x {getDayDiff(startDate, endDate)} night(s)
                </div>
                <div className="booking-cost-price">
                    ${nightTotal}
                </div>
            </div>
            <div className="booking-cost-div">
                <div className="booking-cost-type">
                    Cleaning Fee
                </div>
                <div className="booking-cost-price">
                    ${cleaningFee}
                </div>
            </div>
            <div className="booking-cost-div">
                <div className="booking-cost-type">
                    PearBnb service fee
                </div>
                <div className="booking-cost-price">
                    ${serviceFee}
                </div>
            </div>
            <div className="booking-cost-total-div">
                <div className="booking-cost-total bold">
                    Total before taxes
                </div>
                <div className="booking-cost-total bold">
                    ${totalCost}
                </div>
            </div>
        </div>
    )


    // Component JSX ---------------------------------------------------------------------------
    return (
        <div className="booking-container sticky">
            <div className="booking-div">
                <div className="booking-price-review-div">
                    <div className="booking-price">
                        <span className="booking-price-num bold">${currentSpotState.spotData.price}</span>
                        <span className="booking-price-night">night</span>
                    </div>
                    <div className="review-rating-div">
                        <ReviewRatings currentSpotState={currentSpotState} />
                    </div>
                </div>
                <form>
                    <div className="booking-form-container">
                        <Calendar setStartDate={setStartDate} setEndDate={setEndDate} />
                    </div>
                    <button className="booking-button bold">Reserve</button>
                </form>
                {costDisplay}
            </div>
        </div>
    )
}

export default Bookings
