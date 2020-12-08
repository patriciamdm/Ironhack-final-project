import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import EmailService from '../../services/mailing.service'

class EmailForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fromEmail: this.props.fromUser.email,
            fromName: this.props.fromUser.username,
            toEmail: this.props.toUser.email,
            toName: this.props.toUser.username,
            subject: this.props.subject,
            message: ''
        }
        this.emailService = new EmailService()
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        this.sendEmail()
        this.props.hideModal()
    }

    sendEmail = () => {
        this.emailService
            .sendEmail(this.state)
            .then(res => console.log('EMAIL SENT', res))
            .catch(err => console.log('ERROR SENDING EMAIL', err))
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <h1>Send an email</h1>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="from">
                                <Form.Label>From</Form.Label>
                                <Form.Control type="email" name="from" value={`${this.state.fromName} <${this.state.fromEmail}>`} disabled />
                            </Form.Group>
                            <Form.Group controlId="to">
                                <Form.Label>To</Form.Label>
                                <Form.Control type="email" name="to" value={`${this.state.toName} <${this.state.toEmail}>`} disabled />
                            </Form.Group>
                            <Form.Group controlId="subject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" name="subject" value={this.state.subject} onChange={this.handleInput} />
                            </Form.Group>
                            <Form.Group controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control type="text" as="textarea" name="message" value={this.state.message} onChange={this.handleInput} />
                            </Form.Group>
                            <Button variant="secondary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EmailForm