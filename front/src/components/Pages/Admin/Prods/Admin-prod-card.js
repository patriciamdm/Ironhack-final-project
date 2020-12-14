import React, { Component } from 'react'
import { Col, Card, Button } from 'react-bootstrap'

class AdminProdCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.theUser
        }
    }

    handleAction = target => {
        this.props.targetProd(this.props.product._id)
        this.props.handlePopups(target, true)
    }

    render() {
        return (
            <Col xs={12} sm={12} md={6} lg={4}>
                <Card className="admin-prod-card" style={this.props.product.status === 'available' ? { border: '1px solid #339633' } : (this.props.product.status === 'sold' ? { border: '1px solid red' } : { border: '1px solid orange' })}>
                    <img src={this.props.product.image} alt={this.props.product.name} style={{objectFit: 'cover', width: '100px', height: '100px', marginRight: '10px', borderRadius: '3px'}}/>
                    <article style={{width: '100%'}}>
                        <Card.Title style={{ fontSize: '1.2rem' }}>{this.props.product.name}</Card.Title>
                        <Card.Text className="admin-card-text">{this.props.product.description}</Card.Text>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button variant="secondary" size="sm" onClick={() => this.handleAction('editProdModal')} style={{marginRight: '10px'}}>Edit</Button>
                            <Button variant="danger" size="sm" onClick={() => this.handleAction('delProdModal')}>Delete</Button>
                        </div>
                    </article>

                </Card>
            </Col>
        )
    }
}

export default AdminProdCard