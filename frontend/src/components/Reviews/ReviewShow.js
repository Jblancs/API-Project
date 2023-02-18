import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews, clearReviewState } from "../../store/Review";
import PostReview from "./PostReview";
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
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

    const reviewArrSorted = currentSpotReviewsArr.sort((b, a) => a.id - b.id)

    // date creator function
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const getDate = (date) => {
        const dateArr = date.split("-")
        const revMonth = month[dateArr[1] - 1]
        const revYear = dateArr[0]
        return `${revMonth} ${revYear}`
    }

    // JSX output depending on number of reviews
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
                {reviewArrSorted.length && reviewArrSorted.map(review => (
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
                        {currentUser && currentUser.id === review.userId ? <OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />} /> : ""}
                    </div>
                ))}
            </div>
        )
    }

    if (reviewCount === 0 && currentUser && currentUser.id !== currentSpotState.Owner.id) {
        reviewCards = (
            <div className="first-review-text">Be the first to post a review!</div>
        )
    }

    // Hide review button conditionals
    const reviewUserIdArr = []

    for (let review of reviewArrSorted) {

        if (currentUser && review.userId === currentUser.id) {
            reviewUserIdArr.push(review)
        }
    }

    let reviewButton;
    if (currentUser && currentUser.id !== currentSpotState.Owner.id && !reviewUserIdArr.length) {
        reviewButton = (
            <OpenModalButton
                buttonText="Post Your Review"
                nameClass="reviewModal"
                modalComponent={<PostReview spotId={spotId} />}
            />
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
            <div className="review-post-btn">
                {reviewButton}
            </div>
            {reviewCards}
        </div>
    )
}

export default ReviewShow
