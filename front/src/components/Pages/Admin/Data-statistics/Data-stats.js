import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import ProdsCategoryPie from './prods-cat-pie'
import ProdsLocationDonut from './prods-loc-donut'
//import ProdsStatusRadar from './prods-stat-radar'


class DataStats extends Component {
    constructor() {
        super()
        this.state = {
            
            
        }
    }


    render() {
        return (
            <Container>
                <h1>Dealz_ statistics</h1>
                <hr />
                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <section style={{ height: '400px' }}>
                            <ProdsCategoryPie />
                        </section>
                    </Col>
                    <Col sm={12} md={12} lg={6}>
                        <section style={{ height: '400px' }}>
                            <ProdsLocationDonut />
                        </section>
                    </Col>
                    {/* <Col>
                        <section style={{ height: '400px' }}>
                            <ProdsLocationDonut />
                        </section>
                    </Col> */}
                </Row>
            </Container>
        )
    }
}

export default DataStats