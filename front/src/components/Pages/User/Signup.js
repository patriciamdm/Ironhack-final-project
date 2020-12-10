import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Spinner from '../../Shared/Spinner'

import AuthService from '../../../services/auth.service'
import FilesService from '../../../services/upload.service'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            image: '',
            email: '',
            phone: undefined,
            uploadingActive: false
        }
        this.authService = new AuthService()
        this.filesService = new FilesService()
    }

    // ^([6-7]{1})([0-9]{8})$ Para móviles españoles
    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(loggedUser => {
                this.props.setUser(loggedUser.data)
                this.props.history.push('/products')
            })
            .catch(err => console.log('ERROR IN SIGN UP', err))
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
                        <h1>Sign Up</h1>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Image {this.state.uploadingActive && <Spinner />}</Form.Label>
                                <Form.Control required type="file" onChange={this.handleImageUpload} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control required type="text" name="phone" value={this.state.phone} onChange={this.handleInput} />
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup