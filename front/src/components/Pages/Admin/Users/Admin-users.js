import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import Loader from '../../../Shared/Spinner'
import PopUp from '../../../Shared/PopUps/Pop-up-modal'
import PopUpConfirm from '../../../Shared/PopUps/Pop-up-confirm'
import Toastie from '../../../Shared/PopUps/Toastie'
import AdminUserCard from './Admin-user-card'
import AdminEditUser from './Admin-edit-user'

import UserService from '../../../../services/user.service'


class AdminUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: undefined,
            filteredUsers: undefined,
            userToTarget: undefined,
            editUserModal: false,
            editUserToast: false,
            delUserModal: false,
            delUserToast: false
        }
        this.userService = new UserService()
    }

    componentDidMount = () => this.loadUsers()

    loadUsers = () => {
        this.userService
            .getAllUsers()
            .then(allUsers => this.setState({ users: allUsers.data, filteredUsers: allUsers.data }))
            .catch(err => console.log('ERROR GET ALL USERS', err))
    }

    filterBy = (value, filter) => {
        const filterProds = this.state.products.filter(elm => elm.[filter].toLowerCase().includes(value.toLowerCase()))
        this.setState({ filteredProds: filterProds })
    }

    unfilter = () => {
        this.setState({ filteredProds: this.state.products })
    }
    
    defineTargetUser = userId => this.setState({ userToTarget: userId })

    handlePopups = (target, visib) => this.setState({ [target]: visib })
    
    deleteUser = () => {
        this.userService
            .deleteUser(this.state.userToTarget)
            .then(() => {
                this.handlePopups('delUserModal', false)
                this.handlePopups('delUserToast', true)
                this.loadUsers()
            })
            .catch(err => console.log('ERROR DELETING USER', err))
    }

    render() {
        return (
            <>
                <Container>
                    <Row >
                        <article style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding:' 0px 15px'}}>
                            <h1>All users</h1>
                            <hr />
                        </article>
                    </Row>
                    {this.state.filteredUsers
                    ?
                    <Row>
                        {this.state.filteredUsers.map(elm => <AdminUserCard key={elm._id} user={elm} targetUser={this.defineTargetUser} handlePopups={this.handlePopups} />)}
                    </Row>
                    :
                    <Row><Loader /></Row>
                    }
                    <Toastie show={this.state.editUserToast} handleToast={visib => this.handlePopups('editUserToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="User updated successfully." />
                    <Toastie show={this.state.delUserToast} handleToast={visib => this.handlePopups('delUserToast', visib)} toastType='success' toastTitle='SUCCESS!' toastText="User deleted successfully." />
                </Container>

                <PopUp show={this.state.editUserModal} hide={() => this.handlePopups('editUserModal', false)} title="Edit user">
                    <AdminEditUser hideModal={() => this.handlePopups('editUserModal', false)} userId={this.state.userToTarget} loadUsers={() => this.loadUsers()} theUser={this.props.theUser} handleToast={visib => this.handlePopups('editUserToast', visib)} />
                </PopUp>

               <PopUpConfirm show={this.state.delUserModal} hide={() => this.handlePopups('delUserModal', false)}
                        leftAction={() => this.handlePopups('delUserModal', false)} leftText='No, go back'
                        rightAction={() => this.deleteUser()} rightText='Yes, delete'
                        type='danger' title="Wait!" body={<b>Are you sure you want to delete this user?</b>}
                    />
            </>
        )
    }
}

export default AdminUsers