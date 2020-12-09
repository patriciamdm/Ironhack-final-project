import React, { Component } from 'react'
// import Glide from '@glidejs/glide'

import ProductService from '../../../../services/products.service'
import Loader from '../../../Shared/Spinner'




class Carousel extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            options: {
                type: 'carousel',
                autoplay: 4000,
                startAt: 0,
                perView: 3,
                focusAt: 'center'
            }
        }
        this.productsService = new ProductService()
    }

//     componentDidMount = () => {
//         this.initializeGlider()
//         this.loadProducts()
//     }

//     initializeGlider = () => {
//         this.slider = new Glide('.glide-products', this.state.options)
//         this.slider.mount()
//     } 

//     loadProducts = () => {
//         this.productsService
//             .getAllProducts()
//             .then(myProds => this.setState({ products: myProds.data}))
//             .catch(err => console.log('ERROR GET ALL PRODS', err))
//     }

    render() {
        return (
            <>
                {/* {this.state.products
                    ?
                    <>
                        <div className="col-md-12 glide glide-products" style={{ overflowX: 'hidden', userSelect: 'none', maxWidth: '100vw' }}>
                            <div className="glide__track" data-glide-el="track">
                                <ul className="glide__slides">
                                    {this.state.products.map((elm, idx) => <li className="glide__slide" key={idx} ><img src={elm.image} alt={elm.name} style={{width: '30px', height: '30px', objectFit: 'cover'}} /></li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="glide__bullets" data-glide-el="controls[nav]">
                            {this.state.products.map((elm, idx) => <button className="glide__bullet" data-glide-dir={`=${idx}`} key={idx}></button>)}
                        </div>
                    </>
                    : */}
                    <Loader />
                {/* } */}
            </>
        )
    }
}

export default Carousel