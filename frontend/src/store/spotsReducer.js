import { csrfFetch } from "./csrf"

const LOAD_ALL_SPOTS = 'spots/LOAD_ALL_SPOTS'
const GET_SPOT_DETAIL = 'spots/GET_SPOT_DETAIL'
const ADD_NEW_SPOT = 'spots/ADD_NEW_SPOT'

const loadAllSpots = spotsList => ({
    type: LOAD_ALL_SPOTS,
    spotsList
})

const getSpotDetail = spotDetail => ({
    type: GET_SPOT_DETAIL,
    spotDetail
})

const addNewSpot = newSpot => ({
    type: ADD_NEW_SPOT,
    newSpot
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

// Create New Spot Thunk
export const createNewSpot = (spotInfo) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotInfo)
    })

    if (res.ok) {
        const newSpotDetail = await res.json()
        dispatch(addNewSpot(newSpotDetail))
        return newSpotDetail
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
            const copySpotDetail = {}
            copySpotDetail.spotData = { ...action.spotDetail }
            copySpotDetail.SpotImages = [...action.spotDetail.SpotImages]
            copySpotDetail.Owner = { ...action.spotDetail.Owner }
            newState.singleSpot = copySpotDetail
            return newState

        case ADD_NEW_SPOT:
            const newSpotsDetail = { ...newState.allSpots }
            newSpotsDetail[action.newSpot.id] = { ...action.newSpot }
            newState.allSpots = newSpotsDetail
            return newState

        default:
            return state;
    }
}

export default spotsReducer
