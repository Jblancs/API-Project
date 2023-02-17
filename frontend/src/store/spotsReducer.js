import { csrfFetch } from "./csrf"

const LOAD_ALL_SPOTS = 'spots/LOAD_ALL_SPOTS'
const GET_SPOT_DETAIL = 'spots/GET_SPOT_DETAIL'
const ADD_NEW_SPOT = 'spots/ADD_NEW_SPOT'
const ADD_NEW_IMAGE = 'spots/ADD_NEW_IMAGE'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const CLEAR_STATE = 'spots/CLEAR_STATE'

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

const addNewImage = spotId => ({
    type: ADD_NEW_IMAGE,
    spotId
})

const removeSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

export const clearState = () => ({
    type: CLEAR_STATE
})


// Landing Page: Load all spots Thunk -------------------------------
export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const allSpotsList = await res.json()
        dispatch(loadAllSpots(allSpotsList))
    }
}
// Single Spot Detail Thunk -----------------------------------------
export const getSingleSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetail = await res.json()
        dispatch(getSpotDetail(spotDetail))
        return spotDetail
    }
}

// Create New Spot Thunk --------------------------------------------
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

// Create New Spot Images from create new spot form ------------------
export const createNewImages = (imageInfo, newSpotId) => async dispatch => {
    const imageInfoKeys = Object.keys(imageInfo)

    for (let key of imageInfoKeys) {

        if (imageInfo[key]) {
            const imageReqBody = {
                url: imageInfo[key],
                preview: key === "preview" ? true : false
            }

            const res = await csrfFetch(`/api/spots/${newSpotId}/images`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(imageReqBody)
            })

            if (res.ok) {
                dispatch(addNewImage(newSpotId))
            }
        }
    }
}

// Update Spot Info -----------------------------------------------------
export const updateSpot = (updatedInfo, spotId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInfo)
    })

    if (res.ok) {
        const updatedSpotInfo = await res.json()
        dispatch(addNewSpot(updatedSpotInfo))
        return updatedSpotInfo
    }
}

// Get current user spots (ManageSpots) ---------------------------------
export const getCurrentSpots = (userId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/current`)

    if (res.ok) {
        const userSpots = await res.json()
        dispatch(loadAllSpots(userSpots))
    }
}

// Delete spot (ManageSpots) ---------------------------------------------
export const deleteUserSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })

    dispatch(removeSpot())
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

        case ADD_NEW_IMAGE:
            const updateSpotImg = { ...newState.allSpots }
            updateSpotImg[action.spotId] = { ...updateSpotImg[action.spotId] }
            newState.allSpots = updateSpotImg
            return newState

        case DELETE_SPOT:
            delete newState.allSpots[action.spot]
            const updatedSpotList = { ...newState.allSpots }
            newState.allSpots = updatedSpotList
            return newState

        case CLEAR_STATE:
            const newAllSpots = {}
            const newSingleSpot = {}
            newState.allSpots = newAllSpots
            newState.singleSpot = newSingleSpot
            return newState

        default:
            return state;
    }
}

export default spotsReducer
