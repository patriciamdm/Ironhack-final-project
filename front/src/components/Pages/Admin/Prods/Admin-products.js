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
            newProdModal: false,
            newProdToast: false,
            editProdModal: false,
            editProdToast: false,
            delProdModal: false,
            delProdToast: false,
            prodCategories: undefined,
            prodLocations: undefined
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

    handlePopups = (target, visib) => this.setState({ [target]: visib })
    
    deleteProduct = () => {
        this.productsService
            .deleteProduct(this.state.prodToTarget)
            .then(() => {
                this.handlePopups('delProdModal', false)
                this.handlePopups('delProdToast', true)
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
                            {this.state.products && <Button onClick={() => this.handlePopups('newProdModal', true)} variant="secondary" >Create new product</Button>}
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
                    <Toastie show={this.state.newProdToast} handleToast={visib => this.handlePopups('newProdToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Product created successfully." />
                    <Toastie show={this.state.editProdToast} handleToast={visib => this.handlePopups('editProdToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Product updated successfully." />
                    <Toastie show={this.state.delProdToast} handleToast={visib => this.handlePopups('delProdToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Product deleted successfully." />
                </Container>

                 <PopUp show={this.state.newProdModal} hide={() => this.handlePopups('newProdModal', false)} title="Create a product">
                    <NewProduct hideModal={() => this.handlePopups('newProdModal', false)} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('newProdToast', visib)} />
                </PopUp>

                <PopUp show={this.state.editProdModal} hide={() => this.handlePopups('editProdModal', false)} title="Edit product">
                    <EditProduct hideModal={() => this.handlePopups('editProdModal', false)} productId={this.state.prodToTarget} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('editProdToast', visib)} />
                </PopUp>

               <PopUpConfirm show={this.state.delProdModal} hide={() => this.handlePopups('delProdModal', false)}
                        leftAction={() => this.handlePopups('delProdModal', false)} leftText='No, go back'
                        rightAction={() => this.deleteProduct()} rightText='Yes, delete'
                        type='danger' title="Wait!" body={<b>Are you sure you want to delete this product?</b>}
                    />
            </>
        )
    }
}

export default AdminProducts