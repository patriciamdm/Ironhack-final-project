import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
//import Rating from '@material-ui/lab/Rating'

import Loader from '../../Shared/Spinner'
import ProductCard from '../Products/Prod-card'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import EmailForm from '../../Shared/Email-form'


import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'
// import RatingService from '../../../services/rating.service'


class OthersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            products: undefined,
            showEmailModal: false,
            showWppModal: false,
            rating: ''
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
        //this.ratingService = new RatingService()
    }

    componentDidMount = () => this.getUser()

    getUser = () => {
        this.userService
            .getOneUser(this.props.match.params.userId)
            .then(user => this.setState({ user: user.data }, () => this.loadProducts()))
            .catch(err => console.log('ERROR GETING USER', err))   
    }

    
    loadProducts = () => {
        this.productsService
        .getAllProducts()
        .then(myProds => this.setState({ products: myProds.data.filter(elm => elm.owner === this.state.user._id) }))
        .catch(err => console.log('ERROR GETTING PRODS', err))
    }
    
    handleEmailModal = visib => this.setState({ showEmailModal: visib })
    handleWppModal = visib => this.setState({showWppModal: visib})
    
    handleRateInput = e => this.setState({ [e.target.name]: e.target.value })
    handleRateSubmit = e => {
        e.preventDefault()
        console.log('RATING', this.state.rating)
        //this.giveRating()
        this.state.user.ratings.filter(elm => elm.rater === this.props.theUser._id).length() === 1 && this.editRating()
        this.state.user.ratings.filter(elm => elm.rater === this.props.theUser._id).length() === 0 && this.newRating()()
    }

    // getRating = () => {
    //     const allRates = this.state.user.ratings.reduce((acc, elm) => (acc + elm.ratingValue), 0)
    //     const avgRate = allRates / this.state.user.ratings.length()
        
    //     console.log('allrates', allRates, 'avgrate', avgRate)

    //     this.setState({rating: avgRate})
    // }


    // getRating = () => {
    //     this.ratingService
    //         .getUserRating(this.state.user._id)
    //         .then()
    //         .catch(err => console.log('ERROR GETTING RATING', err))
    // }
        
    
    // giveRating = () => {
    //     const ratingInfo = { raterId: this.props.theUser._id, ratedId: this.state.user._id, ratingValue: this.state.rating }

    //     this.ratingService
    //         .giveRating(ratingInfo)
    //         .then(rate => this.userService.editUser(this.state.user._id, { rating: [...this.state.user.rating, rate.data] }))
    //         .catch(err => console.log('ERROR GIVING RATING', err))
        
        
    //     // const rate = this.state.user.rating.filter(elm => elm.rater === this.props.theUser && elm.rated === this.state.user._id)
    //     // console.log('rate', rate)
    // }

    newRating = () => {
        const newRate = { rater: this.props.theUser._id, ratingValue: this.state.rating }
        const propInfo = { ratings: [...this.state.user.ratings, newRate] }

        this.userService
            .editUser(this.state.user._id, propInfo)
            .then(() => {
                this.props.history.push('/')
                this.props.history.push(`/profile/${this.state.user._id}`)
                console.log(this.state.user)
            })
            .catch(err => console.log('ERROR IN NEW RATING', err))
    }

    editRating = () => {
        const newRate = { rater: this.props.theUser._id, ratingValue: this.state.rating }
        const editRatings = this.state.user.ratings.filter(elm => elm.rater !== this.props.theUser._id)
        const propInfo = { ratings: [...editRatings, newRate] }

        this.userService
            .editUser(this.state.user._id, propInfo)
            .then(() => {
                this.props.history.push('/')
                this.props.history.push(`/profile/${this.state.user._id}`)
                console.log(this.state.user)
            })
            .catch(err => console.log('ERROR IN NEW RATING', err))
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
                                <Col md={9}>
                                    <h1>{this.state.user.username}'s profile</h1>
                                    <hr/>
                                    <h6>Email: {this.state.user.email}</h6>
                                    <h6>Phone: {this.state.user.phone}</h6>
                                    {/* <Rating name="size-medium" defaultValue={this.state.user} precision={1} /> */}

                                    {/* <Form onSubmit={this.handleRateSubmit}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as="select" name="rating" value={this.state.ratingValue} onChange={this.handleRateInput} >
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                            </Form.Control>
                                        </Form.Group>    
                                        <Button variant="secondary" type="submit">Submit</Button>
                                    </Form> */}

                                    <br/>
                                    <Button onClick={() => this.handleEmailModal(true)} variant="secondary" size="sm">Contact via Email</Button>
                                    <a className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer" href={`https://wa.me/+34${this.state.user.phone}?text=Este es el mensaje automático de Dealz_ para poneros en contacto`}>Contact via WhatsApp</a>
                                </Col>
                            </Row>
                            <br/>
                            <h2>Products</h2>
                            <hr/>
                            <Row>
                                {this.state.products
                                    ?
                                    this.state.products.map(elm => <ProductCard key={elm._id} showModal={visib => this.handleModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.props.theUser} />)
                                    :
                                    <Loader />
                                }
                            </Row>
                        </Container>
                        
                        <PopUp show={this.state.showEmailModal} hide={() => this.handleEmailModal(false)} title="Send an email">
                            <EmailForm hideModal={() => this.handleEmailModal(false)} toUser={this.state.user} fromUser={this.props.theUser} subject=""/>
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