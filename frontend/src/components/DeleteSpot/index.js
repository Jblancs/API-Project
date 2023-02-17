import { useModal } from "../../context/Modal"

function DeleteSpot() {
    const { closeModal } = useModal()

    const clickHandler = (e) => {
        e.preventDefault()
        console.log("+++++++++++++++++++++")
        // return closeModal()
    }

    return (
        <div>
            {/* <button onClick={clickHandler}>No(Keep Spot)</button> */}
            <h1>test</h1>
            <h1>modal</h1>
        </div>
    )
}

export default DeleteSpot
