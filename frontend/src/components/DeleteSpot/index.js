import { useModal } from "../../context/Modal"

function DeleteSpot() {
    const { closeModal } = useModal()

    const clickHandler = (e) => {
        e.preventDefault()
        // return closeModal()
    }

    return (
        <div>
            <button onClick={clickHandler}>No(Keep Spot)</button> 
        </div>
    )
}

export default DeleteSpot
