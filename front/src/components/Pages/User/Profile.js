import React, { Component } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import ProductCard from '../Products/Prod-card'
import EditProduct from '../Products/Edit-product'
import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.theUser,
            products: undefined,
            showModal: false,
            prodToEdit: undefined
        }
        this.productsService = new ProductService()
    }

    componentDidMount = () => this.loadProducts()

    loadProducts = () => {
        this.productsService
            .getAllProducts()       // FILTER BY OWNER
            .then(myProds => this.setState({ products: myProds.data.filter(elm => elm.owner === this.state.user._id) }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }

    handleModal = visibility => this.setState({ showModal: visibility })

    defineEditProd = prodId => this.setState({ prodToEdit: prodId})

    render() {
        //console.log(this.state.user)
        return (
            <>
                <Container className="profile">
                    <Row className="profile-info">
                        <Col md={3}>
                            <img src={this.state.user.image} alt="User avatar" />
                        </Col>
                        <Col md={9}>
                            <h1>Welcome {this.state.user.username}</h1>
                            <hr/>
                            <h6>Email: {this.state.user.email}</h6>
                            <h6>Phone: {this.state.user.phone}</h6>
                            <Link to={`/editUser/${this.state.user._id}`} className="btn btn-secondary btn-sm">Edit profile</Link>
                            <Link to="/" className="btn btn-secondary btn-sm">Delete profile</Link>
                        </Col>
                    </Row>
                    <br/>
                    <h2>My products</h2>
                    <hr/>
                    <Row>
                        {this.state.products
                            ?
                            this.state.products.map(elm => <ProductCard key={elm._id} showModal={visib => this.handleModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.state.user} />)
                            :
                            <Loader />
                        }
                    </Row>
                </Container>
                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EditProduct hideModal={() => this.handleModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.state.user} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Profile