import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'

import RatingService from '../../../services/rating.service'

class UserCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.theUser,
            avgRating: undefined
        }
        this.ratingService = new RatingService()
    }

    componentDidMount = () => this.getAverageRating()

    getAverageRating = () => {
        this.ratingService
            .getUserRatings(this.state.user._id)
            .then(rates => {
                const avgRate = (rates.data.reduce((acc, elm) => acc + elm.value.valueOf(), 0)) / (rates.data.length)
                this.setState({ avgRating: isNaN(parseFloat(avgRate.toFixed(2))) ? 'No ratings' : `${parseFloat(avgRate.toFixed(2))} / 5` })
            })
            .catch(err => console.log('ERROR GETTING AVG RATES', err))
    }

    render() {
        return (
            <Col xs={12} sm={6} md={4} lg={3}>
                {this.state.user._id === this.props.loggedUser._id
                    ?
                    <Link to={'/profile'}>
                        <Card className="user-card" >
                            <img src={this.state.user.image} alt={this.state.user.username}/>
                            <article >
                                <Card.Title className="user-card-title" >{this.state.user.username}</Card.Title>
                                <Card.Text style={{fontSize: '.9rem'}}>Rating: {this.state.avgRating}</Card.Text>
                                <Button variant="secondary" size="sm" style={{marginTop: '0px'}}>See more</Button>
                            </article>
                        </Card>
                    </Link>
                    :
                    <Link to={`/profile/${this.state.user._id}`}>
                        <Card className="user-card">
                            <img src={this.state.user.image} alt={this.state.user.username}/>
                            <article >
                                <Card.Title className="user-card-title" >{this.state.user.username}</Card.Title>
                                <Card.Text style={{fontSize: '.9rem'}}>Rating: {this.state.avgRating}</Card.Text>
                                <Button variant="secondary" size="sm" style={{margin: '0px'}}>See more</Button>
                            </article>
                        </Card>
                    </Link>
                }
            </Col>
        )
    }
}

export default UserCard