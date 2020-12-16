import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ProdsCategoryPie from './prods-cat-pie'
import ProdsLocationDonut from './prods-loc-donut'
import ProdsStatusRadar from './prods-stat-radar'
import UsersProdsTimeline from './users-prods-time-line'


class DataStats extends Component {
    constructor() {
        super()
        this.state = {
            
            
        }
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid lightgray'}}>
                        <h1>Dealz_ statistics</h1>
                        <Link to="/admin" className="btn btn-secondary btn-lg" style={{marginTop: '10px'}}>Go back</Link>
                    </Col>
                </Row>
                <Row style={{ textAlign: 'center'}} >
                    <Col sm={12} md={12} lg={6} style={{marginTop: '40px'}}>
                        <h3 style={{ marginBottom: '20px' }}>Products by category</h3>
                        <section style={{ height: '400px' }}>
                            <ProdsCategoryPie />
                        </section>
                    </Col>
                    <Col sm={12} md={12} lg={6} style={{marginTop: '40px'}}>
                        <h3 style={{ marginBottom: '20px' }}>Products by location</h3>
                        <section style={{ height: '400px' }}>
                            <ProdsLocationDonut />
                        </section>
                    </Col>
                    <Col sm={12} md={12} lg={12} style={{marginTop: '40px'}}>
                        <h3 style={{ marginBottom: '20px' }}>Products by status</h3>
                        <section style={{ height: '400px' }}>
                            <ProdsStatusRadar />
                        </section>
                    </Col>
                    <Col sm={12} md={12} lg={12} style={{marginTop: '40px'}}>
                        <h3 style={{ marginBottom: '20px' }}>Users and products count timeline</h3>
                        <section style={{ height: '400px' }}>
                            <UsersProdsTimeline />
                        </section>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DataStats