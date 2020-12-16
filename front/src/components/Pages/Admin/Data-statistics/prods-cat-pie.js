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
            .catch(err => console.log(err))
    }

    prodsByCategory = () => {
        this.state.categories.forEach(elm => {
            this.productService
                .getProductsByCategory(elm.name.toLowerCase())
                .then(catProds => {
                    const newArr = [...this.state.prodsByCategory, {id: elm.name, value: catProds.data.length }]
                    this.setState({ prodsByCategory: newArr }, () => console.log(this.state.prodsByCategory))
                })
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <ResponsivePie
                data={this.state.prodsByCategory}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        )
    }
}


export default ProdsCategoryPie