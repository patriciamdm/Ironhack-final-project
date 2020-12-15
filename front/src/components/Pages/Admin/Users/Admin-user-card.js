import React, { Component } from 'react'
import { Col, Card, Button } from 'react-bootstrap'

import RatingService from '../../../../services/rating.service'

class AdminUserCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avgRating: undefined
        }
        this.ratingService = new RatingService()
    }

    componentDidMount = () => this.getAverageRating()

    handleAction = target => {
        this.props.targetUser(this.props.user._id)
        this.props.handlePopups(target, true)
    }

    getAverageRating = () => {
        this.ratingService
            .getUserRatings(this.props.user._id)
            .then(rates => {
                const avgRate = (rates.data.reduce((acc, elm) => acc + elm.value.valueOf(), 0)) / (rates.data.length)
                this.setState({ avgRating: isNaN(parseFloat(avgRate.toFixed(2))) ? 'No ratings' : `${parseFloat(avgRate.toFixed(2))} / 5` })
            })
            .catch(err => console.log('ERROR GETTING AVG RATES', err))
    }

    render() {
        return (
            <Col xs={12} sm={12} md={6} lg={4}>
                <Card className="admin-prod-card">
                    <img src={this.props.user.image} alt={this.props.user.username} style={{objectFit: 'cover', width: '100px', height: '100px', marginRight: '10px', borderRadius: '3px'}}/>
                    <article style={{width: '100%'}}>
                        <Card.Title style={{ fontSize: '1.2rem' }}>{this.props.user.username}</Card.Title>
                        <Card.Text className="admin-card-text">Rating: {this.state.avgRating}</Card.Text>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button variant="secondary" size="sm" onClick={() => this.handleAction('editUserModal')} style={{marginRight: '10px'}}>Edit</Button>
                            <Button variant="danger" size="sm" onClick={() => this.handleAction('delUserModal')}>Delete</Button>
                        </div>
                    </article>

                </Card>
            </Col>
        )
    }
}

export default AdminUserCard