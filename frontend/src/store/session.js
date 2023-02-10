import { csrfFetch } from "./csrf"

const SET_USER = 'sessions/SET_USER'
const REMOVE_USER = 'sessions/REMOVE_USER'

const setSessionUser = (user) => ({
    type: SET_USER,
    user
})

const removeSessionUser = () => ({
    type: REMOVE_USER,
    user: { user: null }
})

export const loginSessionUser = (userInfo) => async dispatch => {
    //userInfo should be {credential, password}
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
    })

    if(res.ok){
        const resUser = await res.json()
        resUser.user.createdAt = new Date()
        resUser.user.updatededAt = new Date()
        dispatch(setSessionUser(resUser))
        return resUser
    }
}

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.user
            }

        case REMOVE_USER:
            return {
                ...action.user
            }

        default:
            return state
    }
}

export default sessionReducer
