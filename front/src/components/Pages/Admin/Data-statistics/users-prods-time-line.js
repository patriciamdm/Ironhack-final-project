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
                        y: 1
                    },{
                        x: 'febrero',
                        y: 2
                    },{
                        x: 'marzo',
                        y: 3
                    },{
                        x: 'abril',
                        y: 4
                    },{
                        x: 'mayo',
                        y: 5
                    },{
                        x: 'junio',
                        y: 6
                    },{
                        x: 'julio',
                        y: 8
                    },{
                        x: 'agosto',
                        y: 8
                    },{
                        x: 'septiembre',
                        y: 10
                    },{
                        x: 'octubre',
                        y: 12
                    },{
                        x: 'novimbre',
                        y: 14
                    },{
                        x: 'diciembre',
                        y: 18
                    }]
                },
                {
                    id: 'products',
                    data: [{
                        x: 'enero',
                        y: 1
                    },{
                        x: 'febrero',
                        y: 5
                    },{
                        x: 'marzo',
                        y: 7
                    },{
                        x: 'abril',
                        y: 12
                    },{
                        x: 'mayo',
                        y: 18
                    },{
                        x: 'junio',
                        y: 20
                    },{
                        x: 'julio',
                        y: 24
                    },{
                        x: 'agosto',
                        y: 25
                    },{
                        x: 'septiembre',
                        y: 26
                    },{
                        x: 'octubre',
                        y: 27
                    },{
                        x: 'novimbre',
                        y: 29
                    },{
                        x: 'diciembre',
                        y: 30
                    }]
                }
                
            ],
        }
        this.productService = new ProductService()
    }

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
                legendPosition: 'middle',
                linearScale: [0, 5, 10, 15, 20, 25, 30, 35]
            }}
            colors={{ scheme: 'category10' }}
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