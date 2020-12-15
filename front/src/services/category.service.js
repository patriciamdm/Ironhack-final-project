import axios from 'axios'

class CategoryService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/category',
            withCredentials: true
        })
    }

    getAllCategories = () => this.apiHandler.get('/getAllCategories')
    getOneCategory = catId => this.apiHandler.get(`/getOneCategory/${catId}`)
    editCategory = (catId, catInfo) => this.apiHandler.put(`/editCategory/${catId}`, catInfo)
    newCategory = catInfo => this.apiHandler.post('/newCategory', catInfo)
    deleteCategory = catId => this.apiHandler.delete(`/deleteCategory/${catId}`)
}
    
export default CategoryService