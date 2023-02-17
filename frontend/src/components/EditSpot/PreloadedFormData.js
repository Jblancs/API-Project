import { useDispatch, useSelector } from "react-redux"
import EditSpotForm from "./index.js"
import { useParams } from "react-router-dom"
import { getSingleSpot } from "../../store/spotsReducer"
import { useEffect, useState } from "react"
import "./index.css"


function PreloadedFormData() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const [currentSpot, setCurrentSpot] = useState({})

    useEffect(() => {
        const fetch = async () => {
            setCurrentSpot(await dispatch(getSingleSpot(spotId)))
        }
        fetch()
    }, [])

    const currentUser = useSelector(state => state.session.user)
    const currentSpotState = useSelector(state => state.spots.singleSpot)

    return (
        Object.values(currentSpot).length ? <EditSpotForm user={currentUser} spot={currentSpotState} /> : <div className="loading-div">Loading... Please wait patiently.</div>
    )
}

export default PreloadedFormData
