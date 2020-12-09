import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
            sortActions: [{
                name: "Newest",
                method(arr) {
                    console.log('SORT NEWEST', arr)
                    arr.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
                    //this.setState({filteredProds: arr})
                }
            }, {
                name: "Price, low to high",
                method() { console.log('SORT LOW TO HIGH PRICE') }
            }, {
                name: "Price, high to low",
                method() { console.log('SORT HIGH TO LOW PRICE') }
            }]
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

    sortByLastAdded = () => console.log('SORT NEWEST', this.state.filteredProds.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1))
    //sortByLastAdded = () => this.state.filteredProds.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)

    sortByLowerPrice = () => this.state.filteredProds.sort((a, b) => (a.price > b.price) ? -1 : 1)
    
    sortByHigherPrice = () => this.state.filteredProds.sort((a, b) => (a.price > b.price) ? 1 : -1)


    render() {
        return (
            <>
                <Container>
                    <article style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
                    <h1>All products</h1>
                    {this.state.products && <Link to='/products/new' className="btn btn-secondary" style={{marginBottom: '30px', marginTop: '10px'}}>Create new product</Link>}
                    </article>
                    <SearchBar searchFor={value => this.searchFor(value)} />
                    <hr />
                    {this.state.filteredProds
                        ?
                        <>
                            <DropdownButton title="Sort" actions={this.state.sortActions} products={this.state.filteredProds} />
                            <br />
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