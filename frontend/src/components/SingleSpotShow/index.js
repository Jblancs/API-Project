import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleSpot } from "../../store/spotsReducer"
import SpotImageShow from "./SpotImageShow"

const SingleSpotShow = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch])

    const currentSpotState = useSelector(state => state.spots.singleSpot)
    console.log(currentSpotState)
    if (Object.values(currentSpotState).length === 0) return null


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
                    <div className="booking__div">
                        <span className="booking__price">
                            ${currentSpotState.spotData.price} night
                        </span>
                        <span className="booking__rating">
                            <i className="fa-solid fa-star" />
                            {currentSpotState.spotData.avgStarRating}
                            <i className="fa-solid fa-circle" />
                        </span>
                        <span className="booking__review">
                            {currentSpotState.spotData.numReviews ? `${currentSpotState.spotData.numReviews} reviews` : "new"}
                        </span>
                        <button className="booking__button">Reserve</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleSpotShow
