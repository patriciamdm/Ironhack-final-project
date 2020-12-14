import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import RatingService from '../../services/rating.service'


class RatingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rater: this.props.theUser,
            rated: this.props.user,
            rating: '',
            comment: ''
        }
        this.ratingService = new RatingService()
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        this.sendRating()
        this.props.hideModal()
    }

    sendRating = () => {
        //const { raterId, ratedId, ratingValue, ratingComment } = req.body
        console.log(this.state)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" name="rating" value={this.state.status} onChange={this.handleInput} >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Form.Control>
                    </Form.Group>    
                <Form.Group controlId="to">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" name="comment" value={this.state.comment} onChange={this.handleInput} />
                </Form.Group>
                <Button variant="secondary" type="submit" block>Submit</Button>
            </Form>
        )
    }
}

export default RatingForm