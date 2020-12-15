import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Button, Container, Row } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import PopUpConfirm from '../../Shared/PopUps/Pop-up-confirm'
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
            deleteProdModal: false,
            editProdModal: false,
            contactUserModal: false,
            emailModal: false,
            wppModal: false,
            showToast: false,
            toastType: 'success',
            toastTitle: 'SUCCESS!',
            toastText: "Product updated successfully."

        }
        this.productsService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => this.loadProduct()
    
    loadProduct = () => {
        this.productsService
            .getOneProduct(this.props.match.params.product_id)
            .then(res => this.setState({ product: res.data }, () => this.getOwner()))
            .catch(err => new Error('ERROR WITH PRODUCT DETAILS', err))
    }

    getOwner = () => {
        this.userService
            .getOneUser(this.state.product.owner)
            .then(user => this.setState({ owner: user.data }))
            .catch(err => new Error('ERROR WITH PRODUCT OWNER', err))
    }

    handlePopups = (target, visib) => this.setState({ [target]: visib })

    deleteProduct = () => {
        this.productsService
            .deleteProduct(this.state.product._id)
            .then(() => this.props.history.push('/products'))
            .catch(err => new Error('ERROR DELETING PRODUCT', err))
    }

    addToFavorites = () => {
        const addFav = { likedProducts: [...this.props.theUser.likedProducts, this.state.product] }
        const removeFav = { likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== this.state.product._id) }
        this.userService
            .editUser(this.props.theUser._id, this.props.theUser.likedProducts.includes(this.state.product._id) ? removeFav : addFav)
            .then(user => this.userService.getOneUser(user.data._id))
            .then(user => this.props.setUser(user.data))
            .catch(err => new Error('ERROR REMOVING FROM FAVS', err))
    }

    render() {
        return (
            <>
                <Container className="product-details">
                    <Toastie show={this.state.showToast} handleToast={visib => this.handlePopups('showToast', visib)} toastType={this.state.toastType} toastText={this.state.toastText} toastTitle={this.state.toastTitle} />
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
                                <h6 className="status"><span style={this.state.product.status === 'available' ? { color: 'green' } : (this.state.product.status === 'sold' ? { color: 'red' } : { color: 'orange' })}>
                                    {this.state.product.status}</span></h6>
                                {this.state.product.owner === this.props.theUser._id
                                    ?
                                    <>
                                        <Button onClick={() => this.handlePopups('editProdModal', true)} variant="secondary" size="sm" style={{marginRight: '20px'}}>Edit product</Button>
                                        <Button onClick={() => this.handlePopups('deleteProdModal', true)} variant="danger" size="sm">Delete product</Button>
                                    </>
                                    :
                                    <>
                                        <Button onClick={() => this.handlePopups('contactUserModal', true)} variant="secondary" size="sm" style={{ marginRight: '20px' }}>Show interest</Button>
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
                    <PopUp show={this.state.editProdModal} hide={() => this.handlePopups('editProdModal', false)} title="Edit product">
                        <EditProduct hideModal={() => this.handlePopups('editProdModal', false)} productId={this.state.product._id} reloadProducts={() => this.loadProduct()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('showToast', visib)}/>
                    </PopUp>

                    <PopUpConfirm show={this.state.deleteProdModal} hide={() => this.handlePopups('deleteProdModal', false)}
                        leftAction={() => this.handlePopups('deleteProdModal', false)} leftText='No, go back'
                        rightAction={() => this.deleteProduct()} rightText='Yes, delete'
                        type='danger' title="Wait!" body={<b>Are you sure you want to delete this product?</b>}
                    />
                    </>
                }
                {this.state.owner
                    &&
                    <>
                    <PopUpConfirm show={this.state.contactUserModal} hide={() => this.handlePopups('contactUserModal', false)}
                        leftAction={() => this.handlePopups('emailModal', true)} leftText='Via email'
                        rightText='Via WhatsApp'
                        type='none' title="Contact seller" body={<b>How would you like to contact this seller?</b>}
                    />
                    
                    <PopUp show={this.state.emailModal} hide={() => this.handlePopups('emailModal', false)} title="Send an email">
                        <EmailForm hideModal={() => this.handlePopups('emailModal', false)} toUser={this.state.owner} fromUser={this.props.theUser} subject={this.state.product.name} />
                    </PopUp>
                    </>
                }
            </>
        )
    }
}

export default ProductDetails