import React, { Component } from 'react'
import { Container, Row, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ProductCard from './Prod-card'
import EditProduct from './Edit-product'
import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'
import SearchBar from '../../Shared/Searchbar'

class ProductList extends Component {
    constructor() {
        super()
        this.state = {
            products: undefined,
            filteredProds: undefined,
            showModal: false,
            prodToEdit: undefined
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
                    <Row>
                        {this.state.filteredProds
                            ?
                            this.state.filteredProds.reverse().map(elm => <ProductCard key={elm._id} showEditProdModal={visib => this.handleEditProdModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.props.theUser }/>)
                            :
                            <Loader />
                        }
                    </Row>
                </Container>
                <Modal show={this.state.showModal} onHide={() => this.handleEditProdModal(false)}>
                    <Modal.Body>
                        <EditProduct hideModal={() => this.handleEditProdModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default ProductList