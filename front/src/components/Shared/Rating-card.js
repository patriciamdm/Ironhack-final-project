import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'
import Loader from '../Shared/Spinner'


import UserService from '../../services/user.service'


class RatingCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            raterName: undefined,
            raterId: undefined,
            raterImg: undefined,
            ratingValue: this.props.rating.value,
            comment: this.props.rating.comment
        }
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.userService
            .getOneUser(this.props.rating.rater)
            .then(user => this.setState({ raterName: user.data.username, raterId: user.data._id, raterImg: user.data.image }))
            .catch(err => console.log('ERROR GETTING RATER', err))
    }

    showEditModal = () => {
        this.props.defineTarget(this.props.rating._id)
        this.props.showEditRateModal(true)
    }

    render() {
        return (
            <Col lg={12}>
                {this.state.raterName
                    ?
                    <Card className="rating-card" >
                        <img src={this.state.raterImg} alt={this.state.raterName} />
                        <article >
                            <Link to={`/profile/${this.state.raterId}`}>
                                <Card.Title style={{ fontSize: '1.2rem' }}>{this.state.raterName}</Card.Title>
                            </Link>
                            <Card.Body style={{padding: '0px'}}>{this.state.comment}</Card.Body>
                        </article>
                        <section className="card-subtitle" style={{textAlign: 'center'}}>
                            <p style={{textTransform: 'uppercase', margin: '0px'}}>Rating</p>
                            <p style={{fontSize: '1.2rem', margin: '0px'}}>{this.state.ratingValue}/5</p>
                        </section>
                        {this.state.raterId === this.props.theUser._id
                            &&
                            <Button onClick={() => this.showEditModal()} variant="secondary" size="sm" style={{marginLeft: '20px'}}>Edit</Button>
                        }
                    </Card>
                    :
                    <Loader />
                }
            </Col>
        )
    }
}

export default RatingCard