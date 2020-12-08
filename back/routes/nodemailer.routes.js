const express = require('express')
const router = express.Router()

const transporter = require('../configs/nodemailer.config')

router.post('/sendEmail', (req, res) => {

    const { fromEmail, fromName, toEmail, toName, subject, message } = req.body

    transporter
        .sendMail({
            from: `'${fromName}' <${fromEmail}>`,
            to: `'${toName}' <${toEmail}>`,
            subject: subject,
            text: message,
            html: `<p>${message}</p>`
        })
        .then(info => res.send(info))
        .catch(err => res.status(500).json(err))
})

module.exports = router