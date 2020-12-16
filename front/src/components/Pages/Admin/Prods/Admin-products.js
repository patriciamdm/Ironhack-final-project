import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'

import SearchBar from '../../../Shared/Searchbar'
import FilterBtns from '../../../Shared/Filter-btns'
import Loader from '../../../Shared/Spinner'
import PopUp from '../../../Shared/PopUps/Pop-up-modal'
import PopUpConfirm from '../../../Shared/PopUps/Pop-up-confirm'
import Toastie from '../../../Shared/PopUps/Toastie'
import AdminProdCard from './Admin-prod-card'
import EditProduct from '../../Products/Edit-product'
import NewProduct from '../../Products/New-product'

import ProductService from '../../../../services/products.service'


class AdminProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: undefined,
            filteredProds: undefined,
            prodToTarget: undefined,
            prodCategories: undefined,
            prodLocations: undefined,
            showModal: false,
            modalTitle: undefined,
            showModalConfirm: false,
            showToast: false,
            toastText: undefined
        }
        this.productsService = new ProductService()
    }

    componentDidMount = () => this.loadProducts()

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then(allProds => this.setState({ products: allProds.data, filteredProds: allProds.data }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }

    searchBy = value => {
        const filterProds = this.state.products.filter(elm => elm.name.toLowerCase().includes(value.toLowerCase()) || elm.description.toLowerCase().includes(value.toLowerCase()))
        this.setState({ filteredProds: filterProds })
    }

    filterBy = (value, filter) => {
        const filterProds = this.state.products.filter(elm => elm.[filter].toLowerCase().includes(value.toLowerCase()))
        this.setState({ filteredProds: filterProds })
    }

    unfilter = () => {
        this.setState({ filteredProds: this.state.products })
    }

    sortBy = rule => {
        const filterProds = [...this.state.products]
        rule === 'newest' && filterProds.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
        rule === 'available' && filterProds.sort((a, b) => (a.status < b.status) ? -1 : 1)
        rule === 'low price' && filterProds.sort((a, b) => (a.price > b.price) ? 1 : -1)
        rule === 'high price' && filterProds.sort((a, b) => (a.price > b.price) ? -1 : 1)
        this.setState({ filteredProds: filterProds })
    }
    
    defineTargetProd = prodId => this.setState({ prodToTarget: prodId })

    handlePopups = (target, visib, content) => {
        target === 'showModal' && this.setState({ [target]: visib, modalTitle: content })
        target === 'showModalConfirm' && this.setState({ [target]: visib, modalTitle: "Caution!" })
        target === 'showToast' && this.setState({ [target]: visib, toastText: content })
    }

    deleteProduct = () => {
        this.productsService
            .deleteProduct(this.state.prodToTarget)
            .then(() => {
                this.handlePopups('showModalConfirm', false)
                this.handlePopups('showToast', true, 'Product deleted successfully.')
                this.loadProducts()
            })
            .catch(err => console.log('ERROR DELETING PRODUCT', err))
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding:' 0px 15px'}}>
                            <h1>All products</h1>
                            {this.state.products && <Button onClick={() => this.handlePopups('showModal', true, 'new product')} variant="secondary" >Create new product</Button>}
                        </article>
                        <SearchBar searchFor={value => this.searchBy(value)} style={{padding: '0px 15px'}}/>
                    </Row>
                    <FilterBtns filterBy={this.filterBy} unfilter={this.unfilter} sortBy={this.sortBy} />
                    {this.state.filteredProds
                    ?
                    <Row>
                        {this.state.filteredProds.map(elm => <AdminProdCard key={elm._id} product={elm} targetProd={this.defineTargetProd} handlePopups={this.handlePopups} />)}
                    </Row>
                    :
                    <Row><Loader /></Row>
                    }

                    <Toastie show={this.state.showToast} handleToast={visib => this.handlePopups('showToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText={this.state.toastText} />

                </Container>

                
                <PopUp show={this.state.showModal} hide={() => this.handlePopups('showModal', false)} title={this.state.modalTitle}>
                    
                    {this.state.modalTitle === 'new product' && <NewProduct hideModal={() => this.handlePopups('showModal', false)}
                        reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={() => this.handlePopups('showToast', true, 'Product created successfully.')} />}
                    
                    {this.state.modalTitle === 'edit product' && <EditProduct hideModal={() => this.handlePopups('showModal', false)} productId={this.state.prodToTarget}
                        reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('showToast', visib, 'Product updated successfully.')} />}
                    
                </PopUp>

               <PopUpConfirm show={this.state.showModalConfirm} hide={() => this.handlePopups('showModalConfirm', false)}
                        leftAction={() => this.handlePopups('showModalConfirm', false)} leftText='No, go back'
                        rightAction={() => this.deleteProduct()} rightText='Yes, delete'
                    type='danger' title="Wait!" body={<b>Are you sure you want to delete this product?</b>} />
                
            </>
        )
    }
}

export default AdminProducts