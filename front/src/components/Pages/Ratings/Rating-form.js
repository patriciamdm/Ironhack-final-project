import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import RatingService from '../../../services/rating.service'
import UserService from '../../../services/user.service'


class RatingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: '',
            comment: ''
        }
        this.ratingService = new RatingService()
        this.userService = new UserService()
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        this.sendRating()
        this.props.hideModal()
    }

    sendRating = () => {
        const rate = { raterId: this.props.theUser._id, ratedId: this.props.user._id, ratingValue: this.state.rating, ratingComment: this.state.comment }

        this.ratingService
            .giveRating(rate)
            .then(response => {
                const addRate = { rating: [...this.props.user.rating, response.data._id] }
                this.userService.editUser(this.props.user._id, addRate)
            })
            .then(() => this.props.reloadRatings())
            .catch(err => console.log('ERROR RATING', err))
                
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" name="rating" value={this.state.rating} onChange={this.handleInput} >
                        <option value='' disabled hidden>Select rating</option>
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