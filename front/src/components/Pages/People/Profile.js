import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import ProductCard from '../Products/Prod-card'
import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            products: undefined
        }
        this.productsService = new ProductService()
    }

    componentDidMount = () => {
        // GET USER INFO AND SET STATE
        this.loadProducts()
    }

    loadProducts = () => {
        this.productsService
            .getAllProducts()       // FILTER BY OWNER
            .then(theProds => this.setState({ products: theProds.data }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }

    render() {
        console.log(this.state.user)
        return (
            <Container>
                {this.state.user
                    ?
                    <>
                        <Row>
                            <Col md={3}>
                                <img src={this.state.user.image} alt="User avatar" />
                            </Col>
                            <Col md={9}>
                                <h1>{this.state.user.username}'s profile</h1>
                                <hr/>
                                <Button>Contact via email</Button>
                                <Button>Contact via whatsapp</Button>
                            </Col>
                        </Row>
                        <br/>
                        <h2>Products</h2>
                        <hr/>
                        <Row>
                            {this.state.products
                                ?
                                this.state.products.map(elm => <ProductCard key={elm._id} product={elm} theUser={this.state.user} />)
                                :
                                <Loader />
                            }
                        </Row>
                    </>
                    :
                    <Loader />}
            </Container>
                
        )
    }
}

export default Profile