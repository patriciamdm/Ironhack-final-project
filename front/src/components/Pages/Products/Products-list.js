import React, { Component } from 'react'
import { Container, Row, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ProductCard from './Prod-card'
import EditProduct from './Edit-product'
import Loader from '../../Shared/Spinner'

import ProductService from '../../../services/products.service'
import SearchBar from '../../Layout/Searchbar'

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

    handleModal = visibility => this.setState({ showModal: visibility })

    defineEditProd = prodId => this.setState({ prodToEdit: prodId })
    
    searchFor = search => {
        const filterProds = this.state.products.filter(elm => elm.name.toLowerCase().includes(search.toLowerCase()))
        this.setState({ filteredProds: filterProds })
    }

    render() {
        return (
            <>
                <Container>
                    <h1>All products</h1>
                    {this.state.products && <Link to='/products/new' className="btn btn-secondary" style={{marginBottom: '20px'}}>Create new product</Link>}
                    <SearchBar searchFor={value => this.searchFor(value)} />
                    <hr />
                    <Row>
                        {this.state.filteredProds
                            ?
                            this.state.filteredProds.map(elm => <ProductCard key={elm._id} showModal={visib => this.handleModal(visib)} productToEdit={id => this.defineEditProd(id)} product={elm} theUser={this.props.theUser }/>)
                            :
                            <Loader />
                        }
                    </Row>
                </Container>
                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EditProduct hideModal={() => this.handleModal(false)} productId={this.state.prodToEdit} reloadProducts={() => this.loadProducts()} theUser={this.props.theUser} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default ProductList