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
            category: '',
            image: '',
            price: 0,
            status: 'available',
            location: '',
            owner: this.props.theUser._id,
            uploadingActive: false,
            locationList: ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres', 'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara', 'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra', 'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']
        }

        this.productService = new ProductService()
        this.filesService = new FilesService()
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.productService
            .newProduct(this.state)
            .then(() => {
                //this.props.history.push('/products')
                this.props.reloadProducts()
                this.props.hideModal()
                this.props.handleToast(true)
            })
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
            // <Container>
            //     <Row className="justify-content-center">
            //         <Col md={6}>
            //             <h1>Create new product</h1>
            //             <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name="category" value={this.state.category} onChange={this.handleInput} >
                                    <option value='' disabled hidden>Select category</option>
                                    <option value='motor'>Motor</option>
                                    <option value='fashion'>Fashion</option>
                                    <option value='electronics'>Electronics</option>
                                    <option value='sports'>Sports</option>
                                    <option value='home'>Home</option>
                                    <option value='culture'>Culture</option>
                                    <option value='others'>Others</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Image {this.state.uploadingActive && <Spinner />}</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>
                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control as="select" name="location" value={this.state.location} onChange={this.handleInput}>
                                    <option value='' disabled hidden>Select location</option>
                                    {this.state.locationList.map((elm, idx) => <option key={idx} value={elm.toLowerCase()}>{elm}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
            //         </Col>
            //     </Row>
            // </Container>
        )
    }
}

export default NewProduct