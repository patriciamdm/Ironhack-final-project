import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

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
                    <Col>
                        <h1>Dealz_ statistics</h1>
                        <hr />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default DataStats