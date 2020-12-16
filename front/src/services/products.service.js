import axios from 'axios'

class ProductService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/products',
            withCredentials: true
        })
    }

    getAllProducts = () => this.apiHandler.get('/getAllProducts')
    getLast6Products = () => this.apiHandler.get('/getLast6Products')
    getProductsByOwner = ownerId => this.apiHandler.get(`/getProductsByOwner/${ownerId}`)
    getOneProduct = prodId => this.apiHandler.get(`/getOneProduct/${prodId}`)
    editProduct = (prodId, prodInfo) => this.apiHandler.put(`/editProduct/${prodId}`, prodInfo)
    newProduct = prodInfo => this.apiHandler.post('/newProduct', prodInfo)
    deleteProduct = prodId => this.apiHandler.delete(`/deleteProduct/${prodId}`)
    //Analytics
    getProductsByCategory = catName => this.apiHandler.get(`/getProductsByCategory/${catName}`)
    getProductsByLocation = locName => this.apiHandler.get(`/getProductsByLocation/${locName}`)
    getProductsByStatus = status => this.apiHandler.get(`/getProductsByStatus/${status}`)

}
    
export default ProductService