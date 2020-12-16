import React, { Component } from 'react'
import { ResponsivePie } from '@nivo/pie'

import ProductService from '../../../../services/products.service'
import LocationService from '../../../../services/location.service'


class ProdsLocationDonut extends Component {
    constructor() {
        super()
        this.state = {
            locations: undefined,
            prodsByLocation: []
        }
        this.productService = new ProductService()
        this.locationService = new LocationService()
    }

    componentDidMount = () => {
        this.loadLocations()
    }

    loadLocations = () => {
        this.locationService
            .getAllLocations()
            .then(allLocs => this.setState({ locations: allLocs.data }, () => this.prodsByLocation()))
            .catch(err => console.log(err))
    }

    prodsByLocation = () => {
        this.state.locations.forEach(elm => {
            this.productService
                .getProductsByLocation(elm.name.toLowerCase())
                .then(locProds => {
                    const newArr = [...this.state.prodsByLocation, {id: elm.name, value: locProds.data.length }]
                    this.setState({ prodsByLocation: newArr }, () => console.log(this.state.prodsByLocation))
                })
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <ResponsivePie
                data={this.state.prodsByLocation}
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


export default ProdsLocationDonut