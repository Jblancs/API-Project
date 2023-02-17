function ReviewRatings({ currentSpotState }) {

    const reviewCount = currentSpotState.spotData.numReviews
    let reviewText;
    let reviewSpan;

    if (reviewCount === 1) reviewText = "Review"
    if (reviewCount > 1) reviewText = "Reviews"

    if (reviewCount > 0) {
        reviewSpan = (
            <>
                <span className="dot-span">·</span>
                <span className="booking__review">
                    {`${currentSpotState.spotData.numReviews} ${reviewText}`}
                </span>
            </>
        )
    }

    return (
        <>
            <span className="booking__rating">
                <i className="fa-solid fa-star" />
                {currentSpotState.spotData.numReviews !== 0 ? currentSpotState.spotData.avgStarRating : "new"}
            </span>
            {reviewSpan}
        </>
    )
}

export default ReviewRatings
