import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import SearchBar from '../../Shared/Searchbar'
import ProductCard from './Prod-card'
import PopUp from '../../Shared/PopUps/Pop-up-modal'
import EditProduct from './Edit-product'
import Toastie from '../../Shared/PopUps/Toastie'
import NewProduct from './New-product'

import ProductService from '../../../services/products.service'
import UserService from '../../../services/user.service'
import FilterBtns from '../../Shared/Filter-btns'

class ProductList extends Component {
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
            prodCategories: ['motor', 'fashion', 'electronics', 'sports', 'home', 'culture', 'others'],
            prodLocations: ['Alava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']
        }
        this.productsService = new ProductService()
        this.userService = new UserService()
    }

    componentDidMount = () => this.loadProducts()

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then(allProds => this.setState({ products: allProds.data, filteredProds: allProds.data }))
            .catch(err => console.log('ERROR GET ALL PRODS', err))
    }
    
    defineTargetProd = prodId => this.setState({ prodToTarget: prodId })

    handlePopups = (target, visib) => this.setState({[target]: visib})
    


    // SEARCH BAR, FILTERS & SORTING

    filterBy = (filter, value) => {
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
            .catch(err => console.log('ERROR ADDING/REMOVING FROM FAVS', err))
    }

    render() {
        return (
            <>
                <Container className="products-list">
                    <Row>
                        <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding:' 0px 15px'}}>
                            <h1>All products</h1>
                            {this.state.products && <Button onClick={() => this.handlePopups('newProdModal', true)} variant="secondary" >Create new product</Button>}
                        </article>
                        <SearchBar searchFor={value => this.filterBy('name', value)} style={{padding: '0px 15px'}}/>
                    </Row>
                    <FilterBtns filterBy={this.filterBy} unfilter={this.unfilter} sortBy={this.sortBy} categories={this.state.prodCategories} locations={this.state.prodLocations} />
                    {this.state.filteredProds
                        ?
                        <Row>
                            {this.state.filteredProds.map(elm => <ProductCard key={elm._id} showEditProdModal={visib => this.handlePopups('editProdModal', visib)} productToTarget={id => this.defineTargetProd(id)} addToFavs={prod => this.addToFavorites(prod)} product={elm} theUser={this.props.theUser} />)}
                        </Row>
                        :
                        <Row><Loader /></Row>
                    }
                    <Toastie show={this.state.newProdToast} handleToast={visib => this.handlePopups('newProdToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Product created successfully."  />
                    <Toastie show={this.state.editProdToast} handleToast={visib => this.handlePopups('editProdToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="Product updated successfully." />
                </Container>

                <PopUp show={this.state.newProdModal} hide={() => this.handlePopups('newProdModal', false)} title="Create a product">
                    <NewProduct hideModal={() => this.handlePopups('newProdModal', false)} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('newProdToast', visib)} />
                </PopUp>

                <PopUp show={this.state.editProdModal} hide={() => this.handlePopups('editProdModal', false)} title="Edit product">
                    <EditProduct hideModal={() => this.handlePopups('editProdModal', false)} productId={this.state.prodToTarget} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('editProdToast', visib)} />
                </PopUp>
            </>
        )
    }
}

export default ProductList