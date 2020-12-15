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
    getUserRatings = userId => this.apiHandler.get(`/getUserRatings/${userId}`)
    deleteRating = ratingId => this.apiHandler.delete(`/deleteRating/${ratingId}`)
    editOneRating = (ratingId, editedRate) => this.apiHandler.put(`/editOneRating/${ratingId}`, editedRate)
}
    
export default RatingService