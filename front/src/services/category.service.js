import axios from 'axios'

class CategoryService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/category',
            withCredentials: true
        })
    }

    getAllCategories = () => this.apiHandler.get('/getAllCategories')
    
}
    
export default CategoryService