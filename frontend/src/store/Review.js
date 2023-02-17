import { csrfFetch } from "./csrf"

const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEWS'
const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS'

export const clearReviewState = () => ({
    type: CLEAR_REVIEWS
})

const loadSpotReviews = reviewList => ({
    type: LOAD_SPOT_REVIEWS,
    reviewList
})

// Load spot reviews -------------------------------
export const getSpotReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const spotReviewList = await res.json()
        dispatch(loadSpotReviews(spotReviewList))
    }
}

const initialState = {
    spot: {},
    user: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch(action.type) {
        case CLEAR_REVIEWS:
            newState.spot = {}
            newState.user = {}
            return newState

        case LOAD_SPOT_REVIEWS:
            const spotReviewList = {}
            action.reviewList.Reviews.forEach(review => {
                spotReviewList[review.id] = review
            })
            newState.spot = spotReviewList
            return newState

        default:
            return state
    }
}

export default reviewReducer
