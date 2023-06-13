import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getSingleSpot, clearState } from "../../store/spotsReducer"
import SpotImageShow from "./SpotImageShow"
import ReviewRatings from "../ReviewRatings"
import ReviewShow from "../Reviews/ReviewShow"
import Bookings from "../Bookings"


function SingleSpotShow() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        return () => dispatch(clearState())
    }, [dispatch])

    const currentSpotState = useSelector(state => state.spots.singleSpot)
    if (Object.values(currentSpotState).length === 0) return null

    const clickHandler = (e) => {
        alert("Feature coming soon")
    }

    return (
        <div className="page-container">
            <div className="detail-container">
                <h1 className="detail__name">
                    {currentSpotState.spotData.name}
                </h1>
                <h2 className="detail__loc">
                    {currentSpotState.spotData.city}, {currentSpotState.spotData.state}, {currentSpotState.spotData.country}
                </h2>
                <SpotImageShow images={currentSpotState.SpotImages} />
                <div className="detail__info">
                    <h1 className="detail__info__owner">
                        Hosted by {currentSpotState.Owner.firstName} {currentSpotState.Owner.lastName}
                    </h1>
                    <div className="detail__info__descript">
                        {currentSpotState.spotData.description}
                    </div>
                    <Bookings currentSpotState={currentSpotState}/>
                </div>
                <div className="review container">
                    <ReviewShow currentSpotState={currentSpotState} spotId={spotId} />
                </div>
            </div>
        </div>
    )
}

export default SingleSpotShow
