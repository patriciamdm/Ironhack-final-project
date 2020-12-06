import axios from 'axios'

class ProductService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/products',
            withCredentials: true
        })
    }

    getAllProducts = () => this.apiHandler.get('/getAllProducts')
    getOneProduct = prodId => this.apiHandler.get(`/getOneProduct/${prodId}`)
    editProduct = prodId => this.apiHandler.put(`/editProduct/${prodId}`)
    newProduct = prodInfo => this.apiHandler.post('/newProduct', prodInfo)

}
    
export default ProductService