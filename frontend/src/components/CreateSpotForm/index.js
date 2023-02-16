import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createNewImages, createNewSpot } from "../../store/spotsReducer"
import "./index.css"

function CreateSpotForm() {
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

    const onChangeHandler = (e) => {
        formInfo[e.target.name] = e.target.value
        setFormInfo({ ...formInfo })
    }

    const dispatch = useDispatch()
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault()

        const { country, address, city, state, lat, lng, description, name, price, preview, image1, image2, image3, image4 } = formInfo

        const newSpotInfo = {
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

        const createdSpot = await dispatch(createNewSpot(newSpotInfo))

        const createdSpotId = createdSpot.id

        const newImagesInfo = {
            preview,
            image1,
            image2,
            image3,
            image4
        }

        const createdImages = await dispatch(createNewImages(newImagesInfo, createdSpotId))

        if (createdSpot) {
            history.push(`/spots/${createdSpotId}`)
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
                preview: "",
                image1: "",
                image2: "",
                image3: "",
                image4: "",
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
                        <p>Guests will only get your exact address once they booked a
                            reservation.</p>
                        <div className="country-div">
                            <div className="country-text">
                                Country
                            </div>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                min="1"
                                max="100"
                                required
                                value={formInfo.country}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="address-div">
                            <div className="address-text">
                                Street Address
                            </div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                required
                                value={formInfo.address}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="city-state-div">
                            <div className="city-div">
                                <div className="city-text">
                                    City
                                </div>
                                <input
                                    className="input-city"
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    required
                                    value={formInfo.city}
                                    onChange={onChangeHandler} />
                            </div>
                            <div className="state-comma">
                                ,
                            </div>
                            <div className="state-div">
                                <div className="state-text">
                                    State
                                </div>
                                <input
                                    className="input-state"
                                    type="text"
                                    name="state"
                                    placeholder="STATE"
                                    required
                                    value={formInfo.state}
                                    onChange={onChangeHandler} />
                            </div>
                        </div>
                        <div className="lat-lng-div">
                            <div className="lat-div">
                                <div className="lat-text">
                                    Latitude
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
                                <div className="lng-text">
                                    Longitude
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
                            <p>Mention the best features of your space, any special amentities like
                                fast wifi or parking, and what you love about the neighborhood</p>
                        </div>
                        <textarea
                            className="description-area"
                            type="text"
                            name="description"
                            placeholder="Please write at least 30 characters"
                            required
                            value={formInfo.description}
                            onChange={onChangeHandler} />
                    </div>
                    <div className="name-div">
                        <div className="name-text">
                            <h3>Create a title for your spot</h3>
                            <p>Catch guests' attention with a spot title that highlights what makes
                                your place special.</p>
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name of your spot"
                            required
                            value={formInfo.name}
                            onChange={onChangeHandler} />
                    </div>
                    <div className="price-div">
                        <div className="price-text">
                            <h3>Set a base price for your spot</h3>
                            <p>Competitive pricing can help your listing stand out and rank higher
                                in search results.</p>
                        </div>
                        <div>
                            $
                            <input
                                className="input-price"
                                type="number"
                                name="price"
                                placeholder="Price per night (USD)"
                                required
                                value={formInfo.price}
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="image-div">
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
                    </div>
                    <div className="button-div">
                        <button className="create-button" type="submit">Create Spot</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSpotForm
