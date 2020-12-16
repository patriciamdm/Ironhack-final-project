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
                .getProductsByStatus(elm.name.toLowerCase())
                .then(statProds => {
                    const newArr = [...this.state.prodsByStatus, {id : elm.name, value: statProds.data.length }]
                    this.setState({ prodsByStatus: newArr }, () => console.log(this.state.prodsByStatus))
                })
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
            <ResponsiveRadar
                data={this.state.prodsByStatus}
                keys={[ 'chardonay', 'carmenere', 'syrah' ]}
                indexBy="taste"
                maxValue="auto"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{ from: 'color' }}
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={36}
                enableDots={true}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                dotBorderColor={{ from: 'color' }}
                enableDotLabel={true}
                dotLabel="value"
                dotLabelYOffset={-12}
                colors={{ scheme: 'nivo' }}
                fillOpacity={0.25}
                blendMode="multiply"
                animate={true}
                motionConfig="wobbly"
                isInteractive={true}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        translateX: -50,
                        translateY: -40,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: '#999',
                        symbolSize: 12,
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


export default ProdsStatusRadar