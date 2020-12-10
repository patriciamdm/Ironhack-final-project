import React, { Component } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../../Shared/Spinner'
import ProductCardProfile from '../Products/Prod-card-profile'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import EditProduct from '../Products/Edit-product'
import PopUpButtons from '../../Shared/PopUps/Pop-up-buttons'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            favorites: undefined,
            prodToTarget: undefined,
            showEditProdModal: false,
            showDeleteUserModal: false
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.loadProducts()
        this.loadFavorites()
    }

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then(allProds => this.setState({ products: allProds.data.filter(elm => elm.owner === this.props.theUser._id) }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }

    loadFavorites = () => {
        this.productsService
            .getAllProducts()
            .then(allProds => this.setState({ favorites: allProds.data.filter(elm => this.props.theUser.likedProducts.includes(elm._id)) }))
            .catch(err => console.log('ERROR GET FAVS', err))
    }

    handleEditProdModal = visibility => this.setState({ showEditProdModal: visibility })

    handleDeleteUserModal = visibility => this.setState({ showDeleteUserModal: visibility })

    defineTargetProd = prodId => this.setState({ prodToTarget: prodId })

    deleteUser = () => {
        this.userService
            .deleteUser(this.props.theUser._id)
            .then(() => this.props.setUser(undefined))
            .then(() => this.props.history.push('/'))
            .catch(err => console.log('ERROR DELETING USER', err))
    }

    removeFavorite = prod => {
        const removeFav = {likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== prod._id)}

        this.props.theUser.likedProducts.includes(prod._id)
            &&
            this.userService
            .editUser(this.props.theUser._id, removeFav)
            .then(user => this.userService.getOneUser(user.data._id))
            .then(user => this.props.setUser(user.data))
            .then(() => {
                this.props.history.push('/')
                this.props.history.push('/profile')
            })
            .catch(err => console.log('ERROR REMOVING FROM FAVS', err))
    }

    render() {
        return (
            <>
                <Container className="profile">
                    <Row className="profile-info">
                        <Col md={3}>
                            <img src={this.props.theUser.image} alt="User avatar" />
                        </Col>
                        <Col md={9}>
                            <h1>Welcome {this.props.theUser.username}</h1>
                            <hr/>
                            <h6>Email: {this.props.theUser.email}</h6>
                            <h6>Phone: {this.props.theUser.phone}</h6>
                            <Link to={`/editUser/${this.props.theUser._id}`} className="btn btn-secondary btn-sm">Edit profile</Link>
                            <Button onClick={() => this.handleDeleteUserModal(true)} variant="danger" size="sm">Delete account</Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <article style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
                            <h2 style={{margin: '0px'}}>My favorites</h2>
                            </article>
                            <hr />
                            {this.state.favorites
                                ?
                                <Row>
                                    {this.state.favorites.map(elm => <ProductCardProfile key={elm._id} productToTarget={id => this.defineTargetProd(id)} removeFromFavs={prod => this.removeFavorite(prod)} product={elm} theUser={this.props.theUser} />)}
                                </Row>
                                :
                                <Loader style={{ display: 'flex', justifyContent: 'center' }} /> 
                            }
                        </Col>
                        <Col>
                            <article style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
                            <h2 style={{margin: '0px'}}>My products</h2>
                            {this.state.products && <Link to='/products/new' className="btn btn-secondary" style={{margin: '0px'}}>Create new product</Link>}
                            </article>
                            <hr />
                            {this.state.products
                                ?
                                <Row>
                                    {this.state.products.map(elm => <ProductCardProfile key={elm._id} showEditProdModal={visib => this.handleEditProdModal(visib)} productToTarget={id => this.defineTargetProd(id)} product={elm} theUser={this.props.theUser} />)}
                                </Row>
                                :
                                <Loader style={{ display: 'flex', justifyContent: 'center' }} />
                            }
                        </Col>
                    </Row>
                </Container>
                
                <PopUp show={this.state.showEditProdModal} hide={() => this.handleEditProdModal(false)} title="Edit product">
                    <EditProduct hideModal={() => this.handleEditProdModal(false)} productId={this.state.prodToTarget} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} />
                </PopUp>

                <PopUpButtons show={this.state.showDeleteUserModal} hide={() => this.handleDeleteUserModal(false)} title="Caution!">
                    <Modal.Body><b>Are you sure you want to delete you account? This action will be irreversible.</b></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleDeleteUserModal(false)}>
                            No, go back
                        </Button>
                        <Button variant="danger" onClick={() => this.deleteUser()}>
                            Yes, delete
                        </Button>
                    </Modal.Footer>
                </PopUpButtons>
            </>
        )
    }
}

export default UserProfile