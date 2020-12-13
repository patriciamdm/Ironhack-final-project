import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import ProductService from '../../../services/products.service'
import FilesService from '../../../services/upload.service'
import CategoryService from '../../../services/category.service'
import LocationService from '../../../services/location.service'

import Spinner from '../../Shared/Spinner'

class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            name: '',
            description: '',
            image: '',
            price: 0,
            status: '',
            category: '',
            location: '',
            owner: this.props.loggedUser ? this.props.loggedUser._id : '',
            categoryList: undefined,
            locationList: undefined
        }

        this.productService = new ProductService()
        this.filesService = new FilesService()
        this.categoryService = new CategoryService()
        this.locationService = new LocationService()
    }


    componentDidMount = () => {
        this.loadProduct()
        this.loadCategories()
        this.loadLocations()
    }

    loadProduct = () => {
        this.productService
            .getOneProduct(this.props.productId)
            .then(res => this.setState({ _id: res.data._id, name: res.data.name, description: res.data.description, image: res.data.image, price: res.data.price, status: res.data.status, owner: this.props.theUser._id, category: res.data.category, location: res.data.location}))
            .catch(err => console.log('ERROR FINDING PROD', err))
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
        const editedProd = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            owner: this.props.theUser._id,
            status: this.state.status,
            location: this.state.location,
            category: this.state.category
        }

        this.productService
            .editProduct(this.state._id, editedProd)
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
        <>
            {this.state._id && this.state.locationList && this.state.categoryList
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
                            {this.state.categoryList.map(elm => <option key={elm._id} value={elm.name}>{elm.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" name="status" value={this.state.status} onChange={this.handleInput} >
                            <option value='available'>Available</option>
                            <option value='reserved'>Reserved</option>
                            <option value='sold'>Sold</option>
                        </Form.Control>
                    </Form.Group>    
                    <Form.Group controlId="image">
                        <Form.Label>Image {this.state.uploadingActive && <Spinner />}</Form.Label>
                        <Form.Control type="file" onChange={this.handleImageUpload} />
                    </Form.Group>
                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="select" name="location" value={this.state.location} onChange={this.handleInput}>
                            {this.state.locationList.map(elm => <option key={elm._id} value={elm.name.toLowerCase()}>{elm.name}</option>)}
                        </Form.Control>
                    </Form.Group>    
                    <Button variant="secondary" type="submit">Submit</Button>
                </Form>
                :
                <Spinner />
                }
            </>
        )
    }
}

export default EditProduct