import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { getCurrentSpots } from "../../store/spotsReducer"
import "./index.css"

function ManageSpots() {
    const allSpotsObj = useSelector(state => state.spots.allSpots)
    const allSpotsArr = Object.values(allSpotsObj)
    const history = useHistory()

    const userInfo = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentSpots())
    }, [dispatch])

    if (!userInfo) history.push("/")

    if (!allSpotsArr.length) {
        return (
            <div className="header__container">
                <div className="curr__header">
                    <h2 className="curr__title__text">
                        Manage Your Spots
                    </h2>
                    <Link to="/spots/new">
                        <button className='curr__new__btn'>
                            Create a New Spot
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="header__container">
                <div className="curr__header">
                    <h2 className="curr__title__text">
                        Manage Your Spots
                    </h2>
                </div>
            </div>
            <div className="curr">
                <div className="curr__container">
                    {allSpotsArr && allSpotsArr.map(spot => (
                        <div key={`curr__prev${spot.id}`} className="curr__prev">
                            <div className="image-div-container">
                                <Link key={`link${spot.id}`} className="curr-link" to={`/spots/${spot.id}`}>
                                    <div className="hover-container">
                                        <img key={`img${spot.id}`} className="curr__prev__img" src={spot.previewImage} />
                                        <div key={`curr__prev__locrate${spot.id}`} className="curr__prev__locrate">
                                            <div key={`loc${spot.id}`} className="curr__prev__loc">
                                                {spot.city}, {spot.state}
                                            </div>
                                            {/* <div key={`name${spot.id}`} className="curr__prev__name">
                                                {spot.name}
                                            </div> */}
                                            <div key={`rate${spot.id}`} className="curr__prev__rate">
                                                <i className="fa-solid fa-star" />
                                                {spot.avgRating === "NaN" ? "new" : spot.avgRating}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div key={`price${spot.id}`} className="curr__prev__pricebtn">
                                    <div className="curr__prev__price">
                                        ${spot.price} night
                                    </div>
                                    <div className="curr__prev__btn">
                                        <Link to={`/spots/${spot.id}/edit`}>
                                            <button type="button" className="curr__prev__btn__update">Update</button>
                                        </Link>
                                        <button type="button" className="curr__prev__btn__delete">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ManageSpots
