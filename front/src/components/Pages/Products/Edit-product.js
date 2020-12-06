import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import ProductService from '../../../services/products.service'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            name: '',
            description: '',
            image: '',
            price: 0,
            status: 'available',
            owner: this.props.loggedUser ? this.props.loggedUser._id : ''
        }

        this.productService = new ProductService()
    }

    componentDidMount = () => {
        this.productService
            .getOneProduct(this.props.productId)
            .then(res => this.setState({ _id: res.data._id, name: res.data.name, description: res.data.description, image: res.data.image, price: res.data.price, status: 'available', owner: this.props.theUser._id}))
            .catch(err => console.log('ERROR FINDING PROD', err))
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        const editedProd = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            owner: this.props.theUser._id
        }
        this.productService
            .editProduct(this.state._id, editedProd)
            .then(res => {
                this.props.reloadProducts()
                this.props.hideModal()
            })
            .catch(err => console.log('ERROR CREATING PRODUCT', err))
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <h1>Edit product</h1>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Image (URL)</Form.Label>
                                <Form.Control type="text" name="image" value={this.state.image} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInput} />
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default EditProduct