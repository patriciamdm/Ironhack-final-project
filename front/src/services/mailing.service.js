import axios from 'axios'

class MailingService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/mailing',
            withCredentials: true
        })
    }

    sendEmail = mailInfo => this.apiHandler.post('/sendEmail', mailInfo)
}
    
export default MailingService