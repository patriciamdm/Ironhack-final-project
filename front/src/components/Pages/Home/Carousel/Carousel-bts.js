import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'

//import Loader from '../../../Shared/Spinner'


class BtsCarousel extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <Carousel>
                {/* <Carousel.Item>
                    <img className="d-block w-100"  alt="" src=""/>
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item> */}

                <Carousel.Item>
                    <img className="d-block" style={{ width: '1000px', height: '500px', objectFit: 'cover' }}
                        alt='Optimus Prime' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYTd79O3VWtLceB-82PI6jYZYE7Lf7wMw5Q&usqp=CAU' />
                </Carousel.Item>
                
                <Carousel.Item>
                    <img className="d-block" style={{ width: '1000px', height: '500px', objectFit: 'cover' }}
                        alt='Bumblebee' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsG9dqwRqeL_qyQ_mfZIQmUhO9lB2fRa17bA&usqp=CAU' />
                </Carousel.Item>

                <Carousel.Item>
                    <img className="d-block" style={{ width: '1000px', height: '500px', objectFit: 'cover' }}
                        alt='Ironhide' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBmMjK6xAdBrtYe9nh1ycaSwa_9TBPDPmHyw&usqp=CAU' />
                </Carousel.Item>

                <Carousel.Item>
                    <img className="d-block" style={{ width: '1000px', height: '500px', objectFit: 'cover' }}
                        alt='Barricade' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCtGrFo9pGuY3F7zQ7UOdhw5S_9L82pMdPwg&usqp=CAU' />
                </Carousel.Item>

            </Carousel>
        )
    }
}

export default BtsCarousel