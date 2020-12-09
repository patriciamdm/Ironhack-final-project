import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import ProductCard from '../Products/Prod-card'
import PopUp from '../../Shared/Pop-up-modal'
import EmailForm from '../../Shared/Email-form'


import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'

class OthersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            products: undefined,
            showEmailModal: false,
            showWppModal: false
        }
        this.productsService = new ProductService()
        this.userService = new UserService()

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
                                    <Button onClick={() => this.handleEmailModal(true)} variant="secondary" size="sm">Contact via Email</Button>
                                    <a className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer" href={`https://wa.me/+34${this.state.user.phone}?text=Mensaje automático de la Patriapp`}>Contact via WhatsApp</a>
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