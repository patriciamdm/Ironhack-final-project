import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import ProductCardProfile from '../Products/Prod-card-profile'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import EditProduct from '../Products/Edit-product'
import PopUpConfirm from '../../Shared/PopUps/Pop-up-confirm'
import Toastie from '../../Shared/PopUps/Toastie'
import NewProduct from '../Products/New-product'
import EditUser from './Edit-profile'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'
import RatingService from '../../../services/rating.service'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            favorites: [],
            avgRating: undefined,
            prodToTarget: undefined,
            showModal: false,
            modalTitle: undefined,
            showToast: false,
            toastText: undefined,
            showModalConfirm: false,
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
        this.ratingService = new RatingService()
    }

    componentDidMount = () => {
        this.loadProducts()
        this.loadFavorites()
        this.getAverageRating(this.props.theUser._id)
    }

    loadProducts = () => {
        this.productsService
            .getProductsByOwner(this.props.theUser._id)
            .then(allProds => this.setState({ products: allProds.data }))
            .catch(err => new Error('ERROR GET ALL PRODS', err))
    }
    
    loadFavorites = () => {
        this.props.theUser.likedProducts.forEach(elm => {
            this.productsService
                .getOneProduct(elm)
                .then(prod => this.setState({ favorites: [...this.state.favorites, prod.data] }))
                .catch(err => new Error('ERROR GET FAV', err))
        })
    }
    
    getAverageRating = userId => {
        this.ratingService
            .getUserRatings(userId)
            .then(rates => {
                const avgRate = (rates.data.reduce((acc, elm) => acc + elm.value.valueOf(), 0)) / (rates.data.length)
                this.setState({ avgRating: isNaN(parseFloat(avgRate.toFixed(2))) ? 'No ratings' : `${parseFloat(avgRate.toFixed(2))}/5` })
            })
            .catch(err => new Error('ERROR GETTING AVG RATES', err))
    }
    
    defineTargetProd = prodId => this.setState({ prodToTarget: prodId })

    handlePopups = (target, visib, content) => {
        target === 'showModal' && this.setState({ [target]: visib, modalTitle: content })
        target === 'showModalConfirm' && this.setState({ [target]: visib, modalTitle: "Caution!" })
        target === 'showToast' && this.setState({ [target]: visib, toastText: content })
    }

    
    handleSubmitEditUserModal = () => {
        this.handlePopups('showModal', false)
        this.handlePopups('showToast', true, 'Profile updated successfully.')
    }

    deleteUser = () => {
        this.userService
            .deleteUser(this.props.theUser._id)
            .then(() => this.props.setUser(undefined))
            .then(() => {
                this.props.history.push('/')
                this.props.handleToast()
            })
            .catch(err => new Error('ERROR DELETING USER', err))
    }

    removeFavorite = prodId => {
        const removeFav = {likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== prodId)}

        this.userService
            .editUser(this.props.theUser._id, removeFav)
            .then(user => this.userService.getOneUser(user.data._id))
            .then(user => this.props.setUser(user.data))
            .then(() => this.setState({ favorites: [] }))
            .then(() => this.loadFavorites())
            .catch(err => new Error('ERROR REMOVING FROM FAVS', err))
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
                            <hr />
                            <Row>
                                <Col sm={8} lg={8} style={{ margin: '10px'}}>
                                    <p><b>Email:</b> {this.props.theUser.email}</p>
                                    <p><b>Phone:</b> {this.props.theUser.phone}</p>
                                    <p><b>Average rating:</b> {this.state.avgRating}</p>
                                </Col>
                                <Col style={{display: 'flex', flexDirection: 'column'}}>
                                    <Button onClick={() => this.handlePopups('showModal', true, 'edit profile')} variant="secondary" size="sm">Edit profile</Button>
                                    <Button onClick={() => this.handlePopups('showModalConfirm', true)} variant="danger" size="sm">Delete account</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={12} lg={6}>
                            <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                <h2>My favorites</h2>
                            </article>
                            <hr style={{ marginTop: '10px' }}/>
                            {this.state.favorites
                                ?
                                <Row style={{maxHeight: '1250px', overflowY: 'scroll'}} >
                                    {this.state.favorites.map(elm => <ProductCardProfile key={elm._id} productToTarget={id => this.defineTargetProd(id)} removeFromFavs={prodId => this.removeFavorite(prodId)} product={elm} theUser={this.props.theUser} />)}
                                </Row>
                                :
                                <Loader style={{ display: 'flex', justifyContent: 'center' }} /> 
                            }
                        </Col>
                        <Col md={12} lg={6}>
                            <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                <h2>My products</h2>
                                <Button onClick={() => this.handlePopups('showModal', true, 'create product')} variant="secondary" size="sm">Create new product</Button>
                            </article>
                            <hr style={{ marginTop: '10px' }}/>
                            {this.state.products
                                ?
                                <Row style={{maxHeight: '1250px', overflowY: 'scroll'}} >
                                    {this.state.products.map(elm => <ProductCardProfile key={elm._id} showEditProdModal={visib => this.handlePopups('showModal', visib, 'edit product')} productToTarget={id => this.defineTargetProd(id)} product={elm} theUser={this.props.theUser} />)}
                                </Row>
                                :
                                <Loader style={{ display: 'flex', justifyContent: 'center' }} />
                            }
                        </Col>
                    </Row>

                    <Toastie show={this.state.showToast} handleToast={visib => this.handlePopups('showToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText={this.state.toastText} />
                
                </Container>
                


                <PopUp show={this.state.showModal} hide={() => this.handlePopups('showModal', false)} title={this.state.modalTitle}>
                
                    {this.state.modalTitle === 'edit profile' && <EditUser hideModal={() => this.handlePopups('showModal', false)} theUser={this.props.theUser}
                        setUser={this.props.setUser} handleModal={this.handleSubmitEditUserModal} />}
                    
                    {this.state.modalTitle === 'edit product' && <EditProduct hideModal={() => this.handlePopups('showModal', false)} productId={this.state.prodToTarget}
                        reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('showToast', visib, 'Product updated successfully.')} />}

                    {this.state.modalTitle === 'create product' && <NewProduct hideModal={() => this.handlePopups('newProdModal', false)} reloadProducts={() => this.loadProducts()}
                        theUser={this.props.theUser} handleToast={visib => this.handlePopups('showToast', visib, 'Product created successfully.')} />}

                </PopUp>

                <PopUpConfirm show={this.state.showModalConfirm} hide={() => this.handlePopups('showModalConfirm', false)}
                    leftAction={() => this.handlePopups('showModalConfirm', false)} leftText='No, go back'
                    rightAction={() => this.deleteUser()} rightText='Yes, delete'
                    type='danger' title="Caution!" body={<b>Are you sure you want to delete you account? This action will be irreversible.</b>}
                    />
            </>
        )
    }
}

export default UserProfile