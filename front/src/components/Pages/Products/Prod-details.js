import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Button, Container, Row, Modal } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import PopUpButtons from '../../Shared/PopUps/Pop-up-buttons'
import EditProduct from './Edit-product'
import EmailForm from '../../Shared/Email-form'
import Toastie from '../../Shared/PopUps/Toastie'

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
            showWppModal: false,
            showToast: false,
            toastType: 'success',
            toastTitle: 'SUCCESS!',
            toastText: "Product updated successfully."

        }
        this.productsService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => this.loadProducts()
    
    loadProducts = () => {
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
            .then(() => {
                this.props.history.push('/products')
            })
            .catch(err => console.log('ERROR DELETING PRODUCT', err))
    }

    handleContactModal = visibility => this.setState({ showContactModal: visibility })
    
    handleEmailModal = visib => this.setState({ showEmailModal: visib })
    
    handleWppModal = visib => this.setState({ showWppModal: visib })
    
    addToFavorites = () => {
        const addFav = { likedProducts: [...this.props.theUser.likedProducts, this.state.product] }
        const removeFav = {likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== this.state.product._id)}

        this.props.theUser.likedProducts.includes(this.state.product._id)
            ?
            this.userService
                .editUser(this.props.theUser._id, removeFav)
                .then(user => this.userService.getOneUser(user.data._id))
                .then(user => this.props.setUser(user.data))
                .catch(err => console.log('ERROR REMOVING FROM FAVS', err))
            :
            this.userService
                .editUser(this.props.theUser._id, addFav)
                .then(user => this.userService.getOneUser(user.data._id))
                .then(user => this.props.setUser(user.data))
                .catch(err => console.log('ERROR ADDING TO FAVS', err))
    }

    handleToast = visib => this.setState({ showToast: visib })

    render() {
        return (
            <>
                <Container className="product-details">
                    <Toastie show={this.state.showToast} handleToast={this.handleToast} toastType={this.state.toastType} toastText={this.state.toastText} toastTitle={this.state.toastTitle} />
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
                                <h6 className="status" style={{ textTransform: 'capitalize' }}>Where: <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/place/${this.state.product.location.replace(/\s/g, '+')}`}>
                                    {this.state.product.location}</a></h6>
                                <h6 className="status">
                                    <span style={this.state.product.status === 'available' ? { color: 'green' } : (this.state.product.status === 'sold' ? { color: 'red' } : { color: 'orange' })}>
                                    {this.state.product.status}</span></h6>
                                {this.state.product.owner === this.props.theUser._id
                                    ?
                                    <>
                                        <Button onClick={() => this.handleEditModal(true)} variant="secondary" size="sm" style={{marginRight: '20px'}}>Edit product</Button>
                                        <Button onClick={() => this.handleDeleteModal(true)} variant="danger" size="sm">Delete product</Button>
                                    </>
                                    :
                                    <>
                                        <Button onClick={() => this.handleContactModal(true)} variant="secondary" size="sm" style={{ marginRight: '20px' }}>Show interest</Button>
                                        {this.props.theUser.likedProducts.includes(this.state.product._id)
                                            ?
                                            <Button onClick={() => this.addToFavorites()} variant="secondary" size="sm">Remove from favs</Button>
                                            :
                                            <Button onClick={() => this.addToFavorites()} variant="secondary" size="sm">Add to favs</Button>
                                        }
                                    </>
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
                    <PopUp show={this.state.showEditModal} hide={() => this.handleEditModal(false)} title="Edit product">
                        <EditProduct hideModal={() => this.handleEditModal(false)} productId={this.state.product._id} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={this.handleToast}/>
                    </PopUp>

                    <PopUpButtons show={this.state.showDeleteModal} hide={() => this.handleDeleteModal(false)} title="Wait!">
                        <Modal.Body><b>Are you sure you want to delete this product?</b></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleDeleteModal(false)}>
                                No, go back
                            </Button>
                            <Button variant="danger" onClick={() => this.deleteProduct()}>
                                Yes, delete
                            </Button>
                        </Modal.Footer>
                    </PopUpButtons>
                    </>
                }
                {this.state.owner
                    &&
                    <>
                    <PopUpButtons show={this.state.showContactModal} hide={() => this.handleContactModal(false)} title="Contact seller">
                        <Modal.Body><b>How would you like to contact this seller?</b></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleEmailModal(true)}>Via Email</Button>
                            <a className="btn btn-secondary" target="_blank" rel="noopener noreferrer" href={`https://wa.me/+34${this.state.owner.phone}?text=Este es el mensaje automático de Dealz_ para poneros en contacto`}>Via WhatsApp</a>
                        </Modal.Footer>
                    </PopUpButtons>
                    
                    <PopUp show={this.state.showEmailModal} hide={() => this.handleEmailModal(false)} title="Send an email">
                        <EmailForm hideModal={() => this.handleEmailModal(false)} toUser={this.state.owner} fromUser={this.props.theUser} subject={this.state.product.name} />
                    </PopUp>
                    </>
                }
            </>
        )
    }
}

export default ProductDetails