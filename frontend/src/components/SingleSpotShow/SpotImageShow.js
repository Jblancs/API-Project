import './index.css'


function SpotImageShow({ images }) {

    let prevLink = null
    let otherImages = []
    

    for (let i = 0; i <= 4; i++) {
        if (images[i]?.preview === true) {
            if (prevLink === null) prevLink = images[i].url
            else otherImages.push(images[i].url)
        } else {
            if (otherImages.length < 4 && images[i]) {
                otherImages.push(images[i].url)
            }
        }
    }

    return (
        <div className="detail__img">
            <img className="detail__img__prev" src={prevLink} alt="preview image" />
            <div className="detail__img__small">
                {otherImages.map((imgUrl, i) => (
                    < img key = {`${imgUrl}${i}`} className={`detail__img__other__${i}`} src={imgUrl} alt="image" />
                ))}
            </div>
        </div>
    )
}

export default SpotImageShow
