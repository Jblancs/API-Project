import './index.css'


function SpotImageShow ({ images }) {

    let prevLink = null
    let otherImages = []
    let noImageLink = "https://us.123rf.com/450wm/bebuntoon/bebuntoon2001/bebuntoon200100033/137481601-camera-icon-vector-illustration.jpg?ver=6"

    for (let i = 0; i <= 4; i++) {
        if (images[i]?.preview === true) {
            if (prevLink === null) prevLink = images[i].url
            else otherImages.push(images[i].url)
        } else {
            if (otherImages.length < 4) {
                if (images[i] === undefined) otherImages.push(noImageLink)
                else otherImages.push(images[i].url)
            }
        }
    }

    return (
        <div className="detail__img">
            <img className="detail__img__prev" src={prevLink === null ? noImageLink : prevLink} alt="preview image" />
            <div className="detail__img__small">
                {otherImages.map((imgUrl, i) => (
                    <img key={`${imgUrl}${i}`} className={`detail__img__other__${i}`} src={imgUrl} alt="image" />
                ))}
            </div>
        </div>
    )
}

export default SpotImageShow
