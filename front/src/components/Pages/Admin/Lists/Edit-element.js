import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import CategoryService from '../../../../services/category.service'
import LocationService from '../../../../services/location.service'


class EditElm extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
        this.categoryService = new CategoryService()
        this.locationService = new LocationService()
    }

    componentDidMount = () => {
        this.props.type === 'category' && this.categoryService.getOneCategory(this.props.elm)
            .then(category => this.setState({ name: category.data.name }))
            .catch(err => new Error('ERROR GETTING CATEGORY', err))
        
        this.props.type === 'location' && this.locationService.getOneLocation(this.props.elm)
            .then(location => this.setState({ name: location.data.name }))
            .catch(err => new Error('ERROR GETTING LOCATION', err))
    }
    
    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.props.type === 'category' && this.categoryService.editCategory(this.props.elm, { name: this.state.name })
            .then(() => {
                this.props.loadList()
                this.props.hideModal()
                this.props.handleToast()
            })
            .catch(err => new Error('ERROR EDITING CATEGORY', err))
        
        this.props.type === 'location' && this.locationService.editLocation(this.props.elm, { name: this.state.name })
            .then(() => {
                this.props.loadList()
                this.props.hideModal()
                this.props.handleToast()
            })
            .catch(err => new Error('ERROR EDITING LOCATION', err))
    }
    
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" name="name" value={this.state.name} onChange={this.handleInput} />
                </Form.Group>
                <Button variant="secondary" type="submit">Submit</Button>
            </Form>
        )
    }
}

export default EditElm