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
import AdminPageCard from './Admin-page-card'


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
        this.loadLastProducts()
        this.loadLastUsers()
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

    loadLastProducts = () => {
        this.productService
            .getLast5Products()
            .then(prods => this.setState({ products: prods.data }))
            .catch(err => console.log('ERROR GET 5 PRODS', err)) 
    }

    loadLastUsers = () => {
        this.userService
            .getLast5Users()
            .then(users => this.setState({ users: users.data }))
            .catch(err => console.log('ERROR GET 5 USERS', err)) 
    }

    defineTargetElm = elmId => this.setState({ targetElm: elmId })
    
    handlePopups = (target, visib) => this.setState({ [target]: visib })
    
    deleteCategory = id => {
        this.categoryService
            .deleteCategory(id)
            .then(() => {
                this.loadCategories()
                this.handlePopups('delCatModal', false)
                this.handlePopups('delCatToast', true)
            })
            .catch(err => console.log('ERROR DELETING LOCATION', err))
    }

    deleteLocation = id => {
        this.locationService
            .deleteLocation(id)
            .then(() => {
                this.loadLocations()
                this.handlePopups('delLocModal', false)
                this.handlePopups('delLocToast', true)
            })
            .catch(err => console.log('ERROR DELETING LOCATION', err))
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid lightgray'}}>
                            <h1>Welcome to the Admin page, {this.props.theUser.username}</h1>
                            <Link to="/admin/data" className="btn btn-secondary btn-lg" style={{marginTop: '10px'}}>View statistics</Link>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center'}} >
                        <Col sm={12} md={6} lg={4} style={{marginTop: '40px'}}>
                            <h3 style={{marginBottom: '20px'}}>Products</h3>
                            {this.state.products
                                ?
                                this.state.products.map(elm => <AdminPageCard key={elm._id} name={elm.name} image={elm.image} status={elm.status} />)
                                :
                                <Loader />
                            }
                            <Link to="/admin/products" className="btn btn-secondary btn-sm">Manage products</Link>
                        </Col>

                        <Col sm={12} md={6} lg={4} style={{marginTop: '40px'}}>
                            <h3 style={{marginBottom: '20px'}}>Users</h3>
                            {this.state.users
                                ?
                                this.state.users.map(elm => <AdminPageCard key={elm._id} name={elm.username} image={elm.image} id={elm._id} />)
                                :
                                <Loader />
                            }
                            <Link to="/admin/users" className="btn btn-secondary btn-sm">Manage users</Link>
                        </Col>

                        <Col sm={12} md={12} lg={4} >
                            <Row>
                                <Col lg={12} md={6} style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <h3 style={{marginBottom: '0px'}}>Categories</h3>
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

                                <Col lg={12} md={6} style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <h3 style={{marginBottom: '0px'}}>Locations</h3>
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
                    <Toastie show={this.state.delCatToast} handleToast={visib => this.handlePopups('delCatToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Category deleted successfully." />
                    
                    <Toastie show={this.state.editLocToast} handleToast={visib => this.handlePopups('editLocToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Location edited successfully." />
                    <Toastie show={this.state.newLocToast} handleToast={visib => this.handlePopups('newLocToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Location created successfully." />
                    <Toastie show={this.state.delLocToast} handleToast={visib => this.handlePopups('delLocToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Location deleted successfully." />
                
                </Container>

            
                
                {/* CATEGORIES */}

                <PopUp size="lg" show={this.state.categoriesModal} hide={() => this.handlePopups('categoriesModal', false)} title="Categories">
                    <AdminList hideModal={() => this.handlePopups('categoriesModal', false)} handlePopups={this.handlePopups}
                        array={this.state.categories} targetElm={this.defineTargetElm}
                        deleteModal='delCatModal' editModal='editCatModal' newModal='newCatModal' />
                </PopUp>

                <PopUp show={this.state.newCatModal} hide={() => this.handlePopups('newCatModal', false)} title="New category">
                    <NewElm hideModal={() => this.handlePopups('newCatModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('newCatToast', true)}
                        type="category" loadList={this.loadCategories} />
                </PopUp>

                <PopUp show={this.state.editCatModal} hide={() => this.handlePopups('editCatModal', false)} title="Edit category">
                    <EditElm hideModal={() => this.handlePopups('editCatModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('editCatToast', true)}
                        type="category" elm={this.state.targetElm} loadList={this.loadCategories} />
                </PopUp>

                <PopUpConfirm show={this.state.delCatModal} hide={() => this.handlePopups('delCatModal', false)}
                    leftAction={() => this.handlePopups('delCatModal', false)} leftText='No, go back'
                    rightAction={() => this.deleteCategory(this.state.targetElm)} rightText='Yes, delete'
                    type='danger' title="Caution!" body={<b>Are you sure you want to delete this category?</b>}
                />

            
                
                {/* LOCATIONS */}

                <PopUp size="lg" show={this.state.locationsModal} hide={() => this.handlePopups('locationsModal', false)} title="Locations">
                    <AdminList hideModal={() => this.handlePopups('locationsModal', false)} handlePopups={this.handlePopups}
                        array={this.state.locations} targetElm={this.defineTargetElm}
                        deleteModal='delLocModal'  editModal='editLocModal' newModal='newLocModal' />
                </PopUp>

                <PopUp show={this.state.newLocModal} hide={() => this.handlePopups('newLocModal', false)} title="New location">
                    <NewElm hideModal={() => this.handlePopups('newLocModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('newLocToast', true)}
                        type="location" loadList={this.loadLocations} />
                </PopUp>

                <PopUp show={this.state.editLocModal} hide={() => this.handlePopups('editLocModal', false)} title="Edit location">
                    <EditElm hideModal={() => this.handlePopups('editLocModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('editLocToast', true)}
                        type="location" elm={this.state.targetElm} loadList={this.loadLocations} />
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
