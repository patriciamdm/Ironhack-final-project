import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Button, Container, Row, Modal } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'

class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: undefined,
            owner: undefined,
            showDeleteModal: false
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
            .then(user => {
                console.log(user)
                this.setState({ owner: user.data })
            })
            .catch(err => console.log('ERROR WITH PRODUCT OWNER', err))
    }

    handleModal = visibility => this.setState({ showDeleteModal: visibility })

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
                                        <Button onClick={() => this.showThisModal()} variant="secondary" size="sm">Edit product</Button>
                                        <Button onClick={() => this.handleModal(true)} variant="danger" size="sm">Delete product</Button>
                                    </>
                                    :
                                    <Button variant="secondary" size="sm">Show interest</Button>
                                }
                            </Col>
                        </Row>
                    :
                        <Loader />
                    }
                </Container>
                <Modal show={this.state.showDeleteModal} onHide={() => this.handleModal(false)}>
                    {/* <EditProduct hideModal={() => this.handleModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} /> */}
                    <Modal.Body><b>Are you sure you want to delete this product?</b></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModal(false)}>
                            No, go back
                        </Button>
                        <Button variant="danger" onClick={() => this.handleModal(false)}>
                            Yes, delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ProductDetails