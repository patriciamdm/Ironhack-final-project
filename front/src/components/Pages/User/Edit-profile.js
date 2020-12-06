import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import UserService from '../../../services/user.service'

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            username: '',
            image: '',
            email: '',
            phone: undefined
        }

        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.userService
            .getOneUser(this.props.theUser._id)
            .then(res => this.setState({ _id: res.data._id, username: res.data.username, image: res.data.image, email: res.data.email, phone: res.data.phone}))
            .catch(err => console.log('ERROR FINDING PROD', err))
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        const editedUser = {
            username: this.state.username,
            image: this.state.image,
            email: this.state.email,
            phone: this.state.phone,
        }

        this.userService
            .editUser(this.state._id, editedUser)
            .then(loggedUser => {
                //console.log(window)
                //console.log(this)
                // this.props.setUser(loggedUser.data)
                this.props.history.push('/profile') // TO-DO: Redirigir al perfil (no lo consigo), el formulario se manda y actualiza el usuario
            })
            .catch(err => console.log('ERROR IN SIGN UP', err))
    }


    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1>Edit profile</h1>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Image (URL)</Form.Label>
                                <Form.Control type="text" name="image" value={this.state.image} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="text" name="phone" value={this.state.phone} onChange={this.handleInput} />
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditUser