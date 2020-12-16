import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import ProductService from '../../../../services/products.service'

import NivoResponsivePie from './Nivo-pie'


class DataStats extends Component {
    constructor() {
        super()
        this.state = {
            pie: undefined,
            pieData: [{id: 'loles', value: 25}, {id: 'jesjes', value: 40 }, {id: 'nices', value: 15}, {id: 'yasss', value: 20}]
        }
        this.productService = new ProductService()
    }

    loadPie = () => {
        this.productService
            .getAllProducts()
            .then(allProds => {
            
            })
            .catch(err => console.log(err))
    }




    render() {
        return (
            <Container>
                <h1>Dealz_ statistics</h1>
                <hr />
                <Row>
                    <Col>
                        <NivoResponsivePie height="500px" data={this.state.pieData} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DataStats