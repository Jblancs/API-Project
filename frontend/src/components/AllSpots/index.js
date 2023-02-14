import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllSpots } from "../../store/spotsReducer"
import "./index.css"

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
            <div className="spots__container">
                {allSpotsArr && allSpotsArr.map(spot => (
                    <div className="spots__prev">
                        <Link key={`link${spot.id}`} to={`/spots/${spot.id}`}>
                            <img key={`img${spot.id}`} className="spots__prev__img" src={spot.previewImage} />
                        </Link>
                        <div className="spots__prev__locrate">
                            <div key={`loc${spot.id}`} className="spots__prev__loc">
                                {spot.city}, {spot.state}
                            </div>
                            <div key={`rate${spot.id}`} className="spots__prev__rate">
                                <i className="fa-solid fa-star" />{spot.avgRating}
                            </div>
                        </div>
                        <div key={`price${spot.id}`} className="spots__prev__price">
                            ${spot.price} night
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllSpots;
