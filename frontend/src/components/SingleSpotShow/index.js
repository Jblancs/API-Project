import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getSingleSpot, clearState } from "../../store/spotsReducer"
import SpotImageShow from "./SpotImageShow"
import ReviewShow from "../Reviews/ReviewShow"
import Bookings from "../Bookings"
import SpotDetails from "./SpotDetails"


function SingleSpotShow() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        return () => dispatch(clearState())
    }, [dispatch])

    const currentSpotState = useSelector(state => state.spots.singleSpot)
    if (Object.values(currentSpotState).length === 0) return null

    return (
        <div className="page-container">
            <div className="detail-container">
                <div className="detail-title-div">
                    <h1 className="detail-name">
                        {currentSpotState.spotData.name}
                    </h1>
                    <h2 className="detail-loc">
                        {currentSpotState.spotData.city}, {currentSpotState.spotData.state}, {currentSpotState.spotData.country}
                    </h2>
                </div>
                <SpotImageShow images={currentSpotState.SpotImages} />
                <div className="detail-info">
                    <h1 className="detail-info-owner">
                        Entire home hosted by {currentSpotState.Owner.firstName} {currentSpotState.Owner.lastName}
                    </h1>
                    <div className="detail-other-info-container">
                        <SpotDetails currentSpotState={currentSpotState} />
                    </div>
                    <div className="booking-container">
                        <Bookings currentSpotState={currentSpotState} />
                    </div>
                </div>
                <div className="review container">
                    <ReviewShow currentSpotState={currentSpotState} spotId={spotId} />
                </div>
            </div>
        </div>
    )
}

export default SingleSpotShow
