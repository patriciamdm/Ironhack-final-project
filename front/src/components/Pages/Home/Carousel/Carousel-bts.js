import React from 'react'
import { Carousel } from 'react-bootstrap'

import image1 from './lucas-favre-hVlrxhscOJE-unsplash.jpg'
import image2 from './neonbrand-uEcSKKDB1pg-unsplash.jpg'
import image3 from './paul-volkmer-mCUkfDAbBtg-unsplash.jpg'
import image4 from './priscilla-du-preez-my5cwTzhmNI-unsplash.jpg'
import image5 from './steven-skerritt-vljZeX-WdQs-unsplash.jpg'
import image6 from './hello-i-m-nik-Gr7Bsolw5EU-unsplash.jpg'

const BtsCarousel = () => {
    return (
        <Carousel style={{width: '100vw'}}>

            <Carousel.Item>
                <img className="d-block" style={{ height: '600px' }} src={image1} />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block" style={{ height: '600px' }} src={image2} />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block" style={{ height: '600px' }} src={image4} />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block" style={{ height: '600px' }} src={image3} />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block" style={{ height: '600px' }} src={image5} />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block" style={{ height: '600px' }} src={image6} />
            </Carousel.Item>

        </Carousel>
    )
}

export default BtsCarousel