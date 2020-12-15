import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import CategoryService from '../../../../services/category.service'
import LocationService from '../../../../services/location.service'


class NewElm extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
        this.categoryService = new CategoryService()
        this.locationService = new LocationService()
    }
    
    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.props.type === 'category' && this.categoryService.newCategory(this.state)
            .then(() => {
                this.props.loadList()
                this.props.hideModal()
                this.props.handleToast()
            })
            .catch(err => console.log('ERROR EDITING CATEGORY', err))
        
        this.props.type === 'location' && this.locationService.newLocation(this.state)
            .then(() => {
                this.props.loadList()
                this.props.hideModal()
                this.props.handleToast()
            })
            .catch(err => console.log('ERROR EDITING LOCATION', err))
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

export default NewElm