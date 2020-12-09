import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, ButtonGroup, Button } from 'react-bootstrap'

class ProductCard extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    showModal = () => {
        this.props.productToEdit(this.props.product._id)
        this.props.showEditProdModal(true)
    }

    render() {
        return (
            <>
                <Col xs={6} sm={6} md={4} lg={3}>
                    <Card className="product-card">
                        <Card.Img variant="top" src={this.props.product.image} style={{height: '200px'}}/>
                        <Card.Body>
                            <Card.Title>{this.props.product.name}</Card.Title>
                            <Card.Subtitle style={{fontStyle: 'italic', fontSize: '0.9rem', fontWeight: '300', marginBottom: '10px'}}>Price: {this.props.product.price}€</Card.Subtitle>
                            <Card.Text style={{height: '50px', overflow: 'hidden'}}>{this.props.product.description}</Card.Text>
                            <Card.Subtitle style={{textTransform: 'capitalize'}}>{this.props.product.location}</Card.Subtitle>
                            {this.props.product.owner === this.props.theUser._id
                                ?
                                <ButtonGroup size="sm" className="btn-block">
                                    <Button onClick={() => this.showModal()} variant="secondary" size="sm">Edit product</Button>
                                    <Link to={`/products/${this.props.product._id}`} className="btn btn-secondary btn-sm">View details</Link>
                                </ButtonGroup>
                                :
                                <Link to={`/products/${this.props.product._id}`} className="btn btn-secondary btn-sm btn-block">View details</Link>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </>
        )
    }
}

export default ProductCard