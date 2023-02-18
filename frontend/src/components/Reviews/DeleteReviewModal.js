import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteReview } from "../../store/Review"
import "./DeleteReviewModal.css"

function DeleteReviewModal({ reviewId, spotId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const clickHandlerYes = async (e) => {
        e.preventDefault()

        const removeSpot = await dispatch(deleteReview(reviewId, spotId))
        // const reRender = await dispatch(getCurrentSpots(userId))

        return closeModal()
    }

    const clickHandlerNo = (e) => {
        e.preventDefault()
        return closeModal()
    }

    return (
        <div className="delete-rev-container">
            <div className="delete-rev-div">
                <h3 className="delete-rev-header">Confirm Delete</h3>
                <div className="delete-rev-text">
                    Are you sure you want to delete this review?
                </div>
                <button onClick={clickHandlerYes} className="delete-rev-btn-yes">Yes (Delete Review)</button>
                <button onClick={clickHandlerNo} className="delete-rev-btn-no">No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
