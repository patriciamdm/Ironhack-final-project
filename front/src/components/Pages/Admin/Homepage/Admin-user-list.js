import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../../../Shared/Spinner'
import AdminPageCard from './Admin-page-card'

import UserService from '../../../../services/user.service'


class AdminUserList extends Component {
    constructor() {
        super()
        this.state = {
            users: undefined
        }
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.userService
            .getLast6Users()
            .then(users => this.setState({ users: users.data }))
            .catch(err => console.log('ERROR GET 5 USERS', err))
    }

    render() {
        return (
            <>
                <h3 style={{marginBottom: '20px'}}>Users</h3>
                {this.state.users
                    ?
                    this.state.users.map(elm => <AdminPageCard key={elm._id} name={elm.username} image={elm.image} id={elm._id} />)
                    :
                    <Loader />
                }
                <Link to="/admin/users" className="btn btn-secondary btn-sm">Manage users</Link>
            </>
        )
    }
}

export default AdminUserList