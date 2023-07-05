import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createNewImages, createNewSpot } from "../../store/spotsReducer"
import "./index.css"

function CreateSpotForm() {
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
    const [anyErrors, setAnyErrors] = useState(false)
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

        setErrors({
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

        const newImagesInfo = {
            preview,
            image1,
            image2,
            image3,
            image4
        }

        let possibleErrors = {
            address: "Street address is required",
            city: "City is required",
            state: "State required",
            country: "Country is required",
            lat: "Lat is not valid",
            lng: "Lng is not valid",
            name: "Name is required and max 50 characters",
            description: "Description is required and min 30 characters",
            price: "Price per day is required",
            preview: "Preview image required and must end with .png, .jpg or .jpeg",
            image1: "Image url must end with .png, .jpg or .jpeg",
            image2: "Image url must end with .png, .jpg or .jpeg",
            image3: "Image url must end with .png, .jpg or .jpeg",
            image4: "Image url must end with .png, .jpg or .jpeg"
        }

        const imageErrorKeys = ["image1", "image2", "image3", "image4"]
        const imgUrlCheck = ["jpg", "png", "jpeg"]

        const endingCheck = (url) => {
            const splitUrl = url.split(".")
            const ending = splitUrl[splitUrl.length - 1]
            return imgUrlCheck.includes(ending)
        }

        for (let key in possibleErrors) {
            if (!imageErrorKeys.includes(key) && formInfo[key] === "") {
                errors[key] = possibleErrors[key]
            }
            else if ((key === "lat" || key === "lng") && isNaN(formInfo[key])) {
                errors[key] = possibleErrors[key]
            }
            else if (key === "name" && formInfo[key].length > 50) {
                errors[key] = possibleErrors[key]
            }
            else if (key === "description" && formInfo[key].length < 30) {
                errors[key] = possibleErrors[key]
            }
            else if (key === "preview" && !endingCheck(formInfo[key])) {
                errors[key] = possibleErrors[key]
            }
            else if (imageErrorKeys.includes(key) && formInfo[key] !== "" && !endingCheck(formInfo[key])) {
                errors[key] = possibleErrors[key]
            }else{
                errors[key] = ""
            }
        }

        setErrors({
            ...errors
        })

        for (let errorVal in errors) {
            if (errors[errorVal]) {
                return setAnyErrors(true)
            }
        }

        setAnyErrors(false)

        const createdSpot = await dispatch(createNewSpot(newSpotInfo))

        if (createdSpot) {
            const createdSpotId = createdSpot.id

            const createdImages = await dispatch(createNewImages(newImagesInfo, createdSpotId))

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
                    <div className="image-div">
                        <div className="image-text">
                            <h3>Liven up your spot with photos</h3>
                            <p className="edit-text">Submit a link to at least one photo to publish your spot.</p>
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="preview"
                                placeholder="Preview Image URL"
                                value={formInfo.preview}
                                onChange={onChangeHandler} />
                            <span className="error-msg">{errors.preview}</span>
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image1"
                                placeholder="Image URL"
                                value={formInfo.image1}
                                onChange={onChangeHandler} />
                            <span className="error-msg">{errors.image1}</span>
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image2"
                                placeholder="Image URL"
                                value={formInfo.image2}
                                onChange={onChangeHandler} />
                            <span className="error-msg">{errors.image2}</span>
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image3"
                                placeholder="Image URL"
                                value={formInfo.image3}
                                onChange={onChangeHandler} />
                            <span className="error-msg">{errors.image3}</span>
                        </div>
                        <div className="image-div__img">
                            <input
                                type="text"
                                name="image4"
                                placeholder="Image URL"
                                value={formInfo.image4}
                                onChange={onChangeHandler} />
                            <span className="error-msg">{errors.image4}</span>
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
