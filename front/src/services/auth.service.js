import axios from 'axios'

class AuthService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/auth',
            withCredentials: true
        })
    }

    signup = creds => this.apiHandler.post('/signup', creds)
    login = creds => this.apiHandler.post('/login', creds)
    logout = () => this.apiHandler.post('/logout')
    loggedin = () => this.apiHandler.get('/loggedin')
}
    
export default AuthService