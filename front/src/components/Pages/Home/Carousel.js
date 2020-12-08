import React, { Component } from 'react'

import ProductService from '../../../services/products.service'
import Loader from '../../Shared/Spinner'

//import glide from '@glidejs/glide'


class Carousel extends Component {
    constructor() {
        super()
        this.state = {
            products: undefined
        }
        this.productsService = new ProductService()
    }

    componentDidMount = () => this.loadImages()

    loadImages = () => {
        this.productsService
            .getAllProducts()
            .then(myProds => this.setState({ products: myProds.data}))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }

    render() {
        return (
            <>
                {this.state.products
                    ?
                    <>
                        <div className="col-md-12 glide">
                            <div className="glide__track" data-glide-el="track">
                                <ul className="glide__slides">
                                    {this.state.products.forEach(elm => <li className="glide__slide"><img src={elm.image} alt={elm.name} style={{width: '200px', height: '200px', objectFit: 'cover'}} /></li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="glide__bullets" data-glide-el="controls[nav]">
                            {this.state.products.forEach((elm, idx) => <button className="glide__bullet" data-glide-dir={`=${idx}`}></button>)}
                        </div>
                    </>
                    :
                    <Loader />
                }
            </>
        )
    }
}

export default Carousel