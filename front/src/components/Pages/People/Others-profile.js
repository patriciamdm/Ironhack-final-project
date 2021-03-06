import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import ProductCardProfile from '../Products/Prod-card-profile'
import RatingForm from '../Ratings/Rating-form'
import EditRatingForm from '../Ratings/Edit-rating-form'
import RatingCard from '../Ratings/Rating-card'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import PopUpConfirm from '../../Shared/PopUps/Pop-up-confirm'
import Toastie from '../../Shared/PopUps/Toastie'
import EmailForm from '../../Shared/Email-form'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'
import RatingService from '../../../services/rating.service'

class OthersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            products: undefined,
            ratings: [],
            rateToTarget: undefined,
            avgRating: undefined,
            loggedUserRating: false,

            showModal: false,
            modalTitle: undefined,
            showToast: false,
            toastText: undefined,
            showModalConfirm: false,



            emailModal: false,
            ratingModal: false,
            editRatingModal: false,
            editRatingToast: false,
            delRatingModal: false,
            delRatingToast: false,
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
        this.ratingService = new RatingService()
    }

    componentDidMount = () => this.getUser()

    getUser = () => {
        this.userService
            .getOneUser(this.props.match.params.userId)
            .then(user => this.setState({ user: user.data }, () => this.loadUserInfo()))
            .catch(err => new Error('ERROR GETING USER', err))   
    }

    loadUserInfo = () => {
        this.loadProducts()
        this.loadRatings()
        this.getAverageRating(this.props.match.params.userId)
        this.loggedUserRated()
    }

    loadProducts = () => {
        this.productsService
        .getAllProducts()
        .then(myProds => this.setState({ products: myProds.data.filter(elm => elm.owner === this.state.user._id) }))
        .catch(err => new Error('ERROR GETTING PRODS', err))
    }

    loadRatings = () => {
        this.state.user.rating.forEach(elm => {
            this.ratingService
                .getOneRating(elm)
                .then(rate => {
                    const ratings = [...this.state.ratings, rate.data]
                    this.setState({ratings: ratings})
                })
                .catch(err => new Error('ERROR GETTING RATES', err))
        })
    }

    loggedUserRated = () => {
        this.ratingService
            .getRaterRate(this.props.theUser._id, this.state.user._id)
            .then(rate => rate.data && this.setState({ loggedUserRating: true, rateToTarget: rate.data[0]._id }))
            .catch(err => console.log('ERROR GETTING USER RATED', err))
    }

    reloadRatings = () => this.setState({ ratings: [] }, () =>  this.getUser())

    getAverageRating = userId => {
        this.ratingService
            .getUserRatings(userId)
            .then(rates => {
                const avgRate = (rates.data.reduce((acc, elm) => acc + elm.value.valueOf(), 0)) / (rates.data.length)
                this.setState({ avgRating: isNaN(parseFloat(avgRate.toFixed(2))) ? 'No ratings' : `${parseFloat(avgRate.toFixed(2))} / 5` })
            })
            .catch(err => new Error('ERROR GETTING AVG RATES', err))
    }

    deleteRating = () => {
        const newRatings = this.state.user.rating.filter(elm => elm !== this.state.rateToTarget)
        this.userService
            .editUser(this.state.user._id, { rating: newRatings })
            .then(() => this.setState({ ratings: [] }, () => this.getUser()))
            .then(() => this.ratingService.deleteRating(this.state.rateToTarget))
            .then(() => {
                this.handlePopups('showModalConfirm', false)
                this.handlePopups('showToast', true, 'Rating deleted successfully.')
            })
            .catch(err => new Error('ERROR DELETING RATE', err))
    }

    defineTargetRate = rateId => this.setState({rateToTarget: rateId })
    
    handlePopups = (target, visib, content) => {
        target === 'showModal' && this.setState({ [target]: visib, modalTitle: content })
        target === 'showModalConfirm' && this.setState({ [target]: visib, modalTitle: "Caution!" })
        target === 'showToast' && this.setState({ [target]: visib, toastText: content })
    }

    addToFavorites = product => {
        const addFav = { likedProducts: [...this.props.theUser.likedProducts, product] }
        const removeFav = { likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== product._id) }
        
        this.userService
        .editUser(this.props.theUser._id, this.props.theUser.likedProducts.includes(product._id) ? removeFav : addFav)
        .then(user => this.userService.getOneUser(user.data._id))
        .then(user => this.props.setUser(user.data))
        .catch(err => new Error('ERROR ADDING/REMOVING FROM FAVS', err))
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
                                <Col md={9} >
                                    <h1>{this.state.user.username}'s profile</h1>
                                    <hr />
                                    <Row>
                                        <Col sm={8} lg={8} style={{ margin: '10px'}}>
                                            <p><b>Email:</b> {this.state.user.email}</p>
                                            <p><b>Phone:</b> {this.state.user.phone}</p>
                                            <p><b>Average rating:</b> {this.state.avgRating}</p>
                                        </Col>
                                        <Col style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Button onClick={() => this.handlePopups('showModal', true, 'send email')} variant="secondary" size="sm">Contact via Email</Button>
                                            <a className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer" href={`https://wa.me/+34${this.state.user.phone}?text=Este es el mensaje automático de Dealz_ para poneros en contacto`}>Contact via WhatsApp</a>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md={12} lg={6}>
                                    <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                        <h2>Products</h2>
                                    </article>
                                    <hr style={{ marginTop: '10px' }}/>
                                    {this.state.products
                                        ?
                                        <Row style={{maxHeight: '1250px', overflowY: 'scroll'}} >
                                            {this.state.products.map(elm => <ProductCardProfile key={elm._id} addToFavs={prod => this.addToFavorites(prod)} product={elm} theUser={this.props.theUser} />)}
                                        </Row>
                                        :
                                        <Loader style={{ display: 'flex', justifyContent: 'center' }} /> 
                                    }
                                </Col>
                                <Col md={12} lg={6}>
                                    <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                        <h2>Reviews</h2>
                                        {this.state.loggedUserRating
                                            ?
                                            <Button onClick={() => this.handlePopups('showModal', true, 'edit rate')} variant="secondary" size="sm">Edit rating</Button>
                                            :
                                            <Button onClick={() => this.handlePopups('showModal', true, `rate ${this.state.user.username}`)} variant="secondary" size="sm">Give rating</Button>
                                        }
                                    </article>
                                    <hr style={{ marginTop: '10px' }}/>
                                    {this.state.ratings
                                        ?
                                        <Row style={{maxHeight: '1250px', overflowY: 'scroll'}} >
                                            {this.state.ratings.map(elm => <RatingCard key={elm._id} showModal={(target, text) => this.handlePopups(target, true, text)} defineTarget={id => this.defineTargetRate(id)} rating={elm} theUser={this.props.theUser} />)}
                                        </Row>
                                        :
                                        <Loader style={{ display: 'flex', justifyContent: 'center' }} />
                                    }
                                </Col>
                            </Row>

                            <Toastie show={this.state.showToast} handleToast={visib => this.handlePopups('showToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText={this.state.toastText} />

                        </Container>


                        <PopUp show={this.state.showModal} hide={() => this.handlePopups('showModal', false)} title={this.state.modalTitle}>

                            {this.state.modalTitle === 'send email' && <EmailForm hideModal={() => this.handlePopups('showModal', false)}
                                toUser={this.state.user} fromUser={this.props.theUser} subject="" />}
                            
                            {this.state.modalTitle === `rate ${this.state.user.username}` && <RatingForm hideModal={() => this.handlePopups('showModal', false)}
                                reloadRatings={() => this.reloadRatings()} user={this.state.user} theUser={this.props.theUser} />}
                            
                            {this.state.modalTitle === 'edit rate' && <EditRatingForm hideModal={() => this.handlePopups('showModal', false)}
                                rateId={this.state.rateToTarget} reloadRatings={() => this.reloadRatings()} handleToast={visib => this.handlePopups('showToast', visib, 'Rating edited successfully.')}
                                user={this.state.user} theUser={this.props.theUser} />}

                        </PopUp>

                        <PopUpConfirm show={this.state.showModalConfirm} hide={() => this.handlePopups('showModalConfirm', false)}
                            leftAction={() => this.handlePopups('showModalConfirm', false)} leftText='No, go back'
                            rightAction={() => this.deleteRating()} rightText='Yes, delete'
                            type='danger' title="Caution!" body={<b>Are you sure you want to delete this rating?</b>}
                            />
                    </>
                    :
                    <Loader />
                }
            </>
        )
    }
}

export default OthersProfile