import React, { Component } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ProductCard from '../Products/Prod-card'
import EditProduct from '../Products/Edit-product'
import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'

class OthersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            products: undefined
        }
        this.productsService = new ProductService()
        this.userService = new UserService()

    }

    componentDidMount = () => this.getUser()

    getUser = () => {
        this.userService
            .getOneUser(this.props.match.params.userId)
            .then(user => this.setState({ user: user.data }, () => this.loadProducts()))
            .catch(err => console.log('ERROR GETING USER', err))   
    }

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then(myProds => this.setState({ products: myProds.data.filter(elm => elm.owner === this.state.user._id) }))
            .catch(err => console.log('ERROR GETTING PRODS', err))
    }

    render() {
        return (
            <>
                {this.state.user
                    ?
                    <>
                        <Container className="profile">
                            <Row className="profile-info">
                                <Col md={3}>
                                    <img src={this.state.user.image} alt="User avatar" />
                                </Col>
                                <Col md={9}>
                                    <h1>Welcome {this.state.user.username}</h1>
                                    <hr/>
                                    <h6>Email: {this.state.user.email}</h6>
                                    <h6>Phone: {this.state.user.phone}</h6>
                                </Col>
                            </Row>
                            <br/>
                            <h2>Products</h2>
                            <hr/>
                            <Row>
                                {this.state.products
                                    ?
                                    this.state.products.map(elm => <ProductCard key={elm._id} showModal={visib => this.handleModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.state.user} />)
                                    :
                                    <Loader />
                                }
                            </Row>
                        </Container>
                        <Modal show={this.state.showEditProdModal} onHide={() => this.handleEditProdModal(false)}>
                            <Modal.Body>
                                <EditProduct hideModal={() => this.handleEditProdModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} />
                            </Modal.Body>
                        </Modal>
                        <Modal show={this.state.showDeleteModal} onHide={() => this.handleDeleteModal(false)}>
                            <Modal.Body><b>Are you sure you want to delete you account? This action will be irreversible.</b></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleDeleteModal(false)}>
                                    No, go back
                                </Button>
                                <Button variant="danger" onClick={() => this.handleDeleteModal(false)}>
                                    Yes, delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    :
                    <Loader />
                }
            </>
        )
    }
}

export default OthersProfile