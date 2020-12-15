import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import Loader from '../../Shared/Spinner'

import UserService from '../../../services/user.service'
import FilesService from '../../../services/upload.service'

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            username: '',
            image: '',
            email: '',
            phone: undefined
        }

        this.userService = new UserService()
        this.filesService = new FilesService()
    }

    componentDidMount = () => {
        this.userService
            .getOneUser(this.props.theUser._id)
            .then(res => this.setState({ _id: res.data._id, username: res.data.username, image: res.data.image, email: res.data.email, phone: res.data.phone}))
            .catch(err => new Error('ERROR FINDING PROD', err))
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })
    
    handleSubmit = e => {
        e.preventDefault()
        const editedUser = { username: this.state.username, image: this.state.image, email: this.state.email, phone: this.state.phone, }

        this.userService
            .editUser(this.state._id, editedUser)
            .then(user => this.userService.getOneUser(user.data._id))
            .then(user => this.props.setUser(user.data))
            .then(() => this.props.handleModal())
            .catch(err => new Error('ERROR IN EDIT', err))
    }

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('image', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => this.setState({ image: response.data.secure_url, uploadingActive: false }))
            .catch(err => new Error('ERROR UPLOADING IMG', err))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInput} />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image {this.state.uploadingActive && <Loader />}</Form.Label>
                    <Form.Control type="file" onChange={this.handleImageUpload} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" name="phone" value={this.state.phone} onChange={this.handleInput} />
                </Form.Group>
                <Button variant="secondary" type="submit">Submit</Button>
            </Form>
        )
    }
}

export default EditUser