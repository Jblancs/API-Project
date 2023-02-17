import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews, clearReviewState } from "../../store/Review";
import './index.css'

function ReviewShow({ currentSpotState, spotId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
        return () => dispatch(clearReviewState())
    }, [dispatch])

    const currentUser = useSelector(state => state.session.user)
    const currentSpotReviews = useSelector(state => state.reviews.spot)
    const currentSpotReviewsArr = Object.values(currentSpotReviews)

    if (Object.values(currentSpotState).length === 0) return null

    const reviewArrSorted = currentSpotReviewsArr.sort((a, b) => a.id - b.id)

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const getDate = (date) => {
        const dateArr = date.split("-")
        const revMonth = month[dateArr[1] - 1]
        const revYear = dateArr[0]
        return `${revMonth} ${revYear}`
    }

    const reviewCount = currentSpotState.spotData.numReviews
    let reviewText;
    let reviewSpan;
    let reviewCards;

    if (reviewCount === 1) reviewText = "Review"
    if (reviewCount > 1) reviewText = "Reviews"

    if (reviewCount > 0) {
        reviewSpan = (
            <>
                <span className="review-rating-dot">·</span>
                <span className="review-count">
                    {`${currentSpotState.spotData.numReviews} ${reviewText}`}
                </span>
            </>
        )

        reviewCards = (
            <div className="review-list-div">
                {reviewArrSorted.length && currentSpotReviewsArr.map(review => (
                    <div className="review-card-container" key={review.id}>
                        <div className="review-card-name">
                            {review.User.firstName}
                        </div>
                        <div className="review-card-date">
                            {getDate(review.createdAt)}
                        </div>
                        <div className="review-card-text">
                            {review.review}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (reviewCount === 0 && currentUser && currentUser.id !== currentSpotState.Owner.id ) {
        reviewCards = (
            <div className="first-review-text">Be the first to post a review!</div>
        )
    }

        return (
            <div className="review-container">
                <div className="review-rating-header">
                    <span className="review-rating-avg">
                        <i className="fa-solid fa-star" />
                        {currentSpotState.spotData.numReviews !== 0 ? currentSpotState.spotData.avgStarRating : "new"}
                    </span>
                    {reviewSpan}
                </div>
                {reviewCards}
            </div>
        )
}

export default ReviewShow
