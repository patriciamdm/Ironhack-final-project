import axios from 'axios'

class RatingService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/rating',
            withCredentials: true
        })
    }

    giveRating = ratingInfo => this.apiHandler.post('/giveRating', ratingInfo)
    getOneRating = ratingId => this.apiHandler.get(`/getOneRating/${ratingId}`)
    getUserRating = userId => this.apiHandler.get(`/getUserRating/${userId}`)
    editOneRating = (ratingId, editedRate) => this.apiHandler.put(`/editOneRating/${ratingId}`, editedRate)
}
    
export default RatingService