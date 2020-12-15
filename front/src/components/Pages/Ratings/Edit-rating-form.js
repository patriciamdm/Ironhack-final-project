import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import RatingService from '../../../services/rating.service'
import UserService from '../../../services/user.service'


class EditRatingForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: '',
            comment: ''
        }
        this.ratingService = new RatingService()
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.ratingService
            .getOneRating(this.props.rateId)
            .then(response => this.setState({ rating: response.data.value, comment: response.data.comment }))
            .catch(err => new Error('ERROR GETTING RATE', err))
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.ratingService
            .editOneRating(this.props.rateId, {value: this.state.rating, comment: this.state.comment})
            .then(() => {
                this.props.reloadRatings()
                this.props.hideModal()
                this.props.handleToast(true)
            })
            .catch(err => new Error('ERROR EDITING RATE', err))

        
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

export default EditRatingForm