import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Toastie from '../../Shared/PopUps/Toastie'

import AuthService from '../../../services/auth.service'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            showToast: false,
            toastType: 'alert',
            toastTitle: 'ERROR!',
            toastText: "Wrong username or password!"
        }
        this.authService = new AuthService()
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })
    
    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(loggedUser => {
                this.props.setUser(loggedUser.data)
                this.props.history.push('/products')
            })
            .catch(err => {
                this.setState({showToast: true})
                new Error('ERROR IN LOG IN', err)
            })
    }

    handleToast = visib => this.setState({ showToast: visib })

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1>Log In</h1>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control required type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="password" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
                <Toastie show={this.state.showToast} handleToast={this.handleToast} toastType={this.state.toastType} toastText={this.state.toastText} toastTitle={this.state.toastTitle} />
            </Container>
        )
    }
}

export default Login