import React, { Component } from 'react'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedUser: this.props.theUser
        }
    }

    render() {
        return (
            <Navbar className="footer" variant="dark" expand="md" style={{ marginTop: '70px', padding: '30px' }}>
                <Container className="justify-content-start">
                    <Row>
                        <Col xs={6} sm={6}>
                            <Link to="/">
                                <Nav.Link as="div">Home</Nav.Link>
                            </Link>
                            <Link to="/products">
                                <Nav.Link as="div">Products</Nav.Link>
                            </Link>
                            <Link to="/users">
                                <Nav.Link as="div">Users</Nav.Link>
                            </Link>
                            <Link to="/profile">
                                <Nav.Link as="div">Profile</Nav.Link>
                            </Link>
                        </Col>
                        <Col xs={6} sm={6}>
                            <Link to='/signup'>
                                <Nav.Link as="div">Sign up</Nav.Link>
                            </Link>
                            <Link to='/login'>
                                <Nav.Link as="div">Log in</Nav.Link>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        )
    }
}

export default Footer