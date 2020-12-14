import axios from 'axios'

class UserService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        })
    }

    getAllUsers = () => this.apiHandler.get('/getAllUsers')
    getOneUser = userId => this.apiHandler.get(`/getOneUser/${userId}`)
    // getFavouriteProductsOfUser = userId => this.apiHandler.get(`/getFavouriteProductsOfUser/${userId}`)
    editUser = (userId, userInfo) => this.apiHandler.put(`/editUser/${userId}`, userInfo)
    deleteUser = userId => this.apiHandler.delete(`/deleteUser/${userId}`)
}
    
export default UserService