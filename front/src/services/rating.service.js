import axios from 'axios'

class RatingService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/rating',
            withCredentials: true
        })
    }

    giveRating = ratingInfo => this.apiHandler.post('/giveRating', ratingInfo)
    getUserRating = userId => this.apiHandler.get(`/getUserRating/${userId}`)
}
    
export default RatingService