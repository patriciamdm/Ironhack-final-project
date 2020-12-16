import axios from 'axios'

class ProductService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/products',
            withCredentials: true
        })
    }

    getAllProducts = () => this.apiHandler.get('/getAllProducts')
    getLast5Products = () => this.apiHandler.get('/getLast5Products')
    getProductsByOwner = ownerId => this.apiHandler.get(`/getProductsByOwner/${ownerId}`)
    getProductsByCategory = catName => this.apiHandler.get(`/getProductsByCategory/${catName}`)
    getOneProduct = prodId => this.apiHandler.get(`/getOneProduct/${prodId}`)
    editProduct = (prodId, prodInfo) => this.apiHandler.put(`/editProduct/${prodId}`, prodInfo)
    newProduct = prodInfo => this.apiHandler.post('/newProduct', prodInfo)
    deleteProduct = prodId => this.apiHandler.delete(`/deleteProduct/${prodId}`)
}
    
export default ProductService