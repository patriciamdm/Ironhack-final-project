import React, { Component } from 'react'
import { ResponsiveRadar } from '@nivo/radar'

import ProductService from '../../../../services/products.service'


class ProdsStatusRadar extends Component {
    constructor() {
        super()
        this.state = {
            statuses: ['available', 'sold', 'reserved'],
            prodsByStatus: []
        }
        this.productService = new ProductService()
    }

    componentDidMount = () => {
        this.prodsByStatus()
    }

    prodsByStatus = () => {
        this.state.statuses.forEach(elm => {
            this.productService
                .getProductsByStatus(elm)
                .then(statProds => {
                    const newArr = [...this.state.prodsByStatus, {status: elm, value: statProds.data }]
                    this.setState({ prodsByStatus: newArr }, () => console.log(this.state.prodsByStatus))
                })
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <ResponsiveRadar
                data={this.state.prodsByStatus}
                keys={['value']}
                indexBy="status"
                maxValue="auto"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                curve="linearClosed"
                borderWidth={2}
                borderColor="#3e78ac"
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={30}
                enableDots={true}
                dotSize={10}
                dotColor="#3e78ac"
                dotBorderWidth={0}
                dotBorderColor="black"
                enableDotLabel={true}
                dotLabel="value"
                dotLabelYOffset={-10}
                colors={{ scheme: 'blues' }}
                fillOpacity={1}
                blendMode="multiply"
                animate={true}
                motionConfig="wobbly"
                isInteractive={true}
                
            />
        )
    }
}


export default ProdsStatusRadar