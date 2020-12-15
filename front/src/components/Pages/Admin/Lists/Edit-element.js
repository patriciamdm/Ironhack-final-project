import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'


class EditElm extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }
    
    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        // this.authService
        //     .signup(this.state)
        //     .then(loggedUser => {
        //         this.props.setUser(loggedUser.data)
        //         this.props.history.push('/products')
        //     })
        //     .catch(err => console.log('ERROR IN SIGN UP', err))
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