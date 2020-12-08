import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Spinner from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'
import FilesService from '../../../services/upload.service'

class NewProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: '',
            price: 0,
            status: 'available',
            owner: this.props.theUser._id,
            uploadingActive: false
        }

        this.productService = new ProductService()
        this.filesService = new FilesService()
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.productService
            .newProduct(this.state)
            .then(() => this.props.history.push('/products') )
            .catch(err => console.log('ERROR CREATING PRODUCT', err))
    }

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('image', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({ image: response.data.secure_url, uploadingActive: false })
            })
            .catch(err => console.log('ERRORRR!', err))
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1>Create new product</h1>
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
                                <Form.Label>Image {this.state.uploadingActive && <Spinner />}</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
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

export default NewProduct