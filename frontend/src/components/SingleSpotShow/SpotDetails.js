import React from "react";
import "./SpotDetails.css"

function SpotDetails({ currentSpotState }) {
    return (
        <div className="detail-other-info-div">
            <div className="detail-perks-div">
                <div className="detail-perk">
                    <div className="detail-perk-image">
                        <i className="fas fa-desktop" />
                    </div>
                    <div className="detail-perk-text-div">
                        <div className="bold">
                            Great for remote work
                        </div>
                        <div className="detail-perk-text">
                            Fast wifi, plus a dedicated workspace.
                        </div>
                    </div>
                </div>
                <div className="detail-perk">
                    <div className="detail-perk-image">
                        <i className="fa-solid fa-door-open" />
                    </div>
                    <div className="detail-perk-text-div">
                        <div className="bold">
                            Self check-in
                        </div>
                        <div className="detail-perk-text">
                            Check yourself in with lockbox or keypad.
                        </div>
                    </div>
                </div>
                <div className="detail-perk">
                    <div className="detail-perk-image">
                        <i className="fa-regular fa-calendar" />
                    </div>
                    <div className="detail-perk-text-div">
                        <div className="bold">
                            Free cancellation for 48 hours.
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-other-info-descript">
                {currentSpotState.spotData.description}
            </div>
            <div className="detail-amen-div">
                <div className="detail-amen-title bold">
                    What this place offers
                </div>
                <div className="detail-amen-whole">
                    <div className="detail-amen-left">
                        <div className="detail-amen">
                            <div className="detail-amen-image">
                                <i className="fas fa-utensils" />
                            </div>
                            <div className="detail-amen-text">
                                Kitchen
                            </div>
                        </div>
                        <div className="detail-amen">
                            <div className="detail-amen-image">
                                <i className="fas fa-wifi" />
                            </div>
                            <div className="detail-amen-text">
                                Fast wifi
                            </div>
                        </div>
                        <div className="detail-amen">
                            <div className="detail-amen-image">
                                <i className="fas fa-book" />
                            </div>
                            <div className="detail-amen-text">
                                Books and reading material
                            </div>
                        </div>
                    </div>
                    <div className="detail-amen-right">
                        <div className="detail-amen">
                            <div className="detail-amen-image">
                                <i className="fas fa-snowflake" />
                            </div>
                            <div className="detail-amen-text">
                                AC unit
                            </div>
                        </div>
                        <div className="detail-amen">
                            <div className="detail-amen-image">
                                <i className="fas fa-bed" />
                            </div>
                            <div className="detail-amen-text">
                                Extra pillows and blankets
                            </div>
                        </div>
                        <div className="detail-amen">
                            <div className="detail-amen-image">
                                <i className="fas fa-thermometer-three-quarters"></i>
                            </div>
                            <div className="detail-amen-text">
                                Heating
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SpotDetails
