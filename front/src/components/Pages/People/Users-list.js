
import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import UserCard from './User-card'
import Loader from '../../Shared/Spinner'
import SearchBar from '../../Shared/Searchbar'

import UserService from '../../../services/user.service'

class UserList extends Component {
    constructor() {
        super()
        this.state = {
            users: undefined,
            filteredUsers: undefined,
            showModal: false
        }
        this.userService = new UserService()
    }

    componentDidMount = () => this.loadUsers()

    loadUsers = () => {
        this.userService
            .getAllUsers()
            .then(allUsers => this.setState({ users: allUsers.data, filteredUsers: allUsers.data }))
            .catch(err => new Error('ERROR GET ALL USERS', err))
    }
    
    searchFor = search => {
        const filterUsers = this.state.users.filter(elm => elm.username.toLowerCase().includes(search.toLowerCase()))
        this.setState({ filteredUsers: filterUsers })
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding:' 0px 15px'}}>
                            <h1>All users</h1>
                        </article>
                        <SearchBar searchFor={value => this.searchFor(value)} style={{padding: '0px 15px'}}/>
                    </Row>
                    <hr style={{margin: '1.2rem 0rem'}}/>
                    <Row>
                        {this.state.filteredUsers
                            ?
                            this.state.filteredUsers.map(elm => <UserCard key={elm._id} loggedUser={this.props.theUser} theUser={elm}/>)
                            :
                            <Loader />
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

export default UserList