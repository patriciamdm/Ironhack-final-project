import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class EditUser extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            image: '',
            email: '',
            phone: undefined
        }

        // USER SERVICE
    }

    componentDidMount = () => {
        this.setState({ username: this.props.theUser.username, image: this.props.theUser.image, email: this.props.theUser.email, phone: this.props.theUser.phone }, () => console.log('MOUNTED', this.state))

        // this.userService
        //     .findById(this.props.theUser._id)
        //     .then(res => this.setState({ username: res.data.username, image: res.data.image, email: res.data.email, phone: res.data.phone }, () => console.log('MOUNTED', this.state)))
        //     .catch(err => console.log('ERROR FINDING PROD', err))
    }


    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.userService
            .findOneAndUpdate(this.props.theUser._id, this.state)  // CUIDADO CON LO QUE MANDA EL FORMULARIO!!!!!
            .then(loggedUser => {
                this.props.setUser(loggedUser.data)
                this.props.history.push('/profile')
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