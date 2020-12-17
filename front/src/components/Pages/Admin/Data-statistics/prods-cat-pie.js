import React, { Component } from 'react'
import { ResponsivePie } from '@nivo/pie'

import ProductService from '../../../../services/products.service'
import CategoryService from '../../../../services/category.service'


class ProdsCategoryPie extends Component {
    constructor() {
        super()
        this.state = {
            categories: undefined,
            prodsByCategory: []
        }
        this.productService = new ProductService()
        this.categoryService = new CategoryService()
    }

    componentDidMount = () => {
        this.loadCategories()
    }

    loadCategories = () => {
        this.categoryService
            .getAllCategories()
            .then(allCats => this.setState({ categories: allCats.data }, () => this.prodsByCategory()))
            .catch(err => new Error(err))
    }

    prodsByCategory = () => {
        this.state.categories.forEach(elm => {
            this.productService
                .getProductsByCategory(elm.name)
                .then(catProds => {
                    const newArr = [...this.state.prodsByCategory, {id: elm.name, value: catProds.data }]
                    this.setState({ prodsByCategory: newArr })
                })
                .catch(err => new Error(err))
        })
    }

    render() {
        return (
            <ResponsivePie
                data={this.state.prodsByCategory}
                margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
                innerRadius={0.5}
                cornerRadius={2}
                colors={{ scheme: 'blues' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
            />
        )
    }
}


export default ProdsCategoryPie