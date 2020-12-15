import axios from 'axios'

class LocationService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/location',
            withCredentials: true
        })
    }

    getAllLocations = () => this.apiHandler.get('/getAllLocations')
    getOneLocation = locId => this.apiHandler.get(`/getOneLocation/${locId}`)
    editLocation = (locId, locInfo) => this.apiHandler.put(`/editLocation/${locId}`, locInfo)
    newLocation = locInfo => this.apiHandler.post('/newLocation', locInfo)
    deleteLocation = locId => this.apiHandler.delete(`/deleteLocation/${locId}`)
}
    
export default LocationService