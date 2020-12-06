import axios from 'axios'

class UserService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        })
    }

    getOneUser = userId => this.apiHandler.get(`/getOneUser/${userId}`)
    editUser = (userId, userInfo) => this.apiHandler.put(`/editUser/${userId}`, userInfo)

}
    
export default UserService