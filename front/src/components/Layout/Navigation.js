import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
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
            <Navbar className="navbar" variant="dark" expand="md" id="top-navigation">
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
                                <Link to="/chat">
                                    <Nav.Link as="div">Chat</Nav.Link>
                                </Link>
                                {this.props.theUser.role === 'admin'
                                    &&
                                   
                                    <NavDropdown title="Admin"id="basic-nav-dropdown" style={{margin: '0px'}}>
                                        <NavDropdown.Item as="div"><Link to="/admin">Admin page</Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as="div"><Link to="/admin/products">Manage products</Link></NavDropdown.Item>
                                        <NavDropdown.Item as="div"><Link to="/admin/users">Manage users</Link></NavDropdown.Item>
                                    </NavDropdown>
                                }
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