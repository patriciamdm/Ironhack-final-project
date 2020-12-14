import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import ProductCardProfile from '../Products/Prod-card-profile'
import RatingForm from '../Ratings/Rating-form'
import EditRatingForm from '../Ratings/Edit-rating-form'
import RatingCard from '../Ratings/Rating-card'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
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
            emailModal: false,
            ratingModal: false,
            editRatingModal: false,
            editRatingToast: false,
            rateToTarget: undefined,
            avgRating: undefined
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
            .catch(err => console.log('ERROR GETING USER', err))   
    }

    loadUserInfo = () => {
        this.loadProducts()
        this.loadRatings()
        this.getAverageRating(this.props.match.params.userId)
        this.defineTargetRate(this.state.ratings.filter(elm => elm.rater === this.props.theUser._id)[0])
    }

    loadProducts = () => {
        this.productsService
        .getAllProducts()
        .then(myProds => this.setState({ products: myProds.data.filter(elm => elm.owner === this.state.user._id) }))
        .catch(err => console.log('ERROR GETTING PRODS', err))
    }

    loadRatings = () => {
        this.state.user.rating.forEach(elm => {
            this.ratingService
                .getOneRating(elm)
                .then(rate => {
                    const ratings = [...this.state.ratings, rate.data]
                    this.setState({ratings: ratings})
                })
                .catch(err => console.log('ERROR GETTING RATES', err))
        })
    }

    getAverageRating = userId => {
        this.ratingService
            .getUserRatings(userId)
            .then(rates => {
                const avgRate = (rates.data.reduce((acc, elm) => acc + elm.value.valueOf(), 0)) / (rates.data.length)
                this.setState({ avgRating: isNaN(avgRate.toFixed(2)) ? 'No ratings' : `${avgRate.toFixed(2)} / 5` })
            })
            .catch(err => console.log('ERROR GETTING AVG RATES', err))
    }

    defineTargetRate = rateId => this.setState({rateToTarget: rateId })
    
    handlePopups = (target, visib) => this.setState({ [target]: visib })

    // openEditModal = () => {
    //     this.defineTargetRate(this.state.ratings.filter(elm => elm.rater === this.props.theUser._id)[0]._id)
    //     this.handlePopups('editRatingModal', true)
    // }
    
    addToFavorites = product => {
        const addFav = { likedProducts: [...this.props.theUser.likedProducts, product] }
        const removeFav = { likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== product._id) }
        
        this.userService
        .editUser(this.props.theUser._id, this.props.theUser.likedProducts.includes(product._id) ? removeFav : addFav)
        .then(user => this.userService.getOneUser(user.data._id))
        .then(user => this.props.setUser(user.data))
        .catch(err => console.log('ERROR ADDING/REMOVING FROM FAVS', err))
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
                                    <hr/>
                                    <section style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
                                        <div>
                                            <p><b>Email:</b> {this.state.user.email}</p>
                                            <p><b>Phone:</b> {this.state.user.phone}</p>
                                            <p><b>Average rating:</b> {this.state.avgRating}</p>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <Button onClick={() => this.handlePopups('emailModal', true)} variant="secondary" size="sm">Contact via Email</Button>
                                            <a className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer" href={`https://wa.me/+34${this.state.user.phone}?text=Este es el mensaje automático de Dealz_ para poneros en contacto`}>Contact via WhatsApp</a>
                                        </div>
                                    </section>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                        <h2>Products</h2>
                                    </article>
                                    <hr style={{ marginTop: '10px' }}/>
                                    {this.state.products
                                        ?
                                        <Row>
                                            {this.state.products.map(elm => <ProductCardProfile key={elm._id} addToFavs={prod => this.addToFavorites(prod)} product={elm} theUser={this.props.theUser} />)}
                                        </Row>
                                        :
                                        <Loader style={{ display: 'flex', justifyContent: 'center' }} /> 
                                    }
                                </Col>
                                <Col>
                                    <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                                        <h2>Reviews</h2>
                                        {this.state.rateToTarget
                                            &&
                                            (this.state.rateToTarget.rater === this.props.theUser._id
                                            ?
                                            <Button onClick={() => this.handlePopups('editRatingModal', true)} variant="secondary" size="sm">Edit rating</Button>
                                            :
                                            <Button onClick={() => this.handlePopups('ratingModal', true)} variant="secondary" size="sm">Give rating</Button>)
                                        }
                                    </article>
                                    <hr style={{ marginTop: '10px' }}/>
                                    {this.state.ratings
                                        ?
                                        <Row>
                                            {this.state.ratings.map(elm => <RatingCard key={elm._id} showEditRateModal={visib => this.handlePopups('editRatingModal', visib)} defineTarget={id => this.defineTargetRate(id)} rating={elm} theUser={this.props.theUser} />)}
                                        </Row>
                                        :
                                        <Loader style={{ display: 'flex', justifyContent: 'center' }} />
                                    }
                                </Col>
                            </Row>
                            <Toastie show={this.state.editRatingToast} handleToast={visib => this.handlePopups('editRatingToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Rating updated successfully." />

                        </Container>
                        
                        <PopUp show={this.state.emailModal} hide={() => this.handlePopups('emailModal', false)} title="Send an email">
                            <EmailForm hideModal={() => this.handlePopups('emailModal', false)} loadRatings={() => this.loadRatings()} toUser={this.state.user} fromUser={this.props.theUser} subject=""/>
                        </PopUp>

                        <PopUp show={this.state.ratingModal} hide={() => this.handlePopups('ratingModal', false)} title={`Rate ${this.state.user.username}`}>
                            <RatingForm hideModal={() => this.handlePopups('ratingModal', false)} cleanRatings={() => this.setState({ratings: []})} loadRatings={() => this.loadRatings()} user={this.state.user} theUser={this.props.theUser}/>
                        </PopUp>

                        <PopUp show={this.state.editRatingModal} hide={() => this.handlePopups('editRatingModal', false)} title={`Rate ${this.state.user.username}`}>
                            <EditRatingForm hideModal={() => this.handlePopups('editRatingModal', false)} rateId={this.state.rateToTarget} cleanRatings={() => this.setState({ratings: []})} reloadRatings={() => this.loadRatings()} handleToast={visib => this.handlePopups('editRatingToast', visib)} user={this.state.user} theUser={this.props.theUser}/>
                        </PopUp>
                    </>
                    :
                    <Loader />
                }
            </>
        )
    }
}

export default OthersProfile