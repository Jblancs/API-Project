function ReviewRatings({ currentSpotState }) {

    const reviewCount = currentSpotState.spotData.numReviews
    let reviewText;
    let reviewSpan;

    if (reviewCount === 1) reviewText = "Review"
    if (reviewCount > 1) reviewText = "Reviews"

    if (reviewCount > 0) {
        reviewSpan = (
            <>
                <span className="dot-span">&#8226;</span>
                <span className="booking-review">
                    {`${currentSpotState.spotData.numReviews} ${reviewText}`}
                </span>
            </>
        )
    }

    return (
        <div className="booking-rating-div">
            <span className="booking-rating">
                <i className="fa-solid fa-star" />
                {currentSpotState.spotData.numReviews !== 0 ? ` ${currentSpotState.spotData.avgStarRating}` : "new"}
            </span>
            {reviewSpan}
        </div>
    )
}

export default ReviewRatings
