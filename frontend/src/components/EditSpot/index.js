import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { updateSpot } from "../../store/spotsReducer"
import "./index.css"

function EditSpotForm({ user, spot }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const { spotId } = useParams()

    const [errors, setErrors] = useState({
        country: "",
        address: "",
        city: "",
        state: "",
        lat: "",
        lng: "",
        description: "",
        name: "",
        price: "",
        preview: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
    })
    const [formInfo, setFormInfo] = useState({
        country: "",
        address: "",
        city: "",
        state: "",
        lat: "",
        lng: "",
        description: "",
        name: "",
        price: "",
        preview: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
    })

    if (!user) {
        history.push("/")
    }
    if (user) {
        if (spot.Owner.id !== user.id) {
            history.push("/")
        }
    }

    useEffect(() => {
        setFormInfo({
            country: spot.spotData.country,
            address: spot.spotData.address,
            city: spot.spotData.city,
            state: spot.spotData.state,
            lat: spot.spotData.lat,
            lng: spot.spotData.lng,
            description: spot.spotData.description,
            name: spot.spotData.name,
            price: spot.spotData.price,
            // preview: "",
            // image1: "",
            // image2: "",
            // image3: "",
            // image4: "",
        })
    }, [])

    const onChangeHandler = (e) => {
        formInfo[e.target.name] = e.target.value
        setFormInfo({ ...formInfo })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const { country, address, city, state, lat, lng, description, name, price } = formInfo

        const updatedSpotInfo = {
            country,
            address,
            city,
            state,
            lat: Number(lat),
            lng: Number(lng),
            description,
            name,
            price: Number(price)
        }

        const updatedSpot = await dispatch(updateSpot(updatedSpotInfo, spotId)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    return setErrors({
                        ...errors,
                        ...data.errors
                    })
                }
            }
        )

        if (updatedSpot) {
            history.push(`/spots/${spotId}`)
            setFormInfo({
                country: "",
                address: "",
                city: "",
                state: "",
                lat: "",
                lng: "",
                description: "",
                name: "",
                price: "",
                // preview: "",
                // image1: "",
                // image2: "",
                // image3: "",
                // image4: "",
            })
        }

    }

    return (
        <div className="page-div">
            <div className="form-container">
                <div className="form-header">
                    <h2 className="form-header__title">
                        Create a new Spot
                    </h2>
                </div>
                <form className="create-spot-form" onSubmit={submitHandler}>
                    <div className="location-div">
                        <h3>Where's your place located?</h3>
                        <p className="edit-text">Guests will only get your exact address once they booked a
                            reservation.</p>
                        <div className="country-div">
                            <div className="country-text edit-text">
                                Country <span className="error-msg">{errors.country}</span>
                            </div>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                min="1"
                                max="100"
                                value={formInfo.country}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="address-div">
                            <div className="address-text edit-text">
                                Street Address <span className="error-msg">{errors.address}</span>
                            </div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formInfo.address}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="city-state-div">
                            <div className="city-div">
                                <div className="city-text edit-text">
                                    City <span className="error-msg">{errors.city}</span>
                                </div>
                                <input
                                    className="input-city"
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formInfo.city}
                                    onChange={onChangeHandler} />
                            </div>
                            <div className="state-comma">
                                ,
                            </div>
                            <div className="state-div">
                                <div className="state-text edit-text">
                                    State <span className="error-msg">{errors.state}</span>
                                </div>
                                <input
                                    className="input-state"
                                    type="text"
                                    name="state"
                                    placeholder="STATE"
                                    value={formInfo.state}
                                    onChange={onChangeHandler} />
                            </div>
                        </div>
                        <div className="lat-lng-div">
                            <div className="lat-div">
                                <div className="lat-text edit-text">
                                    Latitude <span className="error-msg">{errors.lat}</span>
                                </div>
                                <input
                                    className="input-lat"
                                    type="text"
                                    placeholder="Latitude"
                                    name="lat"
                                    value={formInfo.lat}
                                    onChange={onChangeHandler} />
                            </div>
                            <div className="lat-comma">
                                ,
                            </div>
                            <div className="lng-div">
                                <div className="lng-text edit-text">
                                    Longitude <span className="error-msg">{errors.lng}</span>
                                </div>
                                <input
                                    className="input-lng"
                                    type="text"
                                    placeholder="Longitude"
                                    name="lng"
                                    value={formInfo.lng}
                                    onChange={onChangeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="description-div">
                        <div className="description-text">
                            <h3>Describe your place to guests</h3>
                            <p className="edit-text">Mention the best features of your space, any special amentities like
                                fast wifi or parking, and what you love about the neighborhood</p>
                        </div>
                        <textarea
                            className="description-area"
                            type="text"
                            name="description"
                            placeholder="Please write at least 30 characters"
                            value={formInfo.description}
                            onChange={onChangeHandler} />
                        <span className="error-msg">{errors.description}</span>
                    </div>
                    <div className="name-div">
                        <div className="name-text">
                            <h3>Create a title for your spot</h3>
                            <p className="edit-text">Catch guests' attention with a spot title that highlights what makes
                                your place special.</p>
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name of your spot"
                            value={formInfo.name}
                            onChange={onChangeHandler} />
                        <span className="error-msg">{errors.name}</span>
                    </div>
                    <div className="price-div">
                        <div className="price-text">
                            <h3>Set a base price for your spot</h3>
                            <p className="edit-text">Competitive pricing can help your listing stand out and rank higher
                                in search results.</p>
                        </div>
                        <div>
                            $
                            <input
                                className="input-price"
                                type="number"
                                name="price"
                                placeholder="Price per night (USD)"
                                value={formInfo.price}
                                onChange={onChangeHandler} />
                            <span className="error-msg">{errors.price}</span>
                        </div>
                    </div>
                    <h3 className="image-edit">
                        Edit Images Feature Coming Soon!
                    </h3>
                    {/* <div className="image-div">
                        <div className="image-text">
                            <h3>Liven up your spot with photos</h3>
                            <p>Submit a link to at least one photo to publish your spot.</p>
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="preview"
                                placeholder="Preview Image URL"
                                required
                                value={formInfo.preview}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image1"
                                placeholder="Image URL"
                                value={formInfo.image1}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image2"
                                placeholder="Image URL"
                                value={formInfo.image2}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image3"
                                placeholder="Image URL"
                                value={formInfo.image3}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image4"
                                placeholder="Image URL"
                                value={formInfo.image4}
                                onChange={onChangeHandler} />
                        </div>
                    </div> */}
                    <div className="button-div">
                        <button className="create-button" type="submit">Update Your Spot</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditSpotForm
