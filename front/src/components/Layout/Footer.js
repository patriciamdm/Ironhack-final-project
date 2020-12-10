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
            <Navbar className="footer" variant="dark" style={{ marginTop: '70px', padding: '30px 0', position: 'relative' }}>
                <Container>
                    <Row>
                        <Col sm={12} md={5} lg={4} style={{paddingRight: '30px'}}>
                            <h4>Dealz_</h4>
                            <p>Copyright © 2020 Dealz_</p>
                            <p>Developed by Manuel Barreda and Patricia Muñoz</p>
                        </Col>
                        {/* <Col> */}
                        <Col sm={12} md={7} lg={8}>
                        {/* <Col sm={12} style={{flexBasis: '0', flexGrow: '1'}}> */}
                            <Row style={{padding: '10px'}}>
                            {/* <Row style={{display: 'flex', flexWrap: 'wrap'}}> */}
                                <Col sm={6} md={3}>
                                    <h6>Dealz_</h6>
                                    <ul style={{listStyle: 'none', padding: '0px'}}>
                                        <li><Link to="/"><Nav.Link as="div" style={{padding: '10px 0px'}}>Home</Nav.Link></Link></li>
                                        <li><Link to="/products"><Nav.Link as="div" style={{padding: '10px 0px'}}>Products</Nav.Link></Link></li>
                                        <li><Link to="/users"><Nav.Link as="div" style={{padding: '10px 0px'}}>Users</Nav.Link></Link></li>
                                        <li><Link to="/profile"><Nav.Link as="div" style={{padding: '10px 0px'}}>Profile</Nav.Link></Link></li>
                                    </ul>
                                </Col>
                                <Col  sm={6} md={3}>
                                    <h6>Dealz_</h6>
                                    <ul style={{listStyle: 'none', padding: '0px'}}>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>About Us</Nav.Link></li>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Contact</Nav.Link></li>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Careers</Nav.Link></li>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Press</Nav.Link></li>
                                    </ul>
                                </Col>
                                <Col  sm={6} md={3}>
                                    <h6>Support</h6>
                                    <ul style={{listStyle: 'none', padding: '0px'}}>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>FAQs</Nav.Link></li>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Security advice</Nav.Link></li>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Publishing rules</Nav.Link></li>
                                    </ul>
                                </Col>
                                <Col  sm={6} md={3}>
                                    <h6>Legal</h6>
                                    <ul style={{listStyle: 'none', padding: '0px'}}>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Terms & Conditions</Nav.Link></li>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Privacy Policy</Nav.Link></li>
                                        <li><Nav.Link as="div" style={{padding: '10px 0px'}}>Cookies</Nav.Link></li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </Container>
            </Navbar>
        )
    }
}

export default Footer