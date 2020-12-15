import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'

class UserCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.theUser
        }
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
                                <Card.Title style={{ fontSize: '1.2rem' }}>{this.state.user.username}</Card.Title>
                                <Button variant="secondary" size="sm" style={{marginTop: '10px'}}>See more</Button>
                            </article>
                        </Card>
                    </Link>
                    :
                    <Link to={`/profile/${this.state.user._id}`}>
                        <Card className="user-card">
                            <img src={this.state.user.image} alt={this.state.user.username}/>
                            <article style={{}}>
                                <Card.Title style={{ fontSize: '1.2rem' }}>{this.state.user.username}</Card.Title>
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