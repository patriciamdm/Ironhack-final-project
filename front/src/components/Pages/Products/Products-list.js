import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import SearchBar from '../../Shared/Searchbar'
import FilterBtns from '../../Shared/Filter-btns'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import Toastie from '../../Shared/PopUps/Toastie'
import ProductCard from './Prod-card'
import EditProduct from './Edit-product'
import NewProduct from './New-product'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'


class ProductList extends Component {
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
            showToast: false,
            toastText: undefined
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => this.loadProducts()

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then(allProds => this.setState({ products: allProds.data, filteredProds: allProds.data }))
            .catch(err => new Error('ERROR GET ALL PRODS', err))
    }
    
    defineTargetProd = prodId => this.setState({ prodToTarget: prodId })

    handlePopups = (target, visib, content) => {
        target === 'showModal' && this.setState({ [target]: visib, modalTitle: content })
        target === 'showToast' && this.setState({ [target]: visib, toastText: content })
    }
    


    // SEARCH BAR, FILTERS & SORTING

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


    // ADD FAVORITES

    addToFavorites = product => {
        const addFav = { likedProducts: [...this.props.theUser.likedProducts, product] }
        const removeFav = { likedProducts: this.props.theUser.likedProducts.filter(elm => elm !== product._id) }
 
        this.userService
            .editUser(this.props.theUser._id, this.props.theUser.likedProducts.includes(product._id) ? removeFav : addFav)
            .then(user => this.userService.getOneUser(user.data._id))
            .then(user => this.props.setUser(user.data))
            .catch(err => new Error('ERROR ADDING/REMOVING FROM FAVS', err))
    }

    render() {
        return (
            <>
                <Container className="products-list">
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
                            {this.state.filteredProds.map(elm => <ProductCard key={elm._id} showEditProdModal={visib => this.handlePopups('showModal', visib, 'edit product')} productToTarget={id => this.defineTargetProd(id)} addToFavs={prod => this.addToFavorites(prod)} product={elm} theUser={this.props.theUser} />)}
                        </Row>
                        :
                        <Row><Loader /></Row>
                    }

                    <Toastie show={this.state.showToast} handleToast={visib => this.handlePopups('showToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText={this.state.toastText} />
                
                </Container>

                <PopUp show={this.state.showModal} hide={() => this.handlePopups('showModal', false)} title={this.state.modalTitle} >
                    
                    {this.state.modalTitle === 'new product' && <NewProduct hideModal={() => this.handlePopups('showModal', false)}
                        reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('showToast', visib, 'Product created successfully.')} />}
                    
                    {this.state.modalTitle === 'edit product' && <EditProduct hideModal={() => this.handlePopups('showModal', false)} productId={this.state.prodToTarget}
                        reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('showToast', visib, 'Product updated successfully.')} />}

                </PopUp>

            </>
        )
    }
}

export default ProductList