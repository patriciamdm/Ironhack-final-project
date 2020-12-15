import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Loader from '../../Shared/Spinner'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import PopUpConfirm from '../../Shared/PopUps/Pop-up-confirm'
import Toastie from '../../Shared/PopUps/Toastie'

import AdminList from './Lists/Admin-list'
import NewElm from './Lists/New-element'
import EditElm from './Lists/Edit-element'


import CategoryService from '../../../services/category.service'
import LocationService from '../../../services/location.service'
import UserService from '../../../services/user.service'
import ProductService from '../../../services/products.service'


class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: undefined,
            locations: undefined,
            products: undefined,
            users: undefined,
            targetElm: undefined,
            categoriesModal: false,
            editCatModal: false,
            editCatToast: false,
            newCatModal: false,
            newCatToast: false,
            delCatModal: false,
            delCatToast: false,
            locationsModal: false,
            editLocModal: false,
            editLocToast: false,
            newLocModal: false,
            newLocToast: false,
            delLocModal: false,
            delLocToast: false
        }
        this.categoryService = new CategoryService()
        this.locationService = new LocationService()
        this.productService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.loadCategories()
        this.loadLocations()
    }

    loadCategories = () => {
        this.categoryService
            .getAllCategories()
            .then(categs => this.setState({ categories: categs.data }))
            .catch(err => console.log('ERROR GET CATEGS', err))        
    }

    loadLocations = () => {
        this.locationService
            .getAllLocations()
            .then(locs => this.setState({ locations: locs.data }))
            .catch(err => console.log('ERROR GET LOCATIONS', err))        
    }

    defineTargetElm = elmId => this.setState({ targetElm: elmId })
    
    handlePopups = (target, visib) => this.setState({ [target]: visib })
    
    deleteCategory = id => console.log('delete', id)

    deleteLocation = id => console.log('location', id)

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <h1>Welcome to the Admin page, {this.props.theUser.username}</h1>
                            <hr />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center'}} >
                        <Col sm={12} md={6} lg={4} >
                            <h3>Products</h3>
                            <Link to="/admin/products" className="btn btn-secondary btn-sm">Manage products</Link>
                        </Col>

                        <Col sm={12} md={6} lg={4} >
                            <h3>Users</h3>
                            <Link to="/admin/users" className="btn btn-secondary btn-sm">Manage users</Link>
                        </Col>

                        <Col sm={12} md={12} lg={3} >
                            <Row>
                                <Col lg={12} md={6} style={{marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <h3>Categories</h3>
                                {this.state.categories
                                    ?
                                    <article className="admin-list">
                                        {this.state.categories.map(elm => <p key={elm._id} style={{ textTransform: 'capitalize', margin: '5px 0px' }}>{elm.name}</p>)}
                                    </article>
                                    :
                                    <Loader />
                                    }
                                    <Button variant="secondary" size="sm" onClick={() => this.handlePopups('categoriesModal', true)}>Manage categories</Button>
                                </Col>

                                <Col lg={12} md={6} style={{marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <h3>Locations</h3>
                                {this.state.locations
                                    ?
                                    <article className="admin-list">
                                        {this.state.locations.map(elm => <p key={elm._id} style={{ textTransform: 'capitalize', margin: '5px 0px' }}>{elm.name}</p>)}
                                    </article>
                                    :
                                    <Loader />
                                }
                                <Button variant="secondary" size="sm" onClick={() => this.handlePopups('locationsModal', true)}>Manage locations</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Toastie show={this.state.editCatToast} handleToast={visib => this.handlePopups('editCatToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Category edited successfully." />
                    <Toastie show={this.state.newCatToast} handleToast={visib => this.handlePopups('newCatToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Category created successfully." />
                </Container>

                <PopUp size="lg" show={this.state.categoriesModal} hide={() => this.handlePopups('categoriesModal', false)} title="Categories">
                    <AdminList hideModal={() => this.handlePopups('categoriesModal', false)} handlePopups={this.handlePopups}
                        array={this.state.categories} targetElm={this.defineTargetElm}
                        deleteModal='delCatModal' deleteToast='delCatToast'
                        editModal='editCatModal' editToast='editCatToast'
                        newModal='newCatModal' newToast='newCatToast' />
                </PopUp>

                <PopUp show={this.state.newCatModal} hide={() => this.handlePopups('newCatModal', false)} title="New category">
                    <NewElm hideModal={() => this.handlePopups('newCatModal', false)} handlePopups={this.handlePopups}
                        elm="category"
                    />
                </PopUp>

                <PopUp show={this.state.editCatModal} hide={() => this.handlePopups('editCatModal', false)} title="Edit category">
                    <EditElm hideModal={() => this.handlePopups('editCatModal', false)} handlePopups={this.handlePopups}
                        elm="category"
                    />
                </PopUp>

                <PopUpConfirm show={this.state.delCatModal} hide={() => this.handlePopups('delCatModal', false)}
                    leftAction={() => this.handlePopups('delCatModal', false)} leftText='No, go back'
                    rightAction={() => this.deleteCategory(this.state.targetElm)} rightText='Yes, delete'
                    type='danger' title="Caution!" body={<b>Are you sure you want to delete this category?</b>}
                    />

                <PopUp size="lg" show={this.state.locationsModal} hide={() => this.handlePopups('locationsModal', false)} title="Locations">
                    <AdminList hideModal={() => this.handlePopups('locationsModal', false)} handlePopups={this.handlePopups}
                        array={this.state.locations} targetElm={this.defineTargetElm}
                        deleteModal='delLocModal' deleteToast='delLocToast'
                        editModal='editLocModal' editToast='editLocToast'
                        newModal='newLocModal' newToast='newLocToast' />
                </PopUp>

                <PopUp show={this.state.newLocModal} hide={() => this.handlePopups('newLocModal', false)} title="New location">
                    <NewElm hideModal={() => this.handlePopups('newLocModal', false)} handlePopups={this.handlePopups}
                        elm="location"
                    />
                </PopUp>

                <PopUp show={this.state.editLocModal} hide={() => this.handlePopups('editLocModal', false)} title="Edit location">
                    <EditElm hideModal={() => this.handlePopups('editLocModal', false)} handlePopups={this.handlePopups}
                        elm="location"
                    />
                </PopUp>
                
                <PopUpConfirm show={this.state.delLocModal} hide={() => this.handlePopups('delLocModal', false)}
                    leftAction={() => this.handlePopups('delLocModal', false)} leftText='No, go back'
                    rightAction={() => this.deleteLocation(this.state.targetElm)} rightText='Yes, delete'
                    type='danger' title="Caution!" body={<b>Are you sure you want to delete this location?</b>}
                    />
            </>
        )
    }
}

export default AdminPage
