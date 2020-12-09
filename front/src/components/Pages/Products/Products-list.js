import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'
import SearchBar from '../../Shared/Searchbar'
import DropdownButton from '../../Shared/Dropdown-button'
import ProductCard from './Prod-card'
import PopUp from '../../Shared/Pop-up-modal'
import EditProduct from './Edit-product'

import ProductService from '../../../services/products.service'

class ProductList extends Component {
    constructor() {
        super()
        this.state = {
            products: undefined,
            filteredProds: undefined,
            showModal: false,
            prodToEdit: undefined,
            prodCategories: ['motor', 'fashion', 'electronics', 'sports', 'home', 'culture', 'others'],
            prodLocations: ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres', 'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara', 'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra', 'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']
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

    handleEditProdModal = visibility => this.setState({ showModal: visibility })

    defineEditProd = prodId => this.setState({ prodToEdit: prodId })

    searchFor = search => {
        const filterProds = this.state.products.filter(elm => elm.name.toLowerCase().includes(search.toLowerCase()))
        this.setState({ filteredProds: filterProds })
    }

    filterByCategory = categ => {
        const filterProds = this.state.products.filter(elm => elm.category.toLowerCase().includes(categ.toLowerCase()))
        this.setState({ filteredProds: filterProds })
    }

    filterByLocation = loc => {
        const filterProds = this.state.products.filter(elm => elm.location.toLowerCase().includes(loc.toLowerCase()))
        this.setState({ filteredProds: filterProds })
    }

    unfilterBy = () => {
        this.setState({ filteredProds: this.state.products })
    }

    sortByNewest = () => {
        const filterProds = [...this.state.products]
        filterProds.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
        this.setState({ filteredProds: filterProds })
    }
    
    sortByLowPrice = () => {
        const filterProds = [...this.state.products]
        filterProds.sort((a, b) => (a.price > b.price) ? 1 : -1)
        this.setState({ filteredProds: filterProds })
    }

    sortByHighPrice = () => {
        const filterProds = [...this.state.products]
        filterProds.sort((a, b) => (a.price > b.price) ? -1 : 1)
        this.setState({ filteredProds: filterProds })
    }


    render() {
        return (
            <>
                <Container className="products-list">
                    <Row>
                        <article className="first-row">
                            <h1>All products</h1>
                            {this.state.products && <Link to='/products/new' className="btn btn-secondary" style={{marginBottom: '30px', marginTop: '10px'}}>Create new product</Link>}
                        </article>
                        <SearchBar searchFor={value => this.searchFor(value)} />
                        <hr/>
                    </Row>
                    {this.state.filteredProds
                        ?
                        <>
                            <Row style={{ marginBottom: '20px'}}>
                                <DropdownButton title="Sort" products={this.state.filteredProds}>
                                    <Dropdown.Item as="button" onClick={() => this.sortByNewest()}>Newest</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => this.sortByLowPrice()}>Price, low to high</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => this.sortByHighPrice()}>Price, high to low</Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton title="Category" products={this.state.filteredProds}>
                                    <Dropdown.Item as="button" onClick={() => this.unfilterBy()}>All</Dropdown.Item>
                                    {this.state.prodCategories.map((elm, idx) => <Dropdown.Item as="button" key={idx} onClick={() => this.filterByCategory(elm)}><span style={{ textTransform: 'capitalize'}}>{elm}</span></Dropdown.Item>)}
                                </DropdownButton>

                                <DropdownButton title="Location" products={this.state.filteredProds} style={{height: '100px', overflow: 'scroll'}}>
                                    <Dropdown.Item as="button" onClick={() => this.unfilterBy()}>All</Dropdown.Item>
                                    {this.state.prodLocations.map((elm, idx) => <Dropdown.Item as="button" key={idx} onClick={() => this.filterByLocation(elm)}><span style={{ textTransform: 'capitalize'}}>{elm}</span></Dropdown.Item>)}
                                </DropdownButton>
                            </Row>
                            <Row>
                                {this.state.filteredProds.map(elm => <ProductCard key={elm._id} showEditProdModal={visib => this.handleEditProdModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.props.theUser} />)}
                            </Row>
                        </>
                        :
                            <Row><Loader /></Row>
                    }
                </Container>
                <PopUp show={this.state.showModal} hide={() => this.handleEditProdModal(false)} title="Edit product">
                    <EditProduct hideModal={() => this.handleEditProdModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} />
                </PopUp>
            </>
        )
    }
}

export default ProductList