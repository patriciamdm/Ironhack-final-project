import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import Loader from '../../../Shared/Spinner'

import UserService from '../../../../services/user.service'
import FilesService from '../../../../services/upload.service'

class AdminEditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            username: '',
            image: '',
            email: '',
            role: undefined,
            phone: undefined
        }

        this.userService = new UserService()
        this.filesService = new FilesService()
    }

    componentDidMount = () => {
        this.userService
            .getOneUser(this.props.userId)
            .then(res => this.setState({ _id: res.data._id, username: res.data.username, image: res.data.image, email: res.data.email, phone: res.data.phone, role: res.data.role}))
            .catch(err => new Error('ERROR FINDING USER', err))
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })
    
    handleSubmit = e => {
        e.preventDefault()
        const editedUser = { username: this.state.username, image: this.state.image, email: this.state.email, phone: this.state.phone, role: this.state.role}

        this.userService
            .editUser(this.state._id, editedUser)
            .then(user => {
                this.props.hideModal()
                this.props.loadUsers()
                this.props.handleToast(true)
            })
            .catch(err => new Error('ERROR IN EDIT', err))
    }

    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('image', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => this.setState({ image: response.data.secure_url, uploadingActive: false }))
            .catch(err => new Error('ERRORRR!', err))
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
                <Form.Group controlId="role">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control as="select" name="role" value={this.state.role} onChange={this.handleInput} >
                            <option value='user' default >User</option>
                            <option value='admin'>Admin</option>
                    </Form.Control>
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

export default AdminEditUser