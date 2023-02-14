import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllSpots } from "../../store/spotsReducer"

const AllSpots = () => {
    const allSpotsObj = useSelector(state => state.spots.allSpots)
    const allSpotsArr = Object.values(allSpotsObj)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!allSpotsObj) return null


    return (
        <div className="spots">
            {allSpotsArr && allSpotsArr.map(spot => (
                <Link key={spot.id} to={`/spots/${spot.id}`}>
                    {spot.previewImage}
                </Link>
            ))}
        </div>
    )
}

export default AllSpots;
