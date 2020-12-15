import axios from 'axios'

class UserService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        })
    }

    getAllUsers = () => this.apiHandler.get('/getAllUsers')
    getLast5Users = () => this.apiHandler.get('/getLast5Users')
    getOneUser = userId => this.apiHandler.get(`/getOneUser/${userId}`)
    editUser = (userId, userInfo) => this.apiHandler.put(`/editUser/${userId}`, userInfo)
    deleteUser = userId => this.apiHandler.delete(`/deleteUser/${userId}`)
}
    
export default UserService