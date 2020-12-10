import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AuthService from '../../services/auth.service'

class Navigation extends Component {
    constructor() {
        super()
        this.authService = new AuthService()
    }

    logOut = () => {
        this.authService
            .logout()
            .then(() => this.props.setUser(undefined))
            .catch(err => console.log('ERROR IN LOG OUT', err))
    }

    render() {
        return (
            <Navbar className="navbar" variant="dark" expand="md" style={{ marginBottom: '50px' }}>
                <Link to='/'>
                    <Navbar.Brand>Dealz_</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="md-auto">
                        {this.props.theUser
                            ?
                            <>
                                <Link to="/products">
                                    <Nav.Link as="div">Products</Nav.Link>
                                </Link>
                                <Link to="/users">
                                    <Nav.Link as="div">Users</Nav.Link>
                                </Link>
                                <Link to="/profile">
                                    <Nav.Link as="div">Profile</Nav.Link>
                                </Link>
                                <Nav.Link as="div" onClick={this.logOut}>Log out</Nav.Link>
                            </>
                            :
                            <>
                                <Link to='/signup'>
                                    <Nav.Link as="div">Sign up</Nav.Link>
                                </Link>
                                <Link to='/login'>
                                    <Nav.Link as="div">Log in</Nav.Link>
                                </Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation