import React from 'react'
import { Carousel } from 'react-bootstrap'

//import Loader from '../../../Shared/Spinner'
import image1 from './lucas-favre-hVlrxhscOJE-unsplash.jpg'
import image2 from './neonbrand-uEcSKKDB1pg-unsplash.jpg'
import image3 from './paul-volkmer-mCUkfDAbBtg-unsplash.jpg'
import image4 from './priscilla-du-preez-my5cwTzhmNI-unsplash.jpg'
import image5 from './steven-skerritt-vljZeX-WdQs-unsplash.jpg'
import image6 from './hello-i-m-nik-Gr7Bsolw5EU-unsplash.jpg'
//import image7 from ''



const BtsCarousel = () => {
    return (
        <Carousel style={{width: '100vw'}}>
            {/* <Carousel.Item>
                <img className="d-block w-100"  alt="" src=""/>
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item> */}

            {/* {this.state.images.map(elm => {
                <Carousel.Item>
                    <img className="d-block" style={{ height: '600px' }} src={elm} />
                </Carousel.Item>
            })} */}

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
            {/* <Carousel.Item>
                <img className="d-block" style={{ height: '600px' }} src={image7} />
            </Carousel.Item> */}

        </Carousel>
    )
}

export default BtsCarousel