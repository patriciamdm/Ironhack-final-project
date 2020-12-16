import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'

import ProductService from '../../../../services/products.service'


class UsersProdsTimeline extends Component {
    constructor() {
        super()
        this.state = {
            information: [
                {
                    id: 'users',
                    data: [{
                        x: 'enero',
                        y: 6
                    },{
                        x: 'febrero',
                        y: 8
                    },{
                        x: 'marzo',
                        y: 9
                    },{
                        x: 'abril',
                        y: 7
                    }]
                },
                {
                    id: 'products',
                    data: [{
                        x: 'enero',
                        y: 2
                    },{
                        x: 'febrero',
                        y: 3
                    },{
                        x: 'marzo',
                        y: 5
                    },{
                        x: 'abril',
                        y: 4
                    }]
                }
                
            ],
        }
        this.productService = new ProductService()
    }

    // componentDidMount = () => {
    //     this.loadProducts()
    // }

    // loadProducts = () => {
    //     this.productService
    //         .getAllProducts()
    //         .then(allProds => this.setState({ products: [allProds.data] }))
    //         .catch(err => console.log(err))
    // }

    render() {
        return (
           <ResponsiveLine
            data={this.state.information}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'blues' }}
            lineWidth={3}
            pointSize={10}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderColor={{ from: 'serieColor', modifiers: [] }}
            enablePointLabel={true}
            pointLabel="y"
            pointLabelYOffset={-12}
            areaOpacity={1}
            useMesh={true}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
        )
    }
}


export default UsersProdsTimeline