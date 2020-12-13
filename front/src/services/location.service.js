import axios from 'axios'

class LocationService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/location',
            withCredentials: true
        })
    }

    getAllLocations = () => this.apiHandler.get('/getAllLocations')
    
}
    
export default LocationService