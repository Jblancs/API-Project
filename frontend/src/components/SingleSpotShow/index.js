import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getSingleSpot, clearState } from "../../store/spotsReducer"
import SpotImageShow from "./SpotImageShow"


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
                    {/* <div className="booking__container"> */}
                    <div className="booking__div">
                        <span className="booking__price">
                            ${currentSpotState.spotData.price} night
                        </span>
                        <div className="review-rating-div">
                            <span className="booking__rating">
                                <i className="fa-solid fa-star" />
                                {currentSpotState.spotData.numReviews !== 0 ? currentSpotState.spotData.avgStarRating : "new"}
                                {/* <i className="fa-solid fa-circle" /> */}
                            </span>
                            <span className="dot-span">·</span>
                            <span className="booking__review">
                                {`${currentSpotState.spotData.numReviews} reviews`}
                            </span>
                        </div>
                        <button className="booking__button" onClick={clickHandler}>Reserve</button>
                    </div>
                    {/* </div> */}
                </div>
                <div className="review container">
                    Reviews Placeholder
                </div>
            </div>
        </div>
    )
}

export default SingleSpotShow
