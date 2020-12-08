import React, { Component } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../../Shared/Spinner'
import ProductCard from '../Products/Prod-card'
import PopUp from '../../Shared/Pop-up-modal'
import EditProduct from '../Products/Edit-product'
import PopUpButtons from '../../Shared/Pop-up-buttons'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'


class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.theUser,
            products: undefined,
            showEditProdModal: false,
            prodToEdit: undefined,
            showDeleteUserModal: false
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => this.loadProducts()

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then(myProds => this.setState({ products: myProds.data.filter(elm => elm.owner === this.state.user._id) }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }

    handleEditProdModal = visibility => this.setState({ showEditProdModal: visibility })

    handleDeleteUserModal = visibility => this.setState({ showDeleteUserModal: visibility })

    defineEditProd = prodId => this.setState({ prodToEdit: prodId })
    
    deleteUser = () => {
        this.userService
            .deleteUser(this.state.user._id)
            .then(() => this.props.history.push('/'))
            .catch(err => console.log('ERROR DELETING USER', err))
    }

    render() {
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
                            <Button onClick={() => this.handleDeleteUserModal(true)} variant="danger" size="sm">Delete account</Button>
                        </Col>
                    </Row>
                    <br />
                    <article style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
                    <h2 style={{margin: '0px'}}>My products</h2>
                    {this.state.products && <Link to='/products/new' className="btn btn-secondary" style={{margin: '0px'}}>Create new product</Link>}
                    </article>
                    <hr/>
                    <Row>
                        {this.state.products
                            ?
                            this.state.products.map(elm => <ProductCard key={elm._id} showEditProdModal={visib => this.handleEditProdModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.state.user} />)
                            :
                            <Loader />
                        }
                    </Row>
                </Container>
                
                <PopUp show={this.state.showEditProdModal} hide={() => this.handleEditProdModal(false)} title="Edit product">
                    <EditProduct hideModal={() => this.handleEditProdModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.state.user} />
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