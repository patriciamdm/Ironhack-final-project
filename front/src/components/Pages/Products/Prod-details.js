import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Button, Container, Row, Modal } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import EditProduct from './Edit-product'
import EmailForm from '../../Shared/Email-form'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'

class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: undefined,
            owner: undefined,
            showDeleteModal: false,
            showEditModal: false,
            showContactModal: false,
            showEmailModal: false,
            showWppModal: false
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.productsService
            .getOneProduct(this.props.match.params.product_id)
            .then(res => this.setState({ product: res.data }, () => this.getOwner()))
            .catch(err => console.log('ERROR WITH PRODUCT DETAILS', err))
    }

    getOwner = () => {
        this.userService
            .getOneUser(this.state.product.owner)
            .then(user => this.setState({ owner: user.data }))
            .catch(err => console.log('ERROR WITH PRODUCT OWNER', err))
    }

    handleEditModal = visibility => this.setState({ showEditModal: visibility })

    handleDeleteModal = visibility => this.setState({ showDeleteModal: visibility })

    deleteProduct = () => {
        this.productsService
            .deleteProduct(this.state.product._id)
            .then(() => this.props.history.push('/products'))
            .catch(err => console.log('ERROR DELETIN PRODUCT', err))
    }

    handleContactModal = visibility => this.setState({ showContactModal: visibility })
    
    handleEmailModal = visib => this.setState({ showEmailModal: visib })
    
    handleWppModal = visib => this.setState({showWppModal: visib})

    render() {
        return (
            <>
                <Container className="product-details">
                    {this.state.product
                        ?
                        <Row className="justify-content-center">
                            <Col md={4}>
                                <img src={this.state.product.image} alt="User avatar" />
                            </Col>
                            <Col md={6}>
                                <h1>{this.state.product.name}</h1>
                                <hr />
                                {this.state.owner
                                    ?
                                    this.state.owner._id === this.props.theUser._id
                                            ?
                                            <h6>Sold by: <Link to={`/profile`}>{this.state.owner.username}</Link></h6>
                                            :
                                            <h6>Sold by: <Link to={`/profile/${this.state.owner._id}`}>{this.state.owner.username}</Link></h6>
                                    
                                    :
                                    <>
                                        <h6>Sold by: Unknown</h6>
                                        <Loader />
                                    </>
                                }
                                <p>{this.state.product.description}</p>
                                <h6 className="price">Price: {this.state.product.price}€</h6>
                                <h6 className="status">{this.state.product.status}</h6>
                                {this.state.product.owner === this.props.theUser._id
                                    ?
                                    <>
                                        <Button onClick={() => this.handleEditModal(true)} variant="secondary" size="sm">Edit product</Button>
                                        <Button onClick={() => this.handleDeleteModal(true)} variant="danger" size="sm">Delete product</Button>
                                    </>
                                    :
                                    <Button onClick={() => this.handleContactModal(true)} variant="secondary" size="sm">Show interest</Button>
                                }
                            </Col>
                        </Row>
                    :
                        <Loader />
                    }
                </Container>
                {this.state.product
                    &&
                    <>
                    <Modal show={this.state.showEditModal} onHide={() => this.handleEditModal(false)}>
                        <Modal.Body>
                            <EditProduct hideModal={() => this.handleEditModal(false)} productId={this.state.product._id} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} />
                        </Modal.Body>
                    </Modal>
                    <Modal show={this.state.showDeleteModal} onHide={() => this.handleDeleteModal(false)}>
                        <Modal.Body><b>Are you sure you want to delete this product?</b></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleDeleteModal(false)}>
                                No, go back
                            </Button>
                            <Button variant="danger" onClick={() => this.deleteProduct()}>
                                Yes, delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                }
                {this.state.owner
                    &&
                    <>
                    <Modal show={this.state.showContactModal} onHide={() => this.handleContactModal(false)}>
                        <Modal.Body><b>How would you like to contact this seller?</b></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleEmailModal(true)}>
                                Via Email
                            </Button>
                            <a className="btn btn-secondary" target="_blank" href={`https://wa.me/+34${this.state.owner.phone}?text=Mensaje automático de la Patriapp`}>Via WhatsApp</a>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showEmailModal} onHide={() => this.handleEmailModal(false)}>
                        <Modal.Body>
                            <EmailForm hideModal={() => this.handleEmailModal(false)} toUser={this.state.owner.email} fromUser={this.props.theUser.email} subject={this.state.product.name}/>
                        </Modal.Body>
                    </Modal>
                    </>
                }
            </>
        )
    }
}

export default ProductDetails