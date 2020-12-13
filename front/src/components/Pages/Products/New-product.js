import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'
import FilesService from '../../../services/upload.service'
import CategoryService from '../../../services/category.service'
import LocationService from '../../../services/location.service'


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
            locationList: undefined,
            categoryList: undefined
        }

        this.productService = new ProductService()
        this.filesService = new FilesService()
        this.categoryService = new CategoryService()
        this.locationService = new LocationService()
    }

    componentDidMount = () => {
        this.loadCategories()
        this.loadLocations()
    }

    loadCategories = () => {
        this.categoryService
            .getAllCategories()
            .then(categs => this.setState({ categoryList: categs.data }))
            .catch(err => console.log('ERROR GET CATEGS', err))        
    }

    loadLocations = () => {
        this.locationService
            .getAllLocations()
            .then(locs => this.setState({ locationList: locs.data }))
            .catch(err => console.log('ERROR GET LOCATIONS', err))        
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.productService
            .newProduct(this.state)
            .then(() => {
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
            this.state.categoryList && this.state.locationList
                ?
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
                            {this.state.categoryList.map(elm => <option key={elm._id} value={elm.name}>{elm.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image {this.state.uploadingActive && <Loader style={{width: '20px', height: '20px'}}/>}</Form.Label>
                        <Form.Control type="file" onChange={this.handleImageUpload} />
                    </Form.Group>
                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="select" name="location" value={this.state.location} onChange={this.handleInput}>
                            <option value='' disabled hidden>Select location</option>
                            {this.state.locationList.map(elm => <option key={elm._id} value={elm.name.toLowerCase()}>{elm.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="secondary" type="submit">Submit</Button>
                </Form>
                :
                <Loader />
            
        )
    }
}

export default NewProduct