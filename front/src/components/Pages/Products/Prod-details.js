import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import { Col, Button, Container, Row } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'


class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: undefined,
            ownerName: undefined
        }
        this.productsService = new ProductService()
    }

    componentDidMount = () => {
        this.productsService
            .getOneProduct(this.props.match.params.product_id)
            .then(res => this.setState({ product: res.data }))
            .catch(err => console.log('ERROR WITH PRODUCT DETAILS', err))
    }

    render() {
        return (
            <Container className="product-details">
                {this.state.product
                    ?
                    <Row className="justify-content-center">
                        <Col md={4}>
                            <img src={this.state.product.image} alt="User avatar" />
                        </Col>
                        <Col md={6}>
                            <h1>{this.state.product.name}</h1>
                            <hr/>
                            <h6 className="price">Price: {this.state.product.price}€</h6>
                            <p>{this.state.product.description}</p>
                            <h6 className="status">{this.state.product.status}</h6>
                            {this.state.product.owner === this.props.theUser._id
                                ?
                                <>
                                    <Button onClick={() => this.showThisModal()} variant="secondary" size="sm">Edit product</Button>
                                    {/* <Button onClick={} variant="danger" size="sm">Delete product</Button> */}
                                </>
                                :
                                <Button variant="secondary" size="sm">Show interest</Button>
                            }
                        </Col>
                    </Row>
                :
                    <Loader />
                }
            </Container>
        )
    }
}

export default ProductDetails