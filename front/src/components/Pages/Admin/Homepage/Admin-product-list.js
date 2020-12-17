import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../../../Shared/Spinner'
import AdminPageCard from './Admin-page-card'

import ProductService from '../../../../services/products.service'


class AdminProductsList extends Component {
    constructor() {
        super()
        this.state = {
            products: undefined
        }
        this.productService = new ProductService()
    }

    componentDidMount = () => {
        this.productService
            .getLast6Products()
            .then(prods => this.setState({ products: prods.data }))
            .catch(err => new Error('ERROR GET 5 PRODS', err)) 
    }

    render() {
        return (
            <>
                <h3 style={{marginBottom: '20px'}}>Products</h3>
                {this.state.products
                    ?
                    this.state.products.map(elm => <AdminPageCard key={elm._id} name={elm.name} image={elm.image} status={elm.status} />)
                    :
                    <Loader />
                }
                <Link to="/admin/products" className="btn btn-secondary btn-sm">Manage products</Link>
            </>
        )
    }
}

export default AdminProductsList