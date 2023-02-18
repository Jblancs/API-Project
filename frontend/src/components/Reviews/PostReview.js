import { useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { createNewReview } from "../../store/Review"
import { getSingleSpot } from "../../store/spotsReducer"
import './PostReview.css'

function PostReview({ spotId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()

        const reviewInfo = {
            review,
            stars: Number(stars)
        }

        const createdReview = await dispatch(createNewReview(reviewInfo, spotId))
        const spotDetailRender = await dispatch(getSingleSpot(spotId))

        setReview("")
        setStars("")

        return closeModal()
    }

    const textHandler = (e) => {
        setReview(e.target.value)
    }

    const starHandler = (e) => {
        setStars(e.target.value)
    }

    return (
        <div className="post-rev-container">
            <div className="post-rev-div">
                <h3 className="post-rev-header">How was your stay?</h3>
                <div className="post-rev-textarea">
                    <textarea
                        className="description-area"
                        type="text"
                        name="description"
                        placeholder="Leave your review here..."
                        required
                        value={review}
                        onChange={textHandler} />
                </div>
                <div className="post-rev-stars">
                    <div className="rate-div">
                        <div className="rate">
                            <input type="radio" id="star5" name="rate" value="5" onChange={starHandler} />
                            <label for="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4" onChange={starHandler} />
                            <label for="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3" onChange={starHandler} />
                            <label for="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2" onChange={starHandler} />
                            <label for="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1" onChange={starHandler} />
                            <label for="star1" title="text">1 star</label>
                        </div>
                        <span className="rate-text">Stars</span>
                    </div>
                </div>
                <button onClick={submitHandler} className="post-rev-submit" disabled={(review.length > 10 && stars !== "") ? false : true}>
                    Submit Your Review
                </button>
            </div>
        </div>
    )
}

export default PostReview
