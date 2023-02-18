import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteUserSpot, getCurrentSpots } from "../../store/spotsReducer"
import "./index.css"

function DeleteSpot({ spotId, userId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const clickHandlerYes = async (e) => {
        e.preventDefault()

        const removeSpot = await dispatch(deleteUserSpot(spotId))
        const reRender = await dispatch(getCurrentSpots(userId))

        return closeModal()
    }

    const clickHandlerNo = (e) => {
        e.preventDefault()
        return closeModal()
    }

    return (
        <div className="delete-container">
            <div className="delete-div">
                <h3 className="delete-header">Confirm Delete</h3>
                <div className="delete-text">
                    Are you sure you want to remove this spot from the listings?
                </div>
                <button onClick={clickHandlerYes} className="delete-btn-yes">Yes (Delete Spot)</button>
                <button onClick={clickHandlerNo} className="delete-btn-no">No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpot
