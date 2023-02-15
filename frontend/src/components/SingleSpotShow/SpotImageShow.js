import './index.css'


const SpotImageShow = ({ images }) => {

    let prevLink = null
    let otherImages = []

    for (let i = 0; i <= 5; i++) {
        if (images[i]?.preview === true) {
            if (prevLink === null) prevLink = images[i].url
            else otherImages.push(images[i].url)
        } else {
            if (images[i] === undefined) otherImages.push("https://us.123rf.com/450wm/bebuntoon/bebuntoon2001/bebuntoon200100033/137481601-camera-icon-vector-illustration.jpg?ver=6")
            else otherImages.push(images[i].url)
        }
    }

    return (
        <div className="detail__img">
            <img className="detail__img__prev" src={prevLink} alt="preview image" />
            {otherImages.map((imgUrl, i) => (
                <img key={`${imgUrl}${i}`} className={`detail__img__other__${i}`} src={imgUrl} alt="image" />
            ))}
        </div>
    )
}

export default SpotImageShow
