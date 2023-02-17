function ReviewRatings({currentSpotState}) {
    

    return (
        <>
            <span className="booking__rating">
                <i className="fa-solid fa-star" />
                {currentSpotState.spotData.numReviews !== 0 ? currentSpotState.spotData.avgStarRating : "new"}
            </span>
            <span className="dot-span">·</span>
            <span className="booking__review">
                {`${currentSpotState.spotData.numReviews} reviews`}
            </span>
        </>
    )
}

export default ReviewRatings
