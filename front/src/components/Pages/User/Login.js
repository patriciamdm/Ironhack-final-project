import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import AuthService from '../../../services/auth.service'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
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
            .catch(err => console.log('ERROR IN LOG IN', err))
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1>Log In</h1>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login