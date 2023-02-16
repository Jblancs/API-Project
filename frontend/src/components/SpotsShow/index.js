import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllSpots } from "../../store/spotsReducer"
import "./index.css"

function SpotsShow() {
    const allSpotsObj = useSelector(state => state.spots.allSpots)
    const allSpotsArr = Object.values(allSpotsObj)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!allSpotsArr.length) return null

    let noImageLink = "https://us.123rf.com/450wm/bebuntoon/bebuntoon2001/bebuntoon200100033/137481601-camera-icon-vector-illustration.jpg?ver=6"

    return (
        <div className="spots">
            <div className="spots__container">
                {allSpotsArr && allSpotsArr.map(spot => (
                    <div key={`spots__prev${spot.id}`} className="spots__prev">
                        <Link key={`link${spot.id}`} to={`/spots/${spot.id}`}>
                            <img key={`img${spot.id}`} className="spots__prev__img" src={spot.previewImage === "No preview image found" ? noImageLink : spot.previewImage} />
                        </Link>
                        <div key={`spots__prev__locrate${spot.id}`} className="spots__prev__locrate">
                            <div key={`loc${spot.id}`} className="spots__prev__loc">
                                {spot.city}, {spot.state}
                            </div>
                            <div key={`rate${spot.id}`} className="spots__prev__rate">
                                <i className="fa-solid fa-star" />
                                {spot.avgRating === "NaN" ? "new" : spot.avgRating}
                            </div>
                        </div>
                        <div key={`name${spot.id}`} className="spots__prev__name">
                            {spot.name}
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

export default SpotsShow;
