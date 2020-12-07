import React, { Component } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ProductCard from '../Products/Prod-card'
import EditProduct from '../Products/Edit-product'
import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.theUser,
            products: undefined,
            showEditProdModal: false,
            prodToEdit: undefined,
            showDeleteModal: false
        }
        this.productsService = new ProductService()
    }

    componentDidMount = () => this.loadProducts()

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then(myProds => this.setState({ products: myProds.data.filter(elm => elm.owner === this.state.user._id) }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }

    handleEditProdModal = visibility => this.setState({ showEditProdModal: visibility })

    handleDeleteUserModal = visibility => this.setState({ showDeleteModal: visibility })

    defineEditProd = prodId => this.setState({ prodToEdit: prodId})

    render() {
        return (
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
                            <Link to={`/editUser/${this.state.user._id}`} className="btn btn-secondary btn-sm">Edit profile</Link>
                            <Button onClick={() => this.handleDeleteUserModal(true)} variant="danger" size="sm">Delete account</Button>
                        </Col>
                    </Row>
                    <br/>
                    <h2>My products</h2>
                    <hr/>
                    <Row>
                        {this.state.products
                            ?
                            this.state.products.map(elm => <ProductCard key={elm._id} showEditProdModal={visib => this.handleEditProdModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.state.user} />)
                            :
                            <Loader />
                        }
                    </Row>
                </Container>
                <Modal show={this.state.showEditProdModal} onHide={() => this.handleEditProdModal(false)}>
                    <Modal.Body>
                        <EditProduct hideModal={() => this.handleEditProdModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.state.user} />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showDeleteUserModal} onHide={() => this.handleDeleteUserModal(false)}>
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
        )
    }
}

export default UserProfile