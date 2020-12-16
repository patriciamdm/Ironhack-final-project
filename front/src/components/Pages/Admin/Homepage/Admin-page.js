import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PopUp from '../../../Shared/PopUps/Pop-up-modal'
import PopUpConfirm from '../../../Shared/PopUps/Pop-up-confirm'
import Toastie from '../../../Shared/PopUps/Toastie'


import AdminProductsList from './Admin-product-list'
import AdminUserList from './Admin-user-list'
import AdminCategoryList from './Admin-category-list'
import AdminLocationList from './Admin-location-list'

import AdminList from '../Lists/Admin-list'
import NewElm from '../Lists/New-element'
import EditElm from '../Lists/Edit-element'


import CategoryService from '../../../../services/category.service'
import LocationService from '../../../../services/location.service'


class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetElm: undefined,
            categories: undefined,
            locations: undefined,
            showModal: false,
            modalTitle: undefined,
            showModalConfirm: false,
            modalConfirmType: undefined,
            modalConfirmText: undefined,
            showToast: false,
            toastText: undefined
        }
        this.categoryService = new CategoryService()
        this.locationService = new LocationService()
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

    defineContent = (content, target) => this.setState({ [target]: content})

    defineTargetElm = elmId => this.setState({ targetElm: elmId })
    
    handlePopups = (target, visib, content) => {
        target === 'showModal' && this.setState({ [target]: visib, modalTitle: content })
        target === 'showModalConfirm' && this.setState({ [target]: visib, modalTitle: "Caution!" })
        target === 'showToast' && this.setState({ [target]: visib, toastText: content })
    }

    deleteElement = (type, id) => {

        type === 'category'
            &&
            this.categoryService
                .deleteCategory(id)
                .then(() => {
                    this.loadCategories()
                    this.handlePopups('showModalConfirm', false)
                    this.handlePopups('showToast', true, 'Category deleted successfully.')
                })
                .catch(err => console.log('ERROR DELETING LOCATION', err))
        
        type === 'location'
            &&
            this.locationService
                .deleteLocation(id)
                .then(() => {
                    this.loadLocations()
                    this.handlePopups('showModalConfirm', false)
                    this.handlePopups('showToast', true, 'Location deleted successfully.')
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
                    <Row style={{ textAlign: 'center' }} >
                        
                        <Col sm={12} md={6} lg={4} style={{marginTop: '40px'}}>
                            <AdminProductsList />
                        </Col>

                        <Col sm={12} md={6} lg={4} style={{marginTop: '40px'}}>
                            <AdminUserList />
                        </Col>

                        <Col sm={12} md={12} lg={4} >
                            <Row>
                                <Col lg={12} md={6} style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <AdminCategoryList categories={this.state.categories} categoriesModal={() => this.handlePopups('showModal', true, 'categories')} />
                                </Col>

                                <Col lg={12} md={6} style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <AdminLocationList locations={this.state.locations} locationsModal={() => this.handlePopups('showModal', true, 'locations')} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    <Toastie show={this.state.showToast} handleToast={visib => this.handlePopups('showToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText={this.state.toastText} />
                
                </Container>


                <PopUp size="lg" show={this.state.showModal} hide={() => this.handlePopups('showModal', false)} title={this.state.modalTitle}>
                    
                    {this.state.modalTitle === 'categories' && <AdminList hideModal={() => this.handlePopups('showModal', false)} handlePopups={this.handlePopups}
                        array={this.state.categories} targetElm={this.defineTargetElm} editModal='edit category' newModal='new category'
                        setDeleteModal={() => this.setState({modalConfirmType: 'category', modalConfirmText: 'Are you sure you want to delete this category?' })} />}

                    {this.state.modalTitle === 'locations' && <AdminList hideModal={() => this.handlePopups('showModal', false)} handlePopups={this.handlePopups}
                        array={this.state.locations} targetElm={this.defineTargetElm} editModal='edit location' newModal='new location'
                        setDeleteModal={() => this.setState({ modalConfirmType: 'location', modalConfirmText: 'Are you sure you want to delete this location?' })} />}

                    {this.state.modalTitle === 'new category' && <NewElm hideModal={() => this.handlePopups('showModal', false)} handlePopups={this.handlePopups}
                        handleToast={() => this.handlePopups('showToast', true, 'Category created successfully.')} type="category" loadList={this.loadCategories} />}

                    {this.state.modalTitle === 'new location' && <NewElm hideModal={() => this.handlePopups('showModal', false)} handlePopups={this.handlePopups}
                        handleToast={() => this.handlePopups('showToast', true, 'Location created successfully.')} type="location" loadList={this.loadLocations} />}
                    
                    {this.state.modalTitle === 'edit category' && <EditElm hideModal={() => this.handlePopups('showModal', false)} handlePopups={this.handlePopups}
                        handleToast={() => this.handlePopups('showToast', true, 'Category edited successfully.')} type="category" elm={this.state.targetElm} loadList={this.loadCategories} />}

                    {this.state.modalTitle === 'edit location' && <EditElm hideModal={() => this.handlePopups('showModal', false)} handlePopups={this.handlePopups}
                        handleToast={() => this.handlePopups('showToast', true, 'Location edited successfully.')} type="location" elm={this.state.targetElm} loadList={this.loadLocations} />}

                </PopUp>


                <PopUpConfirm show={this.state.showModalConfirm} hide={() => this.handlePopups('showModalConfirm', false)} title={this.state.modalTitle} type='danger'
                    body={this.state.modalConfirmText} leftText='No, go back' rightText='Yes, delete' leftAction={() => this.handlePopups('showModalConfirm', false)}
                    rightAction={() => this.deleteElement(this.state.modalConfirmType, this.state.targetElm)} />

            </>
        )
    }
}

export default AdminPage






// {/* CATEGORIES */}

//                 <PopUp size="lg" show={this.state.categoriesModal} hide={() => this.handlePopups('categoriesModal', false)} title="Categories">
//                     <AdminList hideModal={() => this.handlePopups('categoriesModal', false)} handlePopups={this.handlePopups}
//                         array={this.state.categories} targetElm={this.defineTargetElm}
//                         deleteModal='delCatModal' editModal='editCatModal' newModal='newCatModal' />
//                 </PopUp>

//                 <PopUp show={this.state.newCatModal} hide={() => this.handlePopups('newCatModal', false)} title="New category">
//                     <NewElm hideModal={() => this.handlePopups('newCatModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('newCatToast', true)}
//                         type="category" loadList={this.loadCategories} />
//                 </PopUp>

//                 <PopUp show={this.state.editCatModal} hide={() => this.handlePopups('editCatModal', false)} title="Edit category">
//                     <EditElm hideModal={() => this.handlePopups('editCatModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('editCatToast', true)}
//                         type="category" elm={this.state.targetElm} loadList={this.loadCategories} />
//                 </PopUp>

//                 <PopUpConfirm show={this.state.delCatModal} hide={() => this.handlePopups('delCatModal', false)}
//                     leftAction={() => this.handlePopups('delCatModal', false)} leftText='No, go back'
//                     rightAction={() => this.deleteCategory(this.state.targetElm)} rightText='Yes, delete'
//                     type='danger' title="Caution!" body={<b>Are you sure you want to delete this category?</b>}
//                 />

            
                
//                 {/* LOCATIONS */}

//                 <PopUp size="lg" show={this.state.locationsModal} hide={() => this.handlePopups('locationsModal', false)} title="Locations">
//                     <AdminList hideModal={() => this.handlePopups('locationsModal', false)} handlePopups={this.handlePopups}
//                         array={this.state.locations} targetElm={this.defineTargetElm}
//                         deleteModal='delLocModal'  editModal='editLocModal' newModal='newLocModal' />
//                 </PopUp>

//                 <PopUp show={this.state.newLocModal} hide={() => this.handlePopups('newLocModal', false)} title="New location">
//                     <NewElm hideModal={() => this.handlePopups('newLocModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('newLocToast', true)}
//                         type="location" loadList={this.loadLocations} />
//                 </PopUp>

//                 <PopUp show={this.state.editLocModal} hide={() => this.handlePopups('editLocModal', false)} title="Edit location">
//                     <EditElm hideModal={() => this.handlePopups('editLocModal', false)} handlePopups={this.handlePopups} handleToast={() => this.handlePopups('editLocToast', true)}
//                         type="location" elm={this.state.targetElm} loadList={this.loadLocations} />
//                 </PopUp>
                
//                 <PopUpConfirm show={this.state.delLocModal} hide={() => this.handlePopups('delLocModal', false)}
//                     leftAction={() => this.handlePopups('delLocModal', false)} leftText='No, go back'
//                     rightAction={() => this.deleteLocation(this.state.targetElm)} rightText='Yes, delete'
//                     type='danger' title="Caution!" body={<b>Are you sure you want to delete this location?</b>}
//                 />