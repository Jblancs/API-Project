import { csrfFetch } from "./csrf"

const LOAD_ALL_SPOTS = 'spots/LOAD_ALL_SPOTS'
const GET_SPOT_DETAIL = 'spots/GET_SPOT_DETAIL'

const loadAllSpots = spotsList => ({
    type: LOAD_ALL_SPOTS,
    spotsList
})

const getSpotDetail = spotDetail => ({
    type: GET_SPOT_DETAIL,
    spotDetail
})

// Landing Page: Load all spots Thunk
export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const allSpotsList = await res.json()
        dispatch(loadAllSpots(allSpotsList))
    }
}
// Single Spot Detail Thunk
export const getSingleSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetail = await res.json()
        dispatch(getSpotDetail(spotDetail))
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}


const spotsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            const allSpotsState = {}
            action.spotsList.Spots.forEach(spot => {
                allSpotsState[spot.id] = spot
            })
            newState.allSpots = allSpotsState
            return newState
        case GET_SPOT_DETAIL:
            const newSpotDetail = {}
            newSpotDetail.spotData = { ...action.spotDetail }
            newSpotDetail.SpotImages = [...action.spotDetail.SpotImages]
            newSpotDetail.Owner = {...action.spotDetail.Owner}
            newState.singleSpot = newSpotDetail
            return newState
        default:
            return state;
    }
}

export default spotsReducer
