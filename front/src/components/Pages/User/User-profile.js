import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import ProductCardProfile from '../Products/Prod-card-profile'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import EditProduct from '../Products/Edit-product'
import PopUpConfirm from '../../Shared/PopUps/Pop-up-confirm'
import Toastie from '../../Shared/PopUps/Toastie'
import NewProduct from '../Products/New-product'

import Chat from '../../Chat/Chat'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'
import EditUser from './Edit-profile'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            favorites: [],
            prodToTarget: undefined,
            editUserModal: false,
            editUserToast: false,
            deleteUserModal: false,
            editProdModal: false,
            editProdToast: false,
            newProdToast: false
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
            .getProductsByOwner(this.props.theUser._id)
            .then(allProds => this.setState({ products: allProds.data }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }
    
    loadFavorites = () => {
        
        this.props.theUser.likedProducts.forEach(elm => {
            this.productsService
                .getOneProduct(elm)
                .then(prod => this.setState({ favorites: [...this.state.favorites, prod.data] }))
                .catch(err => console.log('ERROR GET FAV', err))
        })

        // this.productsService
        //     .getAllProducts()
        //     .then(allProds => this.setState({ favorites: allProds.data.filter(elm => this.props.theUser.likedProducts.includes(elm._id)) }))
        //     .catch(err => console.log('ERROR GET FAVS', err))
    }
    
    defineTargetProd = prodId => this.setState({ prodToTarget: prodId })

    handlePopups = (target, visib) => this.setState({[target]: visib})
    
    handleSubmitEditUserModal = () => {
        this.handlePopups('editUserModal', false)
        this.handlePopups('editUserToast', true)
    }

    deleteUser = () => {
        this.userService
            .deleteUser(this.props.theUser._id)
            .then(() => this.props.setUser(undefined))
            .then(() => {
                this.props.history.push('/')
                this.props.handleToast()
            })
            .catch(err => console.log('ERROR DELETING USER', err))
    }

    removeFavorite = prodId => {
        const removeFav = {likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== prodId)}

        this.userService
            .editUser(this.props.theUser._id, removeFav)
            .then(user => this.userService.getOneUser(user.data._id))
            .then(user => this.props.setUser(user.data))
            .then(() => this.setState({ favorites: [] }))
            .then(() => this.loadFavorites())
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
                            <Button onClick={() => this.handlePopups('editUserModal', true)} variant="secondary" size="sm">Edit profile</Button>
                            <Button onClick={() => this.handlePopups('deleteUserModal', true)} variant="danger" size="sm">Delete account</Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                <h2>My favorites</h2>
                            </article>
                            <hr style={{ marginTop: '10px' }}/>
                            {this.state.favorites
                                ?
                                <Row>
                                    {this.state.favorites.map(elm => <ProductCardProfile key={elm._id} productToTarget={id => this.defineTargetProd(id)} removeFromFavs={prodId => this.removeFavorite(prodId)} product={elm} theUser={this.props.theUser} />)}
                                </Row>
                                :
                                <Loader style={{ display: 'flex', justifyContent: 'center' }} /> 
                            }
                        </Col>
                        <Col>
                            <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                <h2>My products</h2>
                                <Button onClick={() => this.handlePopups('newProdModal', true)} variant="secondary" size="sm">Create new product</Button>
                            </article>
                            <hr style={{ marginTop: '10px' }}/>
                            {this.state.products
                                ?
                                <Row>
                                    {this.state.products.map(elm => <ProductCardProfile key={elm._id} showEditProdModal={visib => this.handlePopups('editProdModal', visib)} productToTarget={id => this.defineTargetProd(id)} product={elm} theUser={this.props.theUser} />)}
                                </Row>
                                :
                                <Loader style={{ display: 'flex', justifyContent: 'center' }} />
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Chat />
                        </Col>
                    </Row>
                    <Toastie show={this.state.editUserToast} handleToast={visib => this.handlePopups('editUserToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Profile updated successfully." />
                    <Toastie show={this.state.editProdToast} handleToast={visib => this.handlePopups('editProdToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Product updated successfully." />
                    <Toastie show={this.state.newProdToast} handleToast={visib => this.handlePopups('newProdToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Product created successfully." />
                </Container>
                
                <PopUp show={this.state.editUserModal} hide={() => this.handlePopups('editUserModal', false)} title="Edit profile">
                    <EditUser hideModal={() => this.handlePopups('editUserModal',false)} theUser={this.props.theUser} setUser={this.props.setUser} handleModal={this.handleSubmitEditUserModal} />
                </PopUp>

                <PopUp show={this.state.editProdModal} hide={() => this.handlePopups('editProdModal', false)} title="Edit product">
                    <EditProduct hideModal={() => this.handlePopups('editProdModal', false)} productId={this.state.prodToTarget} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('editProdToast', visib)} />
                </PopUp>

                <PopUp show={this.state.newProdModal} hide={() => this.handlePopups('newProdModal', false)} title="Create a product">
                    <NewProduct hideModal={() => this.handlePopups('newProdModal', false)} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('newProdToas', visib)} />
                </PopUp>

                <PopUpConfirm show={this.state.deleteUserModal} hide={() => this.handlePopups('deleteUserModal', false)}
                    leftAction={() => this.handlePopups('deleteUserModal', false)} leftText='No, go back'
                    rightAction={() => this.deleteUser()} rightText='Yes, delete'
                    type='danger' title="Caution!" body={<b>Are you sure you want to delete you account? This action will be irreversible.</b>}
                    />
            </>
        )
    }
}

export default UserProfile